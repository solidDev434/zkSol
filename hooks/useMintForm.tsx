"use client"

import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { zkMintSchema } from "@/lib/schemas/zkmint.schema";
import { getFieldError } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { toast } from "sonner";
import { 
    Keypair, 
    SendTransactionError, 
    Transaction, 
    TransactionMessage, 
    VersionedTransaction 
} from "@solana/web3.js";
import { 
    createAssociatedTokenAccountInstruction, 
    createInitializeMetadataPointerInstruction, 
    createMintToInstruction, 
    ExtensionType, 
    getAssociatedTokenAddressSync, 
    getMintLen, 
    LENGTH_SIZE, 
    TOKEN_2022_PROGRAM_ID, 
    TYPE_SIZE, 
} from "@solana/spl-token";
import { 
    pack, 
    createInitializeInstruction
} from "@solana/spl-token-metadata";
import { 
    CompressedTokenProgram, 
    getTokenPoolInfos,
    selectTokenPoolInfo
} from "@lightprotocol/compressed-token";
import { connection } from "@/lib/conn";
import { uploadTokenMetadata } from "@/lib/services/pinata";
import { selectStateTreeInfo } from "@lightprotocol/stateless.js";

type MintValues = z.infer<typeof zkMintSchema>;

const useMintForm = () => {
    const wallet = useWallet();

    const formik = useFormik<MintValues>({
        initialValues: {
            tkName: "",
            tkSymbol: "",
            tkSupply: "",
            decimals: "",
            tkURI: "",
            attributes: [{ 
                trait_type: "", 
                value: "" 
            }]
        },
        validationSchema: toFormikValidationSchema(zkMintSchema),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            if (
                wallet.connected && 
                wallet.publicKey && 
                wallet.signTransaction
            ) {
                try {
                    // const payload = JSON.stringify(values);
                    const tokenAttributes = values.attributes.map(({ trait_type, value }) => [trait_type, value]);
                    const tokenAttributesMetadata: (readonly [string, string])[] = tokenAttributes.map(attr => attr as unknown as readonly [string, string]);

                    // Mint keypair
                    const mint = Keypair.generate();

                    // Token metadata
                    const tokenMetadata = {
                        mint: mint.publicKey,
                        name: values.tkName,
                        symbol: values.tkSymbol,
                        uri: values.tkURI,
                        additionalMetadata: tokenAttributesMetadata
                    };
                    
                    // Upload Token Metadata to Pinata
                    const tokenMetadataURI = await uploadTokenMetadata(tokenMetadata);

                    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
                    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(tokenMetadata).length;

                    const [
                        createMintAccountIx, 
                        initializeMintIx, 
                        createTokenPoolIx
                    ] = await CompressedTokenProgram.createMint({
                        feePayer: wallet.publicKey,
                        authority: wallet.publicKey,
                        mint: mint.publicKey,
                        decimals: Number(values.decimals),
                        freezeAuthority: null,
                        rentExemptBalance: await connection.getMinimumBalanceForRentExemption(
                            mintLen + metadataLen
                        ),
                        mintSize: mintLen,
                        tokenProgramId: TOKEN_2022_PROGRAM_ID,
                    });

                    const ataAddress = getAssociatedTokenAddressSync(
                        mint.publicKey,
                        wallet.publicKey,
                        false,
                        TOKEN_2022_PROGRAM_ID
                    );
                    console.log("ata", ataAddress, ataAddress.toBase58());
                    
                    const createAtaIx = createAssociatedTokenAccountInstruction(
                        wallet.publicKey,
                        ataAddress,
                        wallet.publicKey,
                        mint.publicKey,
                        TOKEN_2022_PROGRAM_ID
                    );

                    const instructions = [
                        createMintAccountIx,
                        createInitializeMetadataPointerInstruction(
                            mint.publicKey,
                            wallet.publicKey,
                            mint.publicKey,
                            TOKEN_2022_PROGRAM_ID
                        ),
                        initializeMintIx,
                        createInitializeInstruction({
                            programId: TOKEN_2022_PROGRAM_ID,
                            mint: mint.publicKey,
                            metadata: mint.publicKey,
                            name: tokenMetadata.name,
                            symbol: tokenMetadata.symbol,
                            uri: tokenMetadataURI,
                            mintAuthority: wallet.publicKey,
                            updateAuthority: wallet.publicKey,
                        }),
                        createTokenPoolIx,
                        createAtaIx,
                    ];

                    const messageV0 = new TransactionMessage({
                        payerKey: wallet.publicKey,
                        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
                        instructions,
                    }).compileToV0Message();

                    const signedTransaction = await wallet?.signTransaction(
                        new VersionedTransaction(messageV0)
                    );
                    signedTransaction.sign([mint]);

                    console.log(signedTransaction.message.serialize().toString("base64"));

                    const signature = await connection.sendRawTransaction(
                        signedTransaction.serialize()
                    );

                    toast.loading(
                        `Transaction sent successfully, waiting for confirmation...`
                    );

                    await connection.confirmTransaction({
                        signature,
                        ...(await connection.getLatestBlockhash()),
                    });

                    toast.success(
                        `Token mint created at ${mint.publicKey.toBase58()}\nSignature: ${signature}`
                    );

                    const mintToInstruction = createMintToInstruction(
                        mint.publicKey,
                        ataAddress,
                        wallet.publicKey,
                        Number(values.tkSupply),
                        [],
                        TOKEN_2022_PROGRAM_ID
                    );

                    const activeStateTrees = await connection.getStateTreeInfos();
                    const treeInfo = selectStateTreeInfo(activeStateTrees);
                    const infos = await getTokenPoolInfos(
                        connection,
                        mint.publicKey
                    );
                    const info = selectTokenPoolInfo(infos);
                    const compressInstruction = await CompressedTokenProgram.compress({
                        payer: wallet.publicKey,
                        owner: wallet.publicKey,
                        source: ataAddress,
                        toAddress: wallet.publicKey,
                        amount: 10,
                        mint: mint.publicKey,
                        tokenPoolInfo: info,
                        outputStateTreeInfo: treeInfo,
                    });

                    const mintTx = new Transaction();
                    mintTx.add(mintToInstruction);
                    mintTx.add(compressInstruction);
                    mintTx.feePayer = wallet.publicKey;
                    mintTx.recentBlockhash = (
                        await connection.getLatestBlockhash()
                    ).blockhash;

                    const signedMintTx = await wallet.signTransaction(
                        new VersionedTransaction(mintTx.compileMessage())
                    );

                    console.log(signedMintTx.message.serialize().toString("base64"));

                    const mintSignature = await connection.sendRawTransaction(
                        signedMintTx.serialize()
                    );

                    toast.loading(`Minting tokens...`);

                    await connection.confirmTransaction({
                        signature: mintSignature,
                        ...(await connection.getLatestBlockhash()),
                    });

                    toast.success(`Tokens minted successfully\nSignature: ${mintSignature}`);
                } catch (err) {
                    console.log(err)
                    if (err instanceof SendTransactionError) {
                        console.log(await err.getLogs(connection));
                    }
                } finally {
                    setTimeout(() => {
                        toast.dismiss();
                    }, 500)
                }
            }
        }
    });

    // Add Token22 Attribute
    const addAttribute = () => {
        formik.setFieldValue("attributes", [
            ...formik.values.attributes,
            {
                trait_type: "",
                value: ""
            }
        ]);
    }

    // Remove Token22 Attribute by index
    const removeAttribute = (index: number) => {
        const newAttributes = [...formik.values.attributes];
        newAttributes.splice(index, 1);
        formik.setFieldValue("attributes", newAttributes);
    };

    // Update Attribute field
    const updateAttribute = (
        index: number,
        field: "trait_type" | "value",
        value: string
    ) => {
        const newAttributes = [...formik.values.attributes];
        newAttributes[index] = {
        ...newAttributes[index],
        [field]: value,
        };
        formik.setFieldValue("attributes", newAttributes);
    };

    // Handle Token URL value
    const handleImageURL = (value: string) => {
        formik.setFieldValue("tkURI", value);
    };

    const isValid = !formik.isValid || !formik.dirty || formik.isSubmitting;
    const errors = {
        tkName: getFieldError<MintValues>(formik, "tkName"),
        tkSymbol: getFieldError<MintValues>(formik, "tkSymbol"),
        tkSupply: getFieldError<MintValues>(formik, "amount"),
        decimals: getFieldError<MintValues>(formik, "decimals"),
        tkURI: getFieldError<MintValues>(formik, "tkURI"),
        attributes: {
            trait_type: (index: number) => getFieldError<MintValues>(formik, `attributes[${index}].trait_type`),
            value: (index: number) => getFieldError<MintValues>(formik, `attributes[${index}].value`)
        }
    }

    return {
      formik,
      isLoading: formik.isSubmitting,
      errors,
      isValid,
      handleImageURL,
      addAttribute,
      updateAttribute,
      removeAttribute
    }
}

export default useMintForm;
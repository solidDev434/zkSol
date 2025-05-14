"use client"

import { useState } from "react";
import { z } from "zod";
import { useFormik } from "formik";
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { zkMintSchema } from "@/lib/schemas/zkmint.schema";
import { getFieldError } from "@/lib/utils";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Keypair } from "@solana/web3.js";

type MintValues = z.infer<typeof zkMintSchema>;

const useMintForm = () => {
    const { connected } = useWallet();

    const formik = useFormik<MintValues>({
        initialValues: {
            tkName: "Token",
            tkSymbol: "TK",
            amount: "323",
            decimals: "9",
            tkURI: "https://token-url",
            attributes: [{ 
                key: "", 
                value: "" 
            }]
        },
        validationSchema: toFormikValidationSchema(zkMintSchema),
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            if (connected) {
                try {
                    const payload = JSON.stringify(values);
                    const doesAttributesExists = values.attributes.length && values.attributes.every(a => a.key && a.value);
                    
                    const mint = Keypair.generate();
                    const mintMetadata = {
                        mint: mint.publicKey,
                        name: values.tkName,
                        symbol: values.tkSymbol,
                        uri: values.tkURI,
                        additionalMetadata:  values.attributes
                    }
                    console.log(payload, mint);
                } catch (err) {

                } finally {

                }
            }
        }
    });

    // Add Token22 Attribute
    const addAttribute = () => {
        formik.setFieldValue("attributes", [
            ...formik.values.attributes,
            {
                key: "",
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
        field: "key" | "value",
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
        amount: getFieldError<MintValues>(formik, "amount"),
        decimals: getFieldError<MintValues>(formik, "decimals"),
        tkURI: getFieldError<MintValues>(formik, "tkURI"),
        attributes: {
            key: (index: number) => getFieldError<MintValues>(formik, `attributes[${index}].key`),
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
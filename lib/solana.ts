import { GetProgramAccountsFilter } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { connection } from "./conn";

export async function getTokenAccounts(wallet: string) {
    const filters:GetProgramAccountsFilter[] = [
        {
          dataSize: 165,   
        },
        {
          memcmp: {
            offset: 32,    
            bytes: wallet,
          },            
        }];
    const accounts = await connection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        {filters: filters}
    );

    console.log(`Found ${accounts.length} token account(s) for wallet ${wallet}.`);
    
    const splAccounts = accounts.forEach((account, i) => {
        //Parse the account data
        const parsedAccountInfo:any = account.account.data;
        const mintAddress:string = parsedAccountInfo["parsed"]["info"]["mint"];
        const tokenBalance: number = parsedAccountInfo["parsed"]["info"]["tokenAmount"]["uiAmount"];
        //Log results
        console.log(`Token Account No. ${i + 1}: ${account.pubkey.toString()}`);
        console.log(`--Token Mint: ${mintAddress}`);
        console.log(`--Token Balance: ${tokenBalance}`);

        return ({
          account,
          mintAddress,
          tokenBalance
        })
    });

    return splAccounts;
}

const fetchUsersCompressed
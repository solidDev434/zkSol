"server only";

import { TokenMetadata } from "@solana/spl-token-metadata";
import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
    pinataJwt: `${process.env.PINATA_JWT}`,
    pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`
});

export const uploadTokenMetadata = async (metadata: TokenMetadata): Promise<string> => {
    try {
        console.log(process.env.NEXT_PUBLIC_PINATA_JWT)
        const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
            },
            body: JSON.stringify({
              pinataMetadata: { name: `${metadata.name}-metadata` },
              pinataContent: metadata,
            }),
        });
    
        if (!response.ok) {
            throw new Error(`Pinata error: ${await response.text()}`);
        }
    
        const data = await response.json();
        return `https://gateway.pinata.cloud/ipfs/${data.IpfsHash}`;
    } catch (error) {
        throw error;;
    } 
}

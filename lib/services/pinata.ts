"server only";

import { TokenMetadata } from "@solana/spl-token-metadata";

export const uploadTokenMetadata = async (metadata: TokenMetadata): Promise<string> => {
    try {
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

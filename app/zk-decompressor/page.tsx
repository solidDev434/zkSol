"use client";

import { connection } from '@/lib/conn';
import { ParsedTokenAccount, WithCursor } from '@lightprotocol/stateless.js';
import { useWallet } from '@solana/wallet-adapter-react';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { mplTokenMetadata, fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata'
import React, { useEffect } from 'react';
import { publicKey } from '@metaplex-foundation/umi';

const umi = createUmi(`${process.env.NEXT_PUBLIC_HELIUM_RPC_URL}`).use(mplTokenMetadata())

const DecompressTokens = () => {
  const wallet = useWallet();

  const fetchUserWalletTokens = React.useCallback(async () => {
    if (wallet.publicKey && wallet.connected) {
      const compressedTokens: WithCursor<ParsedTokenAccount[]> = await connection.getCompressedTokenAccountsByOwner(wallet.publicKey);

      // for (const token of compressed
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      Tokens.items) {
      //   const asset = await fetchDigitalAsset(umi, publicKey(token.compressedAccount.mint.toBase58()));
      //   console.log(asset)
      // }
      console.log(compressedTokens)
    }
  }, [wallet]);

  useEffect(() => {
    fetchUserWalletTokens();
  }, [fetchUserWalletTokens]);

  return (
    <section className="wrapper">
      <div className="wrapper-content-container">
        <h1 className="heading-title">ZKDecompressor</h1>

      </div>      
    </section>
  )
}

export default DecompressTokens
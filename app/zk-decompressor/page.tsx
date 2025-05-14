"use client";

import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect } from 'react';

const DecompressTokens = () => {
  const wallet = useWallet();

  const fetchUserWalletTokens = React.useCallback(() => {
    if (wallet.wallet && wallet.connected) {
      
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
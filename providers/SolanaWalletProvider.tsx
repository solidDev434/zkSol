"use client";

import { FC, ReactNode, useMemo } from "react";
import { SolflareWalletAdapter, NightlyWalletAdapter, PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import '@solana/wallet-adapter-react-ui/styles.css'


interface ISolanaWalletProvider {
    children: ReactNode
}

const SolanaWalletProvider: FC<ISolanaWalletProvider> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl("devnet"), [network]);
    const wallets = useMemo(() => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new NightlyWalletAdapter(),
    ], [endpoint]);

    return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            {children}
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    )
}

export default SolanaWalletProvider;
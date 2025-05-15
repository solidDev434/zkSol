"use client";

import { getTokenAccounts } from '@/lib/solana';
import { useWallet } from '@solana/wallet-adapter-react';
import React from 'react'

const useFetchSPLToken = () => {
    const [tokens, setTokens] = React.useState();
    const wallet = useWallet();

    const fetchSPLTokens = React.useCallback(() => {
        (async () => {
            if (wallet.publicKey) {
                const accounts = await getTokenAccounts(wallet.publicKey.toString());
                console.log("Accounts", accounts);
            }
        })()
    }, [wallet]);

    React.useEffect(() => {
        fetchSPLTokens();
    }, [fetchSPLTokens]);
}

export default useFetchSPLToken
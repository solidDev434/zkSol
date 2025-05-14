import React, { ReactNode } from 'react'
import SolanaWalletProvider from './SolanaWalletProvider'
import { Toaster } from '@/components/ui/Sonner'

interface IProviders {
    children: ReactNode
}

const Providers = ({
    children
}: IProviders) => {
    return (
        <SolanaWalletProvider>
            <Toaster />
            {children}
        </SolanaWalletProvider>
    )
}

export default Providers
import React from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

import type { TokenData } from '@/lib/types'
import { mockTokens } from '@/lib/mock-data'
import { Button } from './ui/Button'
import { Dialog, DialogHeader } from './ui/Dialog'
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog'

interface TokenSelectorProps {
    selectedToken: TokenData | null
    onSelectToken: (token: TokenData) => void
    otherToken: TokenData | null
}

const TokenSelector = ({
    selectedToken,
    onSelectToken,
    otherToken
}: TokenSelectorProps) => {
    const [open, setOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    // const fetchAllTokens = React.useCallback(() => {
    //     (async () => {
    //         const res = await fetch(
    //             "https://lite-api.jup.ag/tokens/v1/all",
    //             { cache: 'force-cache' }
    //         );
    //         const tokens = await res.json();
    //         console.log("tokens", tokens);
    //     })()
    // }, []);

    // React.useEffect(() => {
    //     fetchAllTokens();
    // }, [fetchAllTokens]);

    const filteredTokens = mockTokens
    .filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        token.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((token) => !otherToken || token.symbol !== otherToken.symbol)

    return (
        <>
            <Button
                variant="ghost"
                size="none"
                onClick={() => setOpen(true)}
                className="flex p-2.5 rounded-2xl"
            >
                {selectedToken ? (
                    <>
                        <Image 
                            src={selectedToken.logoURI}
                            alt={selectedToken.symbol}
                            className="size-12 rounded-md"
                        />
                        <span>{selectedToken.symbol}</span>
                    </>
                ) : (
                    <>
                        <div className="w-12 h-11 bg-white rounded-md" />
                        <span className="text-xl font-light">Select Token</span>
                    </>
                )}
                <ChevronDown className="size-4" />
            </Button>

            {/* Token Dialog */}
            <Dialog
                open={open}
                onOpenChange={setOpen}
            >
                <DialogContent className="w-[30rem] border-[#1C274F] bg-[#131A35]">
                    <DialogHeader>
                        <DialogTitle>Select a token</DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default TokenSelector
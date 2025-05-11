"use client";

import React, { useState } from 'react';

import type { TokenData } from '@/lib/types';
import TokenSelector from './TokenSelector';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { ArrowDownUp } from 'lucide-react';

const SwapForm = () => {
    const [inputToken, setInputToken] = React.useState<TokenData | null>(null);
    const [outputToken, setOutputToken] = React.useState<TokenData | null>(null);
    const [inputAmount, setInputAmount] = React.useState<string>("");
    const [outputAmount, setOutputAmount] = React.useState<string>("");
    const [isSettingsOpen, setIsSettingsOpen] = React.useState<boolean>(false)
    const [slippage, setSlippage] = React.useState<string>("0.5")
    const [isSwapping, setIsSwapping] = React.useState<boolean>(false)
    const [isPositionedChanged, setIsPositionChanged] = useState<boolean>(false);

    const handleInputAmountChange = (value: string) => {
      setInputAmount(value)
      if (inputToken && outputToken && value) {
      //   const output = calculateOutputAmount(Number.parseFloat(value), inputToken, outputToken)
      //   setOutputAmount(output.toFixed(outputToken.decimals))
      } else {
        setOutputAmount("")
      }
    }
  
    const handleSwapTokens = () => {
      const tempToken = inputToken
      const tempAmount = inputAmount
  
      setInputToken(outputToken)
      setInputAmount(outputAmount)
  
      setOutputToken(tempToken)
      setOutputAmount(tempAmount)

      setIsPositionChanged(!isPositionedChanged);
    }

    return (
        <div className="space-y-1">
          <div className="space-y-1 relative">
            <div className="bg-grey-100 p-6 rounded-4xl grid gap-y-3">
                <label className="font-medium text-white">You sell</label>

                <div>
                  <div className="flex">
                    <TokenSelector 
                      selectedToken={inputToken} 
                      onSelectToken={setInputToken} 
                      otherToken={outputToken}
                    />

                    <Input 
                      type="text"
                      value={inputAmount}
                      onChange={(e) => handleInputAmountChange(e.target.value)}
                      placeholder="0.00"
                      className="flex-1 focus-visible:border-none focus-visible:ring-0 !h-16 text-end !text-4xl placeholder:text-4xl"
                    />
                  </div>

                  {/* Token Info */}
                  {!inputToken && (
                    <div className="text-sm flex items-center justify-between px-2.5">
                      <span className="text-yellow-100/70">
                        Matic Token
                      </span>

                      <span className="text-white font-medium">
                        $ 2,424
                      </span>
                    </div>
                  )}
                </div>
            </div>

            {/* Swap button */}
            <Button
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 border-2 border-grey-100 rounded-full transition-transform duration-500"
              onClick={handleSwapTokens}
              style={{
                transform: `rotate(${isPositionedChanged ? "-180deg" : "180deg"})`
              }}
            >
              <ArrowDownUp className="size-6" strokeWidth={2.6} />
            </Button>

            {/* Buy */}
            <div className="bg-grey-100 p-6 rounded-t-4xl grid gap-y-3">
                <label className="font-medium text-white">You Buy</label>

                <div>
                  <div className="flex">
                    <TokenSelector 
                      selectedToken={outputToken} 
                      onSelectToken={setOutputToken} 
                      otherToken={inputToken}
                    />

                    <Input 
                      type="text"
                      value={outputAmount}
                      readOnly
                      placeholder="0.00"
                      className="flex-1 focus-visible:border-none focus-visible:ring-0 !h-16 text-end !text-4xl placeholder:text-4xl"
                    />
                  </div>

                  {/* Token Info */}
                  {!inputToken && (
                    <div className="text-sm flex items-center justify-between px-2.5">
                      <span className="text-yellow-100/70">
                        Ethereum
                      </span>

                      <span className="text-white font-medium">
                        $ 2,424
                      </span>
                    </div>
                  )}
                </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-grey-100 p-6 rounded-b-4xl grid gap-y-3">
              <label className="font-medium text-white">You Buy</label>

              
          </div>
        </div>
    )
}

export default SwapForm
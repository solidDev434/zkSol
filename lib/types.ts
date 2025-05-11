export interface TokenData {
    symbol: string
    name: string
    logoURI: string
    address: string
    decimals: number
    balance: string
  }
  
  export interface PoolData {
    inputToken: TokenData
    outputToken: TokenData
    liquidity: number
    fee: number
    price: number
  }
  
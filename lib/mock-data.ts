import type { TokenData, PoolData } from "./types"

export const mockTokens: TokenData[] = [
  {
    symbol: "SOL",
    name: "Solana",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "So11111111111111111111111111111111111111112",
    decimals: 9,
    balance: "10.5",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    decimals: 6,
    balance: "1250.75",
  },
  {
    symbol: "RAY",
    name: "Raydium",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
    decimals: 6,
    balance: "500.0",
  },
  {
    symbol: "BONK",
    name: "Bonk",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    decimals: 5,
    balance: "1000000.0",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    decimals: 6,
    balance: "750.25",
  },
  {
    symbol: "mSOL",
    name: "Marinade staked SOL",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    decimals: 9,
    balance: "5.2",
  },
  {
    symbol: "BTC",
    name: "Bitcoin (Sollet)",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    decimals: 6,
    balance: "0.05",
  },
  {
    symbol: "ETH",
    name: "Ethereum (Sollet)",
    logoURI: "/placeholder.svg?height=32&width=32",
    address: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
    decimals: 6,
    balance: "0.75",
  },
]

export const mockPools: PoolData[] = [
  {
    inputToken: mockTokens[0], // SOL
    outputToken: mockTokens[1], // USDC
    liquidity: 5000000,
    fee: 0.0025,
    price: 100.25,
  },
  {
    inputToken: mockTokens[0], // SOL
    outputToken: mockTokens[2], // RAY
    liquidity: 2500000,
    fee: 0.0025,
    price: 50.5,
  },
  {
    inputToken: mockTokens[1], // USDC
    outputToken: mockTokens[2], // RAY
    liquidity: 1500000,
    fee: 0.0025,
    price: 0.5,
  },
  {
    inputToken: mockTokens[0], // SOL
    outputToken: mockTokens[3], // BONK
    liquidity: 1000000,
    fee: 0.0025,
    price: 0.00001,
  },
]

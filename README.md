# [ZKSol-Minter](https://zk-sol-minter.vercel.app/) - Compressed Token Minter

[ZKSol-Minter](https://zk-sol-minter.vercel.app/) is a DApp that allows users to easily mint/create compressed Solana tokens (cTokens) directly to thier wallet. The platform leverages Solana's ZK compression technology to provide an efficient and user-friendly way to distribute tokens.
<img width="1508" alt="Screenshot 2025-05-12 at 11 41 42 AM" src="https://zk-sol-minter.vercel.app/app-preview.png" />


## Features

- Mint token to user token
- Built on Solana blockchain with ZK compression support
- Filepond for file upload
- Supabase storage for image upload
- Pinata integration for Token Metadata URI

## Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: TailwindCSS with NativeWind
- **Blockchain**: Solana Web3.js, SPL Token, Light Protocol (Compressed Tokens)
- **Image Storage**: Supabase
- **Token Metadata URI**: Pinata

## Application Routes

- **/** - Single pager app

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

The application requires several environment variables to be set:

```
# Supabase 
NEXT_PUBLIC_SUPABASE_PROJECT_ANON_API_KEY=
NEXT_PUBLIC_SUPABASE_PROJECT_URL=
NEXT_PUBLIC_SUPABASE_PROJECT_STORAGE_BUCKET_NAME=

# Pinata
NEXT_PUBLIC_PINATA_JWT=
```

## How It Works

1. **Mints token**: Input Token Information
2. **Uploads Token Image URI**: Uploads image URI to Supabase using Filepond
3. Mints cToken to user wallet 


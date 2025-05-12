"use client";

import React, { useRef } from 'react'
import { useWallet } from '@solana/wallet-adapter-react';
import { Keypair, PublicKey } from '@solana/web3.js';
import {
  encodeURL,
  createQR
} from "@solana/pay";
import BigNumber from "bignumber.js";

const Pay = () => {
  const qrRef = useRef<HTMLDivElement>(null);

  const recipient = new PublicKey("CN5iQKU2dY4SbPFYVjx4SfxJPLMPH4qRhnagkCnqPxQY");
  const amount = new BigNumber(0.7);
  const reference = new Keypair().publicKey;
  const label = "ZKCompress Swap";;
  const message = "ZKCompress Swap - #132493";
  const memo = "ZC#2343";
  
  const url = encodeURL({
    recipient,
    amount,
    reference,
    label,
    message,
    memo
  });
  const qrCode = createQR(url);

  if (qrRef.current) {
    qrRef.current.innerHTML = "";
    qrCode.append(qrRef.current);
  }

  console.log(url, qrCode);

  return (
    <div>
      Pay
      <div ref={qrRef}></div>
    </div>
  )
}

export default Pay
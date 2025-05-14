"use client";

import React, { useRef } from 'react'
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
  const label = "ZKCompress Swap";
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

  return (
    <section className="wrapper">
      <div className="wrapper-content-container">
        <h1 className="heading-title">Pay</h1>
        <div 
          ref={qrRef}
          className="w-full"
        />
      </div>
      
    </section>
  )
}

export default Pay
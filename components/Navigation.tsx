"use client";

import Link from 'next/link'
import React from 'react'

import ConnectWallet from "./ConnectWallet";


const Navigation = () => {
  return (
    <nav className="w-full flex items-center justify-between h-16 px-3 sm:px-5 sticky top-0 backdrop-blur-lg z-50 nav-mask">
        <Link
            href="/"
            className="flex items-center gap-2"
        >
            <span className="size-6 bg-yellow-300 rounded-full" />
            <span className="font-bold text-white">ZKSol</span>
        </Link>

        <ConnectWallet />
    </nav>
  )
}

export default Navigation
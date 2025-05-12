"use client";

import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation';

import ConnectWallet from "./ConnectWallet";
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface ILink {
    title: string;
    route: string;
}

const links: ILink[] = [
    {
        title: "Swap",
        route: "/"
    },
    {
        title: "Mint",
        route: "/mint"
    },
    {
        title: "Airdrop",
        route: "/airdrop"
    },
    {
        title: "Pay",
        route: "/pay"
    }
]

const NavigationLink = ({
    title,
    route
}: ILink) => {
    const pathname = usePathname();
    const isActive = pathname === route ? "font-bold text-white" : "";

    return (
        <li>
            <Link
                href={route}
                className={cn(
                    "",
                    isActive
                )}
            >
                {title}
            </Link>
        </li>
    )
}

const Navigation = () => {
  return (
    <nav className="w-full flex items-center justify-between h-16 px-5 sticky top-0 backdrop-blur-lg">
        <Link
            href="/"
            className="flex items-center gap-2"
        >
            <span className="size-6 bg-yellow-300 rounded-full" />
            <span className="font-bold text-white">ZKSwap</span>
        </Link>

        <div className="flex items-center gap-6">
            <ul className="flex items-center gap-x-3">
                {links.map(link => (
                    <NavigationLink 
                        key={link.title}
                        {...link}
                    />
                ))}
            </ul>
            
            <ConnectWallet />
        </div>
    </nav>
  )
}

export default Navigation
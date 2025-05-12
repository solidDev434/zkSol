import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import SolanaWalletProvider from "@/providers/SolanaWalletProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZKSwap Pay",
  description: "Solpay + ZkCompression Swap",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased h-full min-h-screen grid grid-rows-[max-content_1fr]`}
      >
        <SolanaWalletProvider>
          <Navigation />
          {children}
        </SolanaWalletProvider>
      </body>
    </html>
  );
}

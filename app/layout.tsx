import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Providers from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZKSol",
  description: "ZkCompression Minter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased h-full min-h-screen`}
      >
        <Providers>
          <main className="grid grid-rows-[max-content_1fr] pb-8">
            <Navigation />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}

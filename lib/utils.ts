import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateWalletAddress = (address: any) => {
  return `${address.substring(0, 5)}••••${address.substring(address.length - 4, address.length)}`
}
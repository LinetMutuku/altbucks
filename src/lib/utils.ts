import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export const API_URL = "https://authentication-1-bqvg.onrender.com"
export const API_URL = "https://altbucks-server-t.onrender.com"
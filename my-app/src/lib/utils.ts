import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toggletemperature(temp: number, unit: string) {
  if (unit === "C") {
    return Math.round(temp);
  } else {
    return Math.round(temp * 1.8 + 32);
  }
}
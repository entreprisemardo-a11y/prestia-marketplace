import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Fusionne intelligemment les classes Tailwind CSS.
 * Essentiel pour concevoir des composants UI réutilisables (Design System).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

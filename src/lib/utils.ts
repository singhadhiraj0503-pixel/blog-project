import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export const slugify = (text: string) => {
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/ +/g, "-");
// };

export const slugify = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

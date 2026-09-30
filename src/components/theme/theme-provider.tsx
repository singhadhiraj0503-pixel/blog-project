"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "../layout/header";
import { cn } from "@/lib/utils";

// export function ThemeProvider({
//   children,
//   ...props
// }: React.ComponentProps<typeof NextThemesProvider>) {
//   return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
// }

export function ThemeProvider({
  children,
  containerClassName,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <Header />
      <main className={(cn("container mx-auto px-4"), containerClassName)}>
        {children}
      </main>
    </NextThemesProvider>
  );
}

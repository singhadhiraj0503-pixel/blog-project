// import Link from "next/link";
// import React from "react";
// import { Button } from "../ui/button";
// import { useRouter } from "next/navigation";

// type Props = {};

// const Header = (props: Props) => {
//   const router = useRouter();

//   const navItems = [
//     { label: "Home", href: "/" },
//     { label: "Create Posts", href: "/post/create" },
//   ];

//   return (
//     <header className="border-b bg-background sticky top-0 z-10">
//       <div className="container mx-auto px-4 h-16 flex items-center justify-between">
//         <div className="flex items-center  gap-5">
//           <Link href="/" className="font-bold text-xl">
//             Blog Project
//           </Link>

//           <nav className="hidden md:flex items-center gap-5">
//             {navItems.map((navItem) => {
//               return (
//                 <Link key={navItem.href} href={navItem.href}>
//                   {navItem.label}
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="hidden md:block">
//             <p>SEARCH BAR</p>
//           </div>

//           <div className="flex items-center gap-2">
//             {/* <Button variant={"default"} asChild>
//               <Link href="/auth">Login</Link>
//             </Button> */}

//             <Button
//               className="cursor-pointer"
//               onClick={() => router.push("/auth")}
//             >
//               Login
//             </Button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, PenLine, Sparkles, Command } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import { Button } from "../ui/button";
import UserMenu from "../auth/user-menu";
import ThemeToggle from "../theme/theme-toggle";

type Props = {};

const Header = (props: Props) => {
  const { data: session, isPending } = useSession();

  const router = useRouter();
  const [searchFocused, setSearchFocused] = useState(false);

  const navItems = [
    { label: "Stories", href: "/" },
    { label: "Topics", href: "/topics" },
    { label: "Create Post", href: "/post/create" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-zinc-950/70 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-6 h-16 max-w-7xl flex items-center justify-between gap-6">
        {/* Brand Logo & Main Navigation */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 text-zinc-100 hover:text-white transition-colors"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500/20 via-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-zinc-200 group-hover:border-zinc-500/40 group-hover:shadow-[0_0_16px_rgba(99,102,241,0.2)] transition-all">
              <Sparkles className="w-4 h-4 text-zinc-300 group-hover:text-indigo-300 transition-colors" />
            </div>
            <span className="font-serif tracking-tight text-xl font-medium bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              Chronicle
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className="px-3.5 py-1.5 rounded-full text-sm font-normal text-zinc-400 hover:text-zinc-100 hover:bg-white/[0.04] transition-all"
              >
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Search Bar & Actions */}
        <div className="flex items-center gap-3.5">
          {/* Aesthetic Pill Search Bar */}
          {/* <div
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 ${
              searchFocused
                ? "border-zinc-600 bg-zinc-900/90 shadow-[0_0_15px_rgba(255,255,255,0.05)] w-64"
                : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.16] hover:bg-white/[0.05] w-52"
            }`}
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <input
              type="text"
              placeholder="Search essays..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="bg-transparent text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none w-full"
            />
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-zinc-400 font-mono">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </div> */}
          <p>SEARCH BAR</p>

          <div className="h-4 w-px bg-white/10 hidden sm:block" />

          {/* Login Button */}
          <ThemeToggle />
          {/* <Button
            onClick={() => router.push("/auth")}
            className="relative group overflow-hidden rounded tracking-wide focus:outline-none cursor-pointer px-4 py-2 text-[0.9rem] font-semibold"
          >
            Sign In
          </Button> */}
          {isPending ? null : session?.user ? (
            <UserMenu user={session?.user} />
          ) : (
            <Button
              onClick={() => router.push("/auth")}
              className="relative group overflow-hidden rounded tracking-wide focus:outline-none cursor-pointer px-4 py-2 text-[0.9rem] font-semibold"
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

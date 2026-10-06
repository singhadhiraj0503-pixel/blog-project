"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

import { useSession } from "@/lib/auth-client";

import { Button } from "../ui/button";
import UserMenu from "../auth/user-menu";
import ThemeToggle from "../theme/theme-toggle";


const Header = (props: Props) => {
  const { data: session, isPending } = useSession();

  const router = useRouter();

  const navItems = [
    {
      label: "Stories",
      href: "/",
    },
    {
      label: "Topics",
      href: "/topics",
    },
    {
      label: "Create Post",
      href: "/post/create",
    },
  ];

  return (
    <header
      className="
        sticky
        top-0
        z-50
        w-full
        border-b
        border-border
        bg-background/80
        backdrop-blur-xl
        supports-[backdrop-filter]:bg-background/60
        transition-colors
        duration-300
      "
    >
      <div
        className="
          container
          mx-auto
          flex
          h-16
          max-w-7xl
          items-center
          justify-between
          gap-6
          px-6
        "
      >
        {/* ------------------------------------------------ */}
        {/* Brand + Navigation                              */}
        {/* ------------------------------------------------ */}

        <div className="flex items-center gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="
              group
              flex
              items-center
              gap-2.5
              text-foreground
              transition-colors
              duration-200
              hover:text-foreground/80
            "
          >
            {/* Logo Icon */}
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                border
                border-border
                bg-muted
                text-muted-foreground
                transition-all
                duration-200
                group-hover:border-primary/40
                group-hover:bg-accent
                group-hover:text-accent-foreground
              "
            >
              <Sparkles
                className="
                  h-4
                  w-4
                  transition-colors
                  duration-200
                "
              />
            </div>

            {/* Logo Text */}
            <span
              className="
                font-serif
                text-xl
                font-medium
                tracking-tight
                text-foreground
                transition-colors
                duration-200
              "
            >
              Chronicle
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((navItem) => (
              <Link
                key={navItem.href}
                href={navItem.href}
                className="
                  rounded-full
                  px-3.5
                  py-1.5
                  text-sm
                  font-normal
                  text-muted-foreground
                  transition-all
                  duration-200
                  hover:bg-accent
                  hover:text-accent-foreground
                "
              >
                {navItem.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ------------------------------------------------ */}
        {/* Right Side Actions                              */}
        {/* ------------------------------------------------ */}

        <div className="flex items-center gap-3.5">
          {/* Search */}
          <p className="hidden text-sm text-muted-foreground sm:block">
            SEARCH BAR
          </p>

          {/* Divider */}
          <div
            className="
              hidden
              h-4
              w-px
              bg-border
              sm:block
            "
          />

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Authentication */}
          {isPending ? null : session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <Button
              onClick={() => router.push("/auth")}
              className="
                cursor-pointer
                rounded
                px-4
                py-2
                text-[0.9rem]
                font-semibold
                tracking-wide
                transition-colors
              "
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

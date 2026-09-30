import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  const router = useRouter();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Create Posts", href: "/post/create" },
  ];

  return (
    <header className="border-b bg-background sticky top-0 z-10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center  gap-5">
          <Link href="/" className="font-bold text-xl">
            Blog Project
          </Link>

          <nav className="hidden md:flex items-center gap-5">
            {navItems.map((navItem) => {
              return (
                <Link key={navItem.href} href={navItem.href}>
                  {navItem.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <p>SEARCH BAR</p>
          </div>

          <div className="flex items-center gap-2">
            {/* <Button variant={"default"} asChild>
              <Link href="/auth">Login</Link>
            </Button> */}

            <Button
              className="cursor-pointer"
              onClick={() => router.push("/auth")}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

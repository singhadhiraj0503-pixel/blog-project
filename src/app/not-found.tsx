import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

type Props = {};

const NotFoundPage = (props: Props) => {
  return (
    <div className="h-screen w-full bg-black flex flex-col gap-5 justify-center items-center font-mono">
      <h1 className="text-4xl">404</h1>
      <h3 className="text-2xl">Page Not Found</h3>
      <p className="text-xl">
        The page you are looking for does not exists or has been removed by the
        developer
      </p>

      <Button className="px-4 py-3 text-xl">
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;

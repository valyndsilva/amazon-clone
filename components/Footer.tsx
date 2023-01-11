import Image from "next/image";
import React from "react";

type Props = {};

function Footer({}: Props) {
  return (
    <footer className="flex h-24 w-full items-center justify-center border-t">
      <p className="flex items-center justify-center gap-2">
        Powered by{" "}
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </p>
    </footer>
  );
}

export default Footer;

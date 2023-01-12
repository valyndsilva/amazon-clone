import Image from "next/image";
import Link from "next/link";
import React from "react";
import Deal from "./Deal";

type Props = {
  title: string;
  productTitle: string;
  text: string;
  image: string;
};

function Deals({ title, productTitle, text, image }: Props) {
  return (
    <div className="bg-white z-30 m-5 p-5">
      <h2 className="text-lg font-bold">{title}</h2>
      <Deal productTitle={productTitle} image={image} />
      <Link href="/" className="text-xs text-amazonBlue-dark">
        {text}
      </Link>
    </div>
  );
}

export default Deals;

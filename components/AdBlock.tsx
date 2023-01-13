import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  productTitle?: string;
  text: string;
  image: string;
  deal?: boolean;
};

function AdBlock({ title, productTitle, text, image, deal }: Props) {
  return (
    <div className="bg-white z-30 m-5 p-5">
      <h2 className="text-xl font-bold">{title}</h2>
      <Image
        src={`/assets/${image}.jpg`}
        width={390}
        height={390}
        alt={title}
        className="object-cover mx-auto py-3"
      />
      {deal && (
        <div className="flex space-x-2 items-center">
          <span className="bg-red-700 px-1 py-2 text-xs text-white">
            Up to 63% off
          </span>
          <span className="text-red-700 p-1 font-bold text-xs">Deal</span>
        </div>
      )}
      {productTitle && <p className="text-xs pt-2 pb-5">{productTitle}</p>}

      <Link href="/" className="text-xs text-amazonBlue-dark">
        {text}
      </Link>
    </div>
  );
}

export default AdBlock;

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {
  productTitle: string;
  image: string;
  id?: string;
};

function Deal({ image, productTitle, id }: Props) {
  return (
    <Link href={`/product/${id}`}>
      <div>
        <Image
          src={image}
          width={390}
          height={390}
          alt={productTitle}
          className="object-contain mx-auto py-3 p-5 h-60 cursor-pointer"
        />
      </div>
      <div className="flex space-x-2 items-center">
        <span className="bg-red-700 px-1 py-2 text-xs text-white">
          Up to 50% off
        </span>
        <span className="text-red-700 p-1 font-bold text-xs">Deal</span>
      </div>
      <p className="text-xs pt-2 pb-5">{productTitle}</p>
    </Link>
  );
}

export default Deal;

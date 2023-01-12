import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import CurrencyFormat from "react-currency-format";

type Props = {
  product: Product;
};

function Product({ product }: Props) {
  // Generate Random Rating
  //   const MAX_RATING = 5;
  //   const MIN_RATING = 1;
  //   const [rating] = useState(
  //     Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  //   );
  const starRating = Math.floor(product.rating.rate);

  //Generate Random Prime Delivery Rating
  const [hasPrime] = useState(Math.random() < 0.5); // If less than 0.5 should have prime delivery
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {product.category}
      </p>
      <Image
        src={product.image}
        alt={product.title}
        height={200}
        width={200}
        className="object-contain mx-auto"
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(starRating)
          .fill()
          .map((_, index) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        <CurrencyFormat
          value={product.price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"£"}
        />
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            src="/assets/amazon-prime.png"
            alt="prime delivery"
            width={48}
            height={48}
            className=""
          />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}
      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}

export default Product;

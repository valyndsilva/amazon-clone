import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import Currency from "react-currency-formatter";
import {
  addToBasket,
  getBasketCount,
  getSubTotal,
  getTax,
  getTotalAmount,
} from "../redux/slices/basketSlice";

type Props = {
  product: any;
};

function Product({ product }: Props) {
  // Generate Random Rating
  //   const MAX_RATING = 5;
  //   const MIN_RATING = 1;
  //   const [rating] = useState(
  //     Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  //   );

  // const starRating = Math.floor(product.rating.rate);
  // To avoid invalid Array length Error:
  const starRating = Math.max(0, Math.floor(product.rating?.rate));

  //Generate Random Prime Delivery Rating
  const [hasPrime] = useState(Math.random() < 0.5); // If less than 0.5 should have prime delivery

  // Add to basket
  const dispatch = useDispatch();
  const handleAddToBasket = (product: any) => {
    //Push item as an action into REDUX store
    dispatch(addToBasket(product));
    dispatch(getBasketCount());
    dispatch(getTax());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
  };
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
        className="object-contain mx-auto h-60"
      />
      <h4 className="my-3">{product.title}</h4>
      <div className="flex">
        {Array(starRating)
          .fill(undefined)
          .map((_, index) => (
            <StarIcon key={index} className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{product.description}</p>
      <div className="mb-5">
        {/* <Currency
          quantity={Number(product.price)}
          currency="GBP"
        /> */}
        £{product.price}
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
      <button
        className="mt-auto button"
        onClick={() => handleAddToBasket(product)}
      >
        Add to Basket
      </button>
    </div>
  );
}

export default Product;

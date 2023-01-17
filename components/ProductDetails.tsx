import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    <div className="flex flex-col md:grid md:grid-cols-7 md:gap-6 md:m-5 bg-white z-30 p-5 items-center">
      <div className="w-full md:col-span-2  mx-5">
        <Image
          src={product.image}
          alt={product.title}
          height={200}
          width={200}
          className="object-contain mx-auto h-60 cursor-pointer"
        />
      </div>
      <div className="w-full  md:col-span-3 mx-5">
        <h4 className="my-3 text-2xl">{product.title}</h4>
        <div className="flex">
          {Array(starRating)
            .fill(undefined)
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-sm my-2">{product.description}</p>
        <span className="font-semibold text-xl"> £{product.price}</span>
        {hasPrime && (
          <div className="flex items-center space-x-2 ">
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
      </div>
      <div className="w-full md:col-span-2 mx-5">
        <span className="hidden md:inline-flex font-semibold text-xl">
          {" "}
          £{product.price}
        </span>
        {hasPrime && (
          <div className="flex items-center space-x-2">
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
        <p className="text-sm">
          FREE Next-day delivery{" "}
          <span className="font-bold">
            {" "}
            Tomorrow,
            {new Date().toLocaleString("default", { month: "long" })}{" "}
            {new Date().getDate() + 1}.
          </span>{" "}
        </p>
        <p className="text-sm">
          {" "}
          Order within <span className="text-green-700">3 hrs 10 mins</span>.
          Details
        </p>

        <p className="text-lg text-green-700 my-2">In stock.</p>

        <button
          className="mt-auto button"
          onClick={() => handleAddToBasket(product)}
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
}

export default Product;

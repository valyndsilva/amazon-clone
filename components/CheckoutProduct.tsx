import {
  BookmarkIcon,
  EyeIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  decrement,
  getBasketCount,
  getSubTotal,
  getTax,
  getTotalAmount,
  increment,
  removeFromBasket,
} from "../redux/slices/basketSlice";

type Props = {
  product: any;
};

function CheckoutProduct({ product }: Props) {
  // console.log(product);
  // console.log(product.rating);
  const starRating = Math.floor(product.rating?.rate);
  // To avoid invalid Array length Error:
  // const starRating = Math.max(0, Math.floor(product.rating?.rate));

  //Generate Random Prime Delivery Rating
  const [hasPrime] = useState(Math.random() < 0.5); // If less than 0.5 should have prime delivery

  // Add to basket
  const dispatch = useDispatch();
  // const { subAmount, tax, totalAmount } = useSelector(
  //   (state: any) => state.basket
  // );
  // console.log(subAmount, tax, totalAmount);

  // const handleAddToBasket = (product: any) => {
  //   //Push item as an action into REDUX store
  //   dispatch(addToBasket(product));
  //   dispatch(getBasketCount());
  //   dispatch(getTax());
  //   dispatch(getSubTotal());
  //   dispatch(getTotalAmount());
  // };
  const handleRemoveFromBasket = (id: any) => {
    //Push item as an action into REDUX store
    dispatch(removeFromBasket(id));
    dispatch(getBasketCount());
    // dispatch(getTax());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
  };
  const handleIncrementQty = (id: any) => {
    //Push item as an action into REDUX store
    dispatch(increment(id));
    dispatch(getBasketCount());
    // dispatch(getTax());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
  };
  const handleDecrementQty = (id: any) => {
    //Push item as an action into REDUX store
    dispatch(decrement(id));
    dispatch(getBasketCount());
    // dispatch(getTax());
    dispatch(getSubTotal());
    dispatch(getTotalAmount());
  };
  return (
    <div className="flex flex-col items-center lg:grid lg:grid-cols-4">
      <div className="lg:col-span-1">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="lg:col-span-3 mx-5 border-b lg:border-0">
        <div className="flex items-center justify-between">
          {" "}
          <h4 className="my-3 text-lg font-medium">{product.title}</h4>
          <p className="font-bold text-lg">£{product.price}</p>
        </div>
        <div className="flex">
          {Array(starRating)
            .fill(undefined)
            .map((_, index) => (
              <StarIcon key={index} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-2">{product.description}</p>
        <p className="text-xs">
          Gift options not available.{" "}
          <span className="text-amazonBlue-link">Learn more.</span>{" "}
        </p>
        <div className="md:inline-flex space-y-4 md:space-y-0  md:space-x-4 items-center mt-2 mb-5 lg:divide-x">
          <div className="flex items-center space-x-4 ">
            <button onClick={() => handleIncrementQty(product.id)}>
              <PlusCircleIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
            </button>
            <span className=" text-center inline-block">{product.itemQty}</span>
            <button onClick={() => handleDecrementQty(product.id)}>
              <MinusCircleIcon className="w-6 h-6 text-gray-500 cursor-pointer" />
            </button>
          </div>
          <p
            className="md:pl-4 flex items-center space-x-2 text-amazonBlue-link cursor-pointer"
            onClick={() => handleRemoveFromBasket(product.id)}
          >
            <TrashIcon className="w-5 h-5" />
            <span className="text-sm">Delete</span>
          </p>
          <p className="md:pl-4 flex items-center space-x-2 text-amazonBlue-link cursor-pointer">
            <BookmarkIcon className="w-5 h-5" />
            <span className="text-sm">Save For Later</span>
          </p>
          <p className="md:pl-4 flex items-center space-x-2 text-amazonBlue-link cursor-pointer">
            <EyeIcon className="w-5 h-5" />
            <span className="text-sm">See more like this</span>
          </p>
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
      </div>
    </div>
  );
}

export default CheckoutProduct;

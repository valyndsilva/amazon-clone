import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../redux/slices/basketSlice";

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

  const addItemToBasket = () => {
    console.log(product);
    const item = product;
    //Push item as an action into REDUX store
    dispatch(addToBasket(item));
  };
  const removeItemFromBasket = () => {
    const item = product;
    //Push item as an action into REDUX store
    dispatch(removeFromBasket(item.id));
  };
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="object-contain"
        />
      </div>
      <div className="col-span-3 mx-5">
        <h4 className="my-3">{product.title}</h4>
        <div className="flex">
          {Array(starRating)
            .fill(undefined)
            .map((_, index) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{product.description}</p>
        <div className="mb-5">£{product.price}</div>
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
      <div className="col-span-1 flex flex-col space-y-2 my-auto justify-self-end">
        <button className="mt-auto button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="mt-auto button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;

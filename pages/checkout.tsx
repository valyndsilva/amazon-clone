import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { CheckoutProduct, Header } from "../components";
import Product from "../components/Product";
import { selectItems, selectTotal } from "../redux/slices/basketSlice";

type Props = {};

function checkout({}: Props) {
  const items = useSelector(selectItems);
  console.log(items);
  const total = useSelector(selectTotal);
  console.log(total);

  const { data: session } = useSession();
  return (
    <div className="bg-amazonGray">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="/assets/amazon-ad.jpeg"
            alt="amazon ad"
            width={1500}
            height={250}
            className="object-contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items?.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items?.map((item: Product) => (
              <CheckoutProduct key={item.id} product={item} />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md ">
          {items?.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="ml-2">£{Number(total).toFixed(2)}</span>
              </h2>
              <button
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;

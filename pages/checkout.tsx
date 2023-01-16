import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutProduct, Footer, Header } from "../components";
import {
  clearBasket,
  getBasketCount,
  getSubTotal,
  getTax,
  getTotalAmount,
  selectItems,
} from "../redux/slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

type Props = {};

function checkout({}: Props) {
  const dispatch = useDispatch();

  const { subAmount, tax, totalAmount, totalItemQty } = useSelector(
    (state: any) => state.basket
  );
  useEffect(() => {
    dispatch(getBasketCount());
    dispatch(getSubTotal());
    //  dispatch(getTax());
    dispatch(getTotalAmount());
  }, [dispatch]);

  const items = useSelector(selectItems);
  // console.log(items);
  // console.log(total);
  // console.log(subAmount, tax, totalAmount);

  // To Clear Basket after Checkout
  const handleClearBasket = () => {
    dispatch(clearBasket());
  };

  const { data: session } = useSession();

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // Step 1 - Call the backend API to create a checkout session and pass the body info...
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session!.user!.email,
    });

    // Step 3-Redirect user/customer to Stripe checkout
    const result = await stripe!.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);

    //Step 4 - Clear the Checkout Basket
    handleClearBasket();
  };

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
        <div className="flex flex-col bg-white p-10 shadow-md m-5">
          {items?.length > 0 && (
            <>
              <h2 className="whitespace-nowrap text-sm">
                {/* Subtotal ({items.length} items): */}
                Subtotal ({totalItemQty} items):
                <span className="ml-2">£{Number(subAmount).toFixed(2)}</span>
              </h2>
              <h2 className="whitespace-nowrap  text-sm">
                {/* Subtotal ({items.length} items): */}
                Postage & Packaging :<span className="ml-2">£0.00</span>
              </h2>
              {/* <h2 className="whitespace-nowrap  text-sm">
                Total before VAT:
                <span className="ml-2">£{Number(subAmount).toFixed(2)}</span>
              </h2>
              <h2 className="whitespace-nowrap  text-sm">
                <span className="text-amazonBlue-link">Estimated VAT:</span>
                <span className="ml-2">£{Number(tax).toFixed(2)}</span>
              </h2> */}
              <h2 className="whitespace-nowrap font-bold text-red-800 text-xl">
                {/* Subtotal ({items.length} items): */}
                Order Total:
                <span className="ml-2">£{Number(totalAmount).toFixed(2)}</span>
              </h2>
              <button
                type="submit"
                onClick={createCheckoutSession}
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
      <Footer />
    </div>
  );
}

export default checkout;

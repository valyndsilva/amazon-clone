import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Footer, Header } from "../components";
import { clearBasket } from "../redux/slices/basketSlice";

type Props = {};

function success({}: Props) {
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearBasket());
  }, [dispatch]);

  return (
    <div className="bg-gray-100 h-screen">
      <Header />
      <main className="max-w-screen-lg mx-auto">
        <div className="flex flex-col p-10 m-5 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="text-green-500 h-10" />
            <h1>Thank you, your order has been confirmed!</h1>
          </div>
          <p>
            Thank you for shopping with us. We'll send a confirmation once your
            item has been shipped. If you would like to check the status of your
            order(s) please press the link below.
          </p>
          <button className="button mt-8" onClick={() => router.push("orders")}>
            Go to my orders
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default success;

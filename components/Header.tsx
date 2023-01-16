import Image from "next/image";
import React from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  MapPinIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import DropDown from "./DropDown";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../redux/slices/basketSlice";

type Props = {};

function Header({}: Props) {
  const { data: session } = useSession();
  // console.log(session);
  const router = useRouter();
  const { totalItemQty } = useSelector((state: any) => state.basket);

  return (
    <header>
      <div className="flex items-center bg-amazonBlue flex-grow p-2 py-2 space-x-2">
        {/* Logo */}
        <div
          className="flex  items-center flex-grow sm:flex-grow-0"
          onClick={() => router.push("/")}
        >
          <div className="mt-2">
            <Image
              src="/amazon.png"
              alt=""
              width={100}
              height={40}
              className="object-contain cursor-pointer"
            />
          </div>
          <span className="items-center text-white text-xs">.co.uk</span>
        </div>
        {/* Select Address */}
        <div className="flex flex-col text-white space-x-4">
          <span className="font-light text-xs ml-9 text-gray-300">Hello</span>
          <div className="flex text-sm items-center ">
            <MapPinIcon className="w-5 h-5" />
            <span className="font-bold text-sm leading-3">
              Select your address
            </span>
          </div>
        </div>
        {/* Search Input */}
        <div className="hidden sm:flex flex-grow cursor-pointer h-10 bg-amazonYellow hover:bg-amazonYellow-hover rounded-md">
          <DropDown />
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink focus:outline-none px-4"
            type="text"
          />
          <MagnifyingGlassIcon className="h-10 p-2" />
        </div>
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace:no-wrap">
          <div
            className="navLink"
            onClick={!session ? () => signIn() : () => signOut()}
          >
            {session ? (
              <p>Hello, {session!.user!.name}</p>
            ) : (
              <p>Hello, sign in</p>
            )}

            <p className="flex">
              <span className="font-extrabold md:text-sm">
                Accounts & Lists
              </span>{" "}
              <ChevronDownIcon className="w-3 h-4" />
            </p>
          </div>
          <div className="navLink " onClick={() => router.push("/orders")}>
            <p className="">Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          <div
            className="relative navLink flex items-center"
            onClick={() => router.push("/checkout")}
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 bg-amazonYellow rounded-full text-center text-black font-bold">
              {totalItemQty}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:inline-flex font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Links */}
      <div className="flex items-center bg-amazonBlue-light text-white text-sm space-x-5 p-2 pl-6">
        <p className="link flex items-center">
          <Bars3Icon className="h-6 mr-1" /> All
        </p>
        <p className="link">Best Sellers</p>
        <p className="link">Gift Ideas</p>
        <p className="link">Prime Video</p>
        <p className="link">Customer Service</p>
        <p className="link">Music</p>
        <p className="link hidden md:inline-flex">Today's Deals</p>
        <p className="link hidden md:inline-flex">New Releases</p>
        <p className="link hidden md:inline-flex">Books</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Audible</p>
        <p className="link hidden lg:inline-flex">Vouchers</p>
        <p className="link hidden xl:inline-flex">PC & Video Games</p>
      </div>
    </header>
  );
}

export default Header;

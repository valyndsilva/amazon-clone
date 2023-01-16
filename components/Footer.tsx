import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

function Footer({}: Props) {
  const places = [
    "Australia",
    "Brazil",
    "Canada",
    "China",
    "France",
    "Germany",
    "India",
    "Italy",
    "Japan",
    "Mexico",
    "Netherlands",
    "Poland",
    "Singapore",
    "Spain",
    "Turkey",
    "United Arab Emirates",
    "United States",
  ];
  return (
    <footer className="flex flex-col mt-10 w-full items-center justify-center border-t divide-y divide-gray-600">
      <div className="bg-amazonBlue-lighter w-full h-16 flex items-center justify-center text-white text-center">
        Back to top
      </div>
      <div className="bg-amazonBlue-light w-full p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 text-white">
        <div className="space-y-2 mb-5 text-xs">
          <h3 className="font-bold mb-2 text-sm">Get to Know Us</h3>
          <p>Careers</p>
          <p>About Us</p>
          <p>Uk Modern Slavery Statement</p>
          <p>Sustainability</p>
          <p>Amazon Science</p>
        </div>
        <div className="space-y-2 mb-5 text-xs">
          <h3 className="font-bold mb-2 text-sm">Make Money with Us</h3>
          <p>Sell on Amazon</p>
          <p>Sell on Amazon Business</p>
          <p>Sell on Amazon Handmade</p>
          <p>Sell on Amazon Launchpad</p>
          <p>Protect and build your brand</p>
          <p>Associates Programme</p>
          <p>Fulfilment by Amazon</p>
          <p>Seller Fulfilled Prime</p>
          <p>Advertise Your Products</p>
          <p>Independently Publish with Us</p>
          <p>Amazon Pay</p>
          <p>Host an Amazon Hub</p>
        </div>
        <div className="space-y-2 mb-5 text-xs">
          <h3 className="font-bold mb-2 text-sm">Amazon Payment Methods</h3>
          <p>Amazon Platinum Mastercard</p>
          <p>Amazon Classic Mastercard</p>
          <p>Amazon Money Store</p>
          <p>Gift Cards</p>
          <p>Amazon Currency Converter</p>
          <p>Payment Methods Help</p>
          <p>Shop with Points</p>
          <p>Top Up Your Account</p>
          <p>Top Up Your Account in Store</p>
        </div>
        <div className="space-y-2 mb-5 text-xs">
          <h3 className="font-bold mb-2 text-sm">Let Us Help You</h3>
          <p>COVID-19 and Amazon</p>
          <p>Track Packages or View Orders</p>
          <p>Delivery Rates & Policies</p>
          <p>Amazon Prime</p>
          <p>Returns & Replacements</p>
          <p>Recycling</p>
          <p>Manage Your Content and Devices</p>
          <p>Amazon Mobile App</p>
          <p>Amazon Assistant</p>
          <p>Customer Service</p>
        </div>
      </div>
      <div className="bg-amazonBlue-light w-full p-10">
        <span className="flex items-center justify-center gap-2 ">
          <Image src="/amazon.png" alt="Vercel Logo" width={72} height={16} />
        </span>
        <div className="text-bold text-xs items-center text-center break-words text-white py-3 px-3 space-x-4">
          {places.map((place,index) => (
            <Link key={index} href="#">{place}</Link>
          ))}
        </div>
      </div>
      <div className="flex flex-col px-20 py-10 w-full items-center justify-center bg-amazonBlue text-white ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full mx-auto">
          <div className="flex flex-col space-y-5 ">
            <div>
              <h4 className="text-xs text-white">Amazon Music</h4>
              <p className="text-xs text-gray-400">Stream millions of songs</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Audible</h4>
              <p className="text-xs text-gray-400">Download Audiobooks</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Home Services</h4>
              <p className="text-xs text-gray-400">Experienced pros</p>
              <p className="text-xs text-gray-400">Happiness Guarantee</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Warehouse</h4>
              <p className="text-xs text-gray-400">Deep Discounts</p>
              <p className="text-xs text-gray-400">Open-Box Products</p>
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <div>
              <h4 className="text-xs text-white">Amazon Music</h4>
              <p className="text-xs text-gray-400">Stream millions of songs</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Audible</h4>
              <p className="text-xs text-gray-400">Download Audiobooks</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Home Services</h4>
              <p className="text-xs text-gray-400">Experienced pros</p>
              <p className="text-xs text-gray-400">Happiness Guarantee</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Warehouse</h4>
              <p className="text-xs text-gray-400">Deep Discounts</p>
              <p className="text-xs text-gray-400">Open-Box Products</p>
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <div>
              <h4 className="text-xs text-white">Amazon Music</h4>
              <p className="text-xs text-gray-400">Stream millions of songs</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Audible</h4>
              <p className="text-xs text-gray-400">Download Audiobooks</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Home Services</h4>
              <p className="text-xs text-gray-400">Experienced pros</p>
              <p className="text-xs text-gray-400">Happiness Guarantee</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Warehouse</h4>
              <p className="text-xs text-gray-400">Deep Discounts</p>
              <p className="text-xs text-gray-400">Open-Box Products</p>
            </div>
          </div>
          <div className="flex flex-col space-y-5">
            <div>
              <h4 className="text-xs text-white">Amazon Music</h4>
              <p className="text-xs text-gray-400">Stream millions of songs</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Audible</h4>
              <p className="text-xs text-gray-400">Download Audiobooks</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Home Services</h4>
              <p className="text-xs text-gray-400">Experienced pros</p>
              <p className="text-xs text-gray-400">Happiness Guarantee</p>
            </div>
            <div>
              <h4 className="text-xs text-white">Amazon Warehouse</h4>
              <p className="text-xs text-gray-400">Deep Discounts</p>
              <p className="text-xs text-gray-400">Open-Box Products</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-10 space-y-1 text-xs font-bold text-gray-400 items-center">
          <div className="flex space-x-4">
            <p>Conditions of Use & Sale</p>
            <p> Privacy Notice</p>
            <p>Cookies Notice</p>
            <p>Interest-Based Ads Notice</p>
          </div>
          <p>© 1996-2022, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

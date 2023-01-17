import React from "react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

type Props = {
  order: Order;
  userName: string;
};

function Order({ order, userName }: Props) {
  // console.log(order);
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDER PLACED</p>
          <p>{moment.unix(order.timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="font-bold text-xs">TOTAL</p>
          <p>£{order.amount}</p>
        </div>
        <div className="hidden md:inline-flex md:flex-col">
          <p className="font-bold text-xs">DISPATCH TO</p>
          <p>{userName}</p>
        </div>
        <div className="text-xs whitespace-nowrap self-end flex-1 text-right ">
          <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
            <span className="font-bold">ORDER#</span> {order.id}
          </p>
          <p>{order.items.length} items</p>
          <div className="hidden md:inline-flex text-amazonBlue-link justify-end items-center divide-x divide-gray-300">
            <p className="text-xs pr-2">View order details</p>
            <p className="text-xs pl-2">Invoice</p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {order.images.map((image, index) => (
            <div key={index} className="">
              <Image
                className="object-contain h-20 sm:h-32"
                src={image}
                alt=""
                width={200}
                height={250}
              />
              <div className="mt-5 text-center text-gray-400 text-sm flex flex-col justify-center items-center ">
                <p className="truncate w-48">
                  {order.items[index].description}
                </p>
                <span> Quantity: {order.items[index].quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;

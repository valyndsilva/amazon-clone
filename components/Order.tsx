import React from "react";
import moment from "moment";

type Props = {
  order: Order;
  userName: string;
};

function Order({ order, userName }: Props) {
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
        <div>
          <p className="font-bold text-xs">DISPATCH TO</p>
          <p>{userName}</p>
        </div>
        <div className="text-xs whitespace-nowrap self-end flex-1 text-right ">
          <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
            <span className="font-bold">ORDER#</span> {order.id}
          </p>
          {order.items.length} items
          <div className="flex text-amazonBlue-link justify-end items-center divide-x divide-gray-300">
            <p className="text-xs pr-2">View order details</p>
            <p className="text-xs pl-2">Invoice</p>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {order.images.map((image) => (
            <img className="object-contain h-20 sm:h-32" src={image} alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;

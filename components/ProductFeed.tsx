import Image from "next/image";
import React from "react";
import Product from "./Product";

type Props = {
  products: Product[];
};

function ProductFeed({ products }: Props) {
  return (
    // <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 -mt-20 md:-mt-40 lg:-mt-52 xl:-mt-80">
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.slice(0, 4).map((product, index) => (
        <Product key={index} product={product} />
      ))}
      <Image
        className="md:col-span-full mx-auto"
        src="/assets/amazon-ad.jpeg"
        alt="Discover your next great read with kindle book deals"
        width={1500}
        height={400}
      />
      {/* {products?.slice(5, products.length).map((product, index) => ( */}
      {products?.slice(5,13).map((product, index) => (
        <Product key={index} product={product} />
      ))}
    </div>
  );
}

export default ProductFeed;

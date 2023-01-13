import Image from "next/image";
import React from "react";
import Product from "./Product";

type Props = {
  products: Product[];
};

function ProductFeed({ products }: Props) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.slice(0, 4).map((product) => (
        <Product key={product.id} product={product} />
      ))}
      <Image
        className="md:col-span-full mx-auto"
        src="/assets/amazon-ad.jpeg"
        alt="Discover your next great read with kindle book deals"
        width={1500}
        height={400}
      />
      {/* {products?.slice(5, products.length).map((product) => ( */}
      {products?.slice(5, 13).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductFeed;

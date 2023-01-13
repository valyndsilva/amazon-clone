import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "./Product";
import Image from "next/image";
type Props = {
  products: Product[];
  title: string;
};

function BestSellers({ products, title }: Props) {
  // console.log(products);
  return (
    <div className="m-5">
      <div className="bg-white p-5">
        <h2 className="font-bold text-xl">{title}</h2>
        <Carousel
          autoPlay
          infiniteLoop
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          interval={5000}
          centerMode={true}
          centerSlidePercentage={20}
          className="carousel bg-white"
        >
          {products?.map((product, index) => (
            <Image
              key={index}
              src={product.image}
              alt={product.title}
              width={180}
              height={250}
              className=" bg-white p-5 h-60 object-contain"
            />
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default BestSellers;

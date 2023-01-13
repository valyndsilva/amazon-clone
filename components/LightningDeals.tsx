import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Deal from "./Deal";
type Props = {
  products: Product[];
  title: string;
};

function LightiningDeals({ products, title }: Props) {
  console.log(products);
  return (
      <div className="m-5 bg-white p-5">
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-xl">{title}</h2>
          <span className="text-sm text-amazonBlue-dark">See more</span>
        </div>
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
            <Deal key={index} productTitle={product.title} image={product.image} />
          ))}
        </Carousel>
      </div>
  );
}

export default LightiningDeals;

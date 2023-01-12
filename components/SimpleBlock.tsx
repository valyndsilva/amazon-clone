import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Product from "./Product";
import Image from "next/image";
type Props = {
  title: string;
};

function SimpleBlock({ title }: Props) {
  const products = [
    "/assets/device-1.jpg",
    "/assets/device-2.jpg",
    "/assets/device-3.jpg",
    "/assets/device-4.jpg",
    "/assets/device-5.jpg",
    "/assets/device-6.jpg",
    "/assets/device-7.jpg",
    "/assets/device-8.jpg",
    "/assets/device-9.jpg",
    "/assets/device-10.jpg",
    "/assets/device-11.jpg",
    "/assets/device-12.jpg",
  ];
  return (
    <div className="m-5">
      <div className="bg-white p-5">
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
          {products?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="amazon device"
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

export default SimpleBlock;

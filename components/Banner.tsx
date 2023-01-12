import Image from "next/image";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
type Props = {};

function Banner({}: Props) {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img src="/assets/amazon-slide-1.jpg" alt="slide 1" />
        </div>
        <div>
          <img src="/assets/amazon-slide-2.jpg" alt="slide 2" />
        </div>
        <div>
          <img src="/assets/amazon-slide-3.jpg" alt="slide 3" />
        </div>
        <div>
          <img src="/assets/amazon-slide-4.jpg" alt="slide 4" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;

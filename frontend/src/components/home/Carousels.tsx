"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import cn from "classnames";
import Image from "next/image";

const images = [
  "https://img.freepik.com/premium-photo/fashion-models-strutting-down-runways-new-york-fashion-weekgenerated-with-ai_130181-22428.jpg",
  "https://assets.gqindia.com/photos/5e25699b65e6530008ab9cf3/16:9/w_1920,c_limit/DIOR-MEN'S-WINTER-20-21---GROUPSHOT-BY-BRETT-LLOYD-FOR-DIOR.jpg",
  "https://t4.ftcdn.net/jpg/06/52/95/39/240_F_652953949_YB0jOSYkzAzqRbgeOTCtGCMQhGrzd63A.jpg",
  "https://as2.ftcdn.net/v2/jpg/12/69/73/31/1000_F_1269733184_Fad1aqd1hEpYUxwUGCfNQLMgvOvABJKO.jpg",
];

export const Carousels = () => {
  const [current, setCurrent] = useState(0);

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="relative w-full max-w-5xl h-64 sm:h-80 md:h-96 lg:h-[450px] rounded-xl overflow-hidden">
        <div className="relative w-full h-full">
          <Image
            src={images[current]}
            alt={`Slide ${current}`}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 p-2 rounded-full text-white"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      <div className="mt-4 flex gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-4 h-4 rounded-full border border-black",
              current === index ? "bg-white" : "bg-black"
            )}
          />
        ))}
      </div>
    </div>
  );
};

"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import cn from "classnames";
import Image from "next/image";

const images = [
  "https://img.freepik.com/premium-photo/fashion-models-strutting-down-runways-new-york-fashion-weekgenerated-with-ai_130181-22428.jpg",
  "https://img.freepik.com/free-photo/fashionable-mannequins-window-display-showcasing-current-trends_60438-3531.jpg",
  "https://img.freepik.com/premium-photo/stylish-woman-with-green-jacket-sunglasses_1353244-32800.jpg",
  "https://img.freepik.com/premium-photo/standing-small-sidewalk-hands-tucked-into-his-pockets-is-man-wearing-chic-greygreen-suit-sunglasses_28914-62899.jpg",
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

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const GallerySection = () => {
  const [randomImages, setRandomImages] = useState<{ src: string }[]>([]);

  useEffect(() => {
    const generateRandomImages = Array.from({ length: 10 }, () => ({
      src: `/images/dummy${Math.floor(Math.random() * 4)}.jpg`,
    }));

    setRandomImages(generateRandomImages);
  }, []);

  return (
    <section className="flex w-full flex-col justify-center bg-neutral/10 lg:min-h-screen">
      <header className="flex h-1/3 flex-col items-center justify-center gap-4 p-4 text-center text-primary lg:p-8">
        <h1 className="font-italiana text-[12vw] lg:text-[8vw]">
          For Your Pleasure
        </h1>
        <p className="font-sans tracking-wide">
          We serve the best stand service and delicious menus for you.
        </p>
      </header>
      <main className="flex min-h-[500px] items-center justify-end gap-[25px] overflow-hidden">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="flex flex-shrink-0 animate-slider gap-[25px]">
            {randomImages.map((img, j) => (
              <Image
                key={j}
                src={img.src}
                alt="Image Gallery"
                width={300}
                height={300}
                priority
                className="h-[300px] w-[300px] flex-shrink-0 border border-primary object-cover p-2"
                style={{
                  transform: `translate(0px,${Math.sin(j * 2) * 50}px) rotate(${Math.cos(j * 2) * 3}deg)`,
                }}
              />
            ))}
          </div>
        ))}
      </main>
    </section>
  );
};

export default GallerySection;

"use client";

import Image from "next/image";
import { createRef, RefObject, useEffect, useRef } from "react";

const CursorGallery = () => {
  const refs = useRef<RefObject<HTMLImageElement | null>[]>(
    Array.from({ length: 24 }, () => createRef()),
  );
  const containerRef = useRef<HTMLElement>(null);
  let currentIndex: number = 0;
  let steps: number = 0;
  let nbOfImages: number = 0;

  const lastPosition = useRef({ x: 0, y: 0 });

  const handleMovement = (e: PointerEvent | TouchEvent | MouseEvent) => {
    let clientX: number = 0;
    let clientY: number = 0;

    if (e instanceof PointerEvent || e instanceof MouseEvent) {
      if (e.type === "click") {
        steps += 250;
      }

      steps += Math.abs(e.movementX) + Math.abs(e.movementY);

      clientX = e.pageX;
      clientY = e.pageY;
    } else {
      const touch = e.touches[0];

      const deltaX = touch.clientX - lastPosition.current.x;
      const deltaY = touch.clientY - lastPosition.current.y;

      steps += Math.abs(deltaX) + Math.abs(deltaY);

      lastPosition.current = { x: touch.clientX, y: touch.clientY };

      clientX = touch.pageX;
      clientY = touch.pageY;
    }

    if (steps >= currentIndex * 250) {
      moveImage(clientX, clientY);
    }

    if (currentIndex == refs.current.length) {
      currentIndex = 0;

      steps = -250;
    }
  };

  const moveImage = (x: number, y: number) => {
    const currentImage = refs.current[currentIndex].current;

    if (currentImage) {
      currentImage.style.transitionTimingFunction =
        "cubic-bezier(0.22, 1, 0.36, 1)";
      currentImage.style.transitionDuration = "500ms";
      currentImage.style.transform = `translate(-50%, -50%) rotate(${
        (Math.random() * 2 - 1) * 20
      }deg)`;
      currentImage.style.opacity = "1";
      currentImage.style.left = x + "px";
      currentImage.style.top = y + "px";

      currentIndex++;
      nbOfImages++;

      setZIndex();

      setTimeout(() => {
        removeImage();
      }, 500);
    }
  };

  const getCurrentImages = () => {
    const images = [];
    const indexOfFirst = currentIndex - nbOfImages;

    for (let i = indexOfFirst; i < currentIndex; i++) {
      let targetIndex = i;
      if (targetIndex < 0) {
        targetIndex += refs.current.length;
      }
      images.push(refs.current[targetIndex].current);
    }

    return images;
  };

  const removeImage = () => {
    const images = getCurrentImages();

    if (images[0]) {
      images[0].style.transitionTimingFunction =
        "cubic-bezier(0.83, 0, 0.17, 1)";
      images[0].style.transitionDuration = "1000ms";
      images[0].style.transform = "translate(-50%, 100vh) rotate(0deg)";
      images[0].style.opacity = "0";
    }

    nbOfImages--;
  };

  const setZIndex = () => {
    const images = getCurrentImages();

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image !== null) {
        image.style.zIndex = `${i}`;
      }
    }
  };

  useEffect(() => {
    const currentContainerRef = containerRef.current;

    if (currentContainerRef) {
      currentContainerRef.addEventListener("pointermove", handleMovement);
      currentContainerRef.addEventListener("click", handleMovement);
    }

    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("pointermove", handleMovement);
        currentContainerRef.removeEventListener("click", handleMovement);
      }
    };
  });

  return (
    <section ref={containerRef} className="absolute left-0 top-0 h-full w-full">
      <article className="relative h-full w-full overflow-hidden">
        {refs.current.map((ref, index) => (
          <Image
            key={index}
            ref={ref}
            src={`/images/dummy${index % 4}.jpg`}
            alt={`Image ${index}`}
            width={500}
            height={500}
            priority
            className="transition-[transform, opacity] absolute left-1/2 w-[20vw] min-w-[200px] -translate-x-1/2 translate-y-[100vh] rounded-lg opacity-0"
          />
        ))}
      </article>
    </section>
  );
};

export default CursorGallery;

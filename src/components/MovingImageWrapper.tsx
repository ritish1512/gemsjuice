"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MovingImageWrapperProps {
  children: React.ReactNode;
}

export default function MovingImageWrapper({ children }: MovingImageWrapperProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const movingImage = imageRef.current;
    const container = containerRef.current;
    if (!movingImage || !container) return;

    const slot1 = container.querySelector('[data-img-step="1"]') as HTMLDivElement;
    const slot2 = container.querySelector('[data-img-step="2"]') as HTMLDivElement;
    const slot3 = container.querySelector('[data-img-step="3"]') as HTMLDivElement;
    const slot4 = container.querySelector('[data-img-step="4"]') as HTMLDivElement;

    if (!slot1 || !slot2 || !slot3 || !slot4) return;

    const getRelativeCoords = (element: HTMLElement) => {
      const containerRect = container.getBoundingClientRect();
      const elemRect = element.getBoundingClientRect();
      return {
        top: elemRect.top - containerRect.top,
        left: elemRect.left - containerRect.left,
        width: elemRect.width,
        height: elemRect.height,
        borderRadius: window.getComputedStyle(element).borderRadius
      };
    };

    const startCoords = getRelativeCoords(slot1);
    gsap.set(movingImage, {
      top: startCoords.top,
      left: startCoords.left,
      width: startCoords.width,
      height: startCoords.height,
      borderRadius: startCoords.borderRadius,
      opacity: 1
    });

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: "bottom bottom",
    scrub: 0.1,
    invalidateOnRefresh: true,
    snap:1/3,
  },
});


    tl.to(movingImage, {
      top: () => getRelativeCoords(slot2).top,
      left: () => getRelativeCoords(slot2).left,
      width: () => getRelativeCoords(slot2).width,
      height: () => getRelativeCoords(slot2).height,
      borderRadius: () => getRelativeCoords(slot2).borderRadius,
      ease: "none"
    }).to(movingImage, {
      top: () => getRelativeCoords(slot3).top,
      left: () => getRelativeCoords(slot3).left,
      width: () => getRelativeCoords(slot3).width,
      height: () => getRelativeCoords(slot3).height,
      borderRadius: () => getRelativeCoords(slot3).borderRadius,
      ease: "none"
    }).to(movingImage, {
      top: () => getRelativeCoords(slot4).top,
      left: () => getRelativeCoords(slot4).left,
      width: () => getRelativeCoords(slot4).width,
      height: () => getRelativeCoords(slot4).height,
      borderRadius: () => getRelativeCoords(slot4).borderRadius,
      ease: "none"
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full relative ">
      <div 
        ref={imageRef} 
        className="moving-image-container absolute pointer-events-none z-5 opacity-0 overflow-hidden shadow-2xl"
      >
        <Image
          src="/juice-main.avif" 
          alt="Bi-directional Moving Graphic"
          width={800}
          height={800}
          priority 
          className="w-full h-full object-cover"
        />
      </div>
      {children}
    </div>
  );
}

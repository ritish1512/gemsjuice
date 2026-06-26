'use client';
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageWrapType {
  children: React.ReactNode;
}

export const ImageWrapper = ({ children }: ImageWrapType) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const container = containerRef.current;
    const moveimg = imgRef.current;

    if (!container || !moveimg) return;

    // 1. Fetch step placeholders safely from DOM context
    const step1 = container.querySelector('[img-step="1"]') as HTMLDivElement;
    const step2 = container.querySelector('[img-step="2"]') as HTMLDivElement;
    const step3 = container.querySelector('[img-step="3"]') as HTMLDivElement;
    const img1 = container.querySelector('.img1') as HTMLElement;
    const img2 = container.querySelector('.img2') as HTMLElement;
    const img3 = container.querySelector('.img3') as HTMLElement;


    if (!step1 || !step2 || !step3) return;

    // 2. Helper to calculate coordinates relative to the main outer container
    const getCoordinates = (element: HTMLElement) => {
      const containerPos = container.getBoundingClientRect();
      const elementPos = element.getBoundingClientRect();
      return {
        top: elementPos.top - containerPos.top,
        left: elementPos.left - containerPos.left,
        width: elementPos.width,
        height: elementPos.height
      };
    };

    // Calculate structural metrics for positions
    const pos1 = getCoordinates(step1);
    const pos2 = getCoordinates(step2);
    const pos3 = getCoordinates(step3);

    // Set initialization layout properties for starting block
    gsap.set(moveimg, {
      top: pos1.top,
      left: pos1.left,
      width: pos1.width,
      height: pos1.height,
      opacity: 1
    });
    gsap.set(img1, { opacity: 1 }); // Force Samoosa to 100% visible
    gsap.set(img2, { opacity: 0 });
    gsap.set(img3, { opacity: 0 });

   let currentImageZone1 = 1; // Tracks the flip-flop state for Section 1
        let currentImageZone3 = 2; // Tracks the flip-flop state for Section 3

        const intervalId = setInterval(() => {
        const currentScroll = window.scrollY;
        const sectionHeight = window.innerHeight;

        // ─── ZONE 1: User is sitting on Section 1 ───
        if (currentScroll < sectionHeight * 0.2) {
            if (currentImageZone1 === 1) {
            gsap.to(img1, { opacity: 0, duration: 0.5 });
            gsap.to(img2, { opacity: 1, duration: 0.5 });
            currentImageZone1 = 2;
            } else {
            gsap.to(img1, { opacity: 1, duration: 0.5 });
            gsap.to(img2, { opacity: 0, duration: 0.5 });
            currentImageZone1 = 1;
            }
            // Force img3 to stay completely invisible while in zone 1
            gsap.set(img3, { opacity: 0 });
        }

        // ─── ZONE 3: User is sitting on Section 3 ───
        // (We check if scroll position has passed Section 2, which sits at 1.5x section height)
        else if (currentScroll > sectionHeight * 1.7) {
            if (currentImageZone3 === 2) {
            gsap.to(img2, { opacity: 0, duration: 0.5 });
            gsap.to(img3, { opacity: 1, duration: 0.5 });
            currentImageZone3 = 3;
            } else {
            gsap.to(img2, { opacity: 1, duration: 0.5 });
            gsap.to(img3, { opacity: 0, duration: 0.5 });
            currentImageZone3 = 2;
            }
            // Force img1 to stay completely invisible while in zone 3
            gsap.set(img1, { opacity: 0 });
        }

        }, 3000);

    // 3. Build scroll-driven sequential timelines
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,      
        snap:1/2,       // Smoother catch-up tracking
        invalidateOnRefresh: true, // Recalculates on screen resizing
      },
    });

    // Move smoothly to step 2 as page scrolls
    tl.to(moveimg, {
      top: pos2.top,
      left: pos2.left,
      width: pos2.width,
      height: pos2.height,
      rotateZ:10,
      ease: "none"
    },"step2").to(img1, { opacity: 1, duration: 0.1 }, "step2")
.to(img2, { opacity: 0, duration: 0.1 }, "step2")

    // Move smoothly to step 3 as page continues scrolling
    .to(moveimg, {
      top: pos3.top,
      left: pos3.left,
      width: pos3.width,
      height: pos3.height,
      rotateZ:0,
      ease: "none"
    }).to(img1, { opacity: 0, duration: 0.1 }, "step3")
.to(img2, { opacity: 1, duration: 0.1 }, "step3").to(img3, { opacity: 0, duration: 0.1 }, "step3");
;
return () => clearInterval(intervalId);

  }, { scope: containerRef }); // Context scoping helps cleanups

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Moving wrapper layout engine fixed to absolute styling */}
      <div 
        ref={imgRef} 
        className="absolute pointer-events-none z-1 transition-transform opacity-0"
        style={{ opacity: 0 }} // Hidden until initialization positioning runs
      >
        <Image 
          src="/samoosa.png" 
          alt="Moving image" 
          width={500} 
          height={500} 
          className="img1 w-full h-full object-contain absolute" // Reuses your page spin keyframe style!
          priority
        />

        <Image 
          src="/juices.png" 
          alt="Moving image" 
          width={500} 
          height={500} 
          className="img2 w-full h-full object-contain absolute" // Reuses your page spin keyframe style!
          
        />

        <Image 
          src="/tea.png" 
          alt="Moving image" 
          width={500} 
          height={500} 
          className="img3 w-full h-full object-contain absolute" // Reuses your page spin keyframe style!
          
        />
      </div>
      {children}
    </div>
  );
};

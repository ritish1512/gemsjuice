'use client';

import { useEffect, useState } from "react";

export const NavContainer = ({ children }: { children: React.ReactNode }) => {
  const [isscrolled, setIsscrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setIsscrolled(true);
      } else {
        setIsscrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`fixed left-1/2 -translate-x-1/2 transition-all duration-500 ${
        isscrolled 
          ? "w-[calc(100%-2rem)] max-w-7xl rounded-full top-2 bg-transparent backdrop-blur-sm" 
          : "w-full rounded-none top-0 bg-background/95"
      } shadow-md shadow-gray-400  z-50`}
    >
      {children}
    </div>
  );
};

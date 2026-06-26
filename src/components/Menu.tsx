'use client';

import { useEffect, useState } from "react";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

export const Menu = () => {
  const [isopen, setIsopen] = useState(false);
  const [ismounted, setIsmounted] = useState(false);

  useEffect(() => {
    setIsmounted(true);
  }, []);

  if (!ismounted) {
    return null;
  }
  const Links = [
    {name:"Home",url:"/"},
    {name:"Products",url:"/products"},
    {name:"Gallery",url:"/gallery"},
  ]
  return (
    <>
      {/* Trigger Button with Animated Icons */}
      <button
        onClick={() => setIsopen(!isopen)}
        className="cursor-pointer text-gray-800 md:hidden p-1 flex items-center justify-center transition-all duration-300 transform"
        aria-label={isopen ? "Close menu" : "Open menu"}
      >
        <div className={`transition-transform duration-300 ${isopen ? 'rotate-90' : 'rotate-0'}`}>
          {isopen ? <IoClose size={27} /> : <BiMenu size={27} />}
        </div>
      </button>

      {/* Smooth Dropdown Mobile Menu Wrapper */}
      <div 
        className={`absolute top-15 rounded-xl left-0 right-0  bg-[#b3cc54] p-6 pt-5 flex flex-col gap-6 shadow-xl border-t border-gray-100 transition-all duration-300 ease-out origin-top ${
          isopen 
            ? "opacity-100 scale-y-100 " 
            : "opacity-0  scale-y-0 "
        }`}
      >
        {Links.map((link, index) => (
          <Link
            key={index}
            href={link.url}
            className={`text-gray-800 font-medium text-xl transition-all duration-500 delay-100 ${
              isopen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
            }`}
            onClick={() => setIsopen(false)}
          >
            {link.name}
          </Link>
        ))}
        {/* Add your mobile links here following the same structure! */}
      </div>
    </>
  );
};

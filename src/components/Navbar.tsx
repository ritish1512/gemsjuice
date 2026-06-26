"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "./Menu";
import { TiShoppingCart } from "react-icons/ti";
import { NavContainer } from "./NavContainer";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { toggleCart } = useCart();

  const Links = [
    {name:"Home",url:"/"},
    {name:"Products",url:"/products"},
    {name:"Gallery",url:"/gallery"},
  ]
  return (
    <NavContainer>
      <nav className="w-full px-4 md:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo Section */}
          <div className="flex gap-2 items-center ">
            <Image 
              src="/logo.ico" 
              alt="Gems Logo" 
              width={48} 
              height={48} 
              className="w-8 h-8 md:w-12 md:h-12 object-contain"
              priority
            />
            <Link href="/">
              <h1 className="font-bold text-2xl md:text-4xl font-alfa tracking-wider">
                <span className="text-[#4caf50]">G</span>
                <span className="text-[#8bc34a]">e</span>
                <span className="text-[#9c27b0]">m</span>
                <span className="text-[#ff5722]">s</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-6 text-xl font-roboto text-gray-700">
          {Links.map((link,idx)=>(
            <Link href={link.url} key={idx} className="hover:underline hover:text-gray-900 transition-colors duration-300">{link.name}</Link>
          ))}
          </div>

          {/* Cart & Mobile Menu Controls */}
          <div className="flex gap-3 items-center">
            <button
            type="button"
            onClick={toggleCart}
            aria-label="Open cart"
            className="p-1 hover:text-green-600 transition-colors"
          >
            <TiShoppingCart className="text-2xl md:text-4xl text-gray-800" />
          </button>
          <Menu />
          </div>
        </div>
      </nav>
    </NavContainer>
  );
}

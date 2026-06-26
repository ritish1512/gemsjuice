'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useCart, CartProduct } from '@/context/CartContext';

export default function ProductsClient({ products }: { products: CartProduct[] }) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const { addItem } = useCart();

  const setQuantity = (productId: string, delta: number) => {
    setQuantities((current) => {
      const next = Math.max(1, (current[productId] ?? 1) + delta);
      return { ...current, [productId]: next };
    });
  };

  const getQuantity = (productId: string) => quantities[productId] ?? 1;

  const handleAddToCart = (product: CartProduct) => {
    addItem(product, getQuantity(product.id));
  };

  const handleBuyNow = (product: CartProduct) => {
    const quantity = getQuantity(product.id);
    const message = `Hello Gems Juice,%0AI want to order:%0AProduct: ${product.name}%0AQuantity: ${quantity}%0A%0ACustomer Name:%0APhone:%0AAddress:%0A`;
    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/916383308836?text=${message}`, '_blank');
    }
  };

  const categories = useMemo(
    () => [
      { id: 'all', label: '🌟 All Items' },
      ...Array.from(new Set(products.map((product) => product.category))).map((category) => ({ id: category, label: category })),
    ],
    [products],
  );

  const filteredProducts = activeCategory === 'all' ? products : products.filter((item) => item.category === activeCategory);

  return (
    <section aria-labelledby="products-heading" className="min-h-screen bg-[#b6d14d] pt-24 pb-16 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute top-20 right-[-10%] w-96 h-96 bg-white/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-[-10%] w-96 h-96 bg-[#ff7a00]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 id="products-heading" className="text-5xl md:text-7xl font-black uppercase tracking-tight text-[#ff7a00] drop-shadow-[0_3px_0_rgba(0,0,0,0.1)] mb-4">Our Menu</h1>
          <p className="text-white font-extrabold text-lg md:text-xl tracking-wide max-w-xl mx-auto uppercase drop-shadow-sm">Grab a healthy drink or a crispy bite to fuel your day!</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-14">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-black text-sm md:text-base tracking-wider uppercase transition-all transform active:scale-95 shadow-md ${
                activeCategory === cat.id ? 'bg-[#1f4027] text-white scale-105 border-2 border-white' : 'bg-white text-[#1f4027] hover:bg-stone-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-[2.5rem] p-6 shadow-xl border-4 border-transparent hover:border-[#ff7a00] transition-all transform hover:-translate-y-2 flex flex-col justify-between max-w-90 w-full relative group">
              <span className={`absolute top-4 right-4 z-20 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full text-white bg-[#ff7a00]`}>{product.tag}</span>

              <div className={`relative w-full h-56 rounded-4xl overflow-hidden mb-6 bg-slate-50 flex items-center justify-center transition-colors duration-300`}>
                <div className="relative w-40 h-40 group-hover:scale-110 transition-transform duration-500 ease-out">
                  <Image src={product.src} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain" alt={product.name} priority={false} unoptimized/>
                </div>
              </div>

              <div className="flex flex-col grow justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-black text-stone-900 leading-tight tracking-tight uppercase">{product.name}</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between mt-2 gap-4">
                    <span className="text-3xl font-black text-[#1f4027]">₹{product.price}</span>
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
                      <button type="button" onClick={() => setQuantity(product.id, -1)} className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100" aria-label="Decrease quantity"><AiOutlineMinus size={18} /></button>
                      <span className="mx-3 min-w-8 text-center font-semibold text-slate-900">{getQuantity(product.id)}</span>
                      <button type="button" onClick={() => setQuantity(product.id, 1)} className="rounded-full p-2 text-slate-700 transition hover:bg-slate-100" aria-label="Increase quantity"><AiOutlinePlus size={18} /></button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <button type="button" onClick={() => handleAddToCart(product)} className="rounded-full bg-[#ff7a00] px-5 py-3 text-sm font-black uppercase tracking-wider text-white transition hover:bg-[#e06b00]">Add to Cart</button>
                    <button type="button" onClick={() => handleBuyNow(product)} className="rounded-full border border-[#ff7a00] bg-white px-5 py-3 text-sm font-black uppercase tracking-wider text-[#ff7a00] transition hover:bg-[#ff7a00]/10">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

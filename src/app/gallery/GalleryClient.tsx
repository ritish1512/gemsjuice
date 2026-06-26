'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { GalleryItem } from '@/app/gallery/page';

const sizeClasses = {
  small: 'md:col-span-1 md:row-span-1',
  medium: 'md:col-span-2 md:row-span-1',
  large: 'md:col-span-1 md:row-span-2',
};

export default function GalleryClient({ galleryItems }: { galleryItems: GalleryItem[] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filters = ['All', 'Fresh Juice', 'Snacks', 'Milkshakes', 'Combos'];

  const filteredItems = useMemo(
    () =>
      activeFilter === 'All'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter, galleryItems],
  );

  return (
    <section aria-labelledby="gallery-heading" className="min-h-screen bg-[#b6d14d] pt-28 pb-20 px-4 md:px-8 relative overflow-hidden select-none">
      <div className="absolute top-[-5%] left-[-5%] w-100 h-100 bg-[#ff7a00]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-125 h-125 bg-[#1f4027]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16 max-w-4xl mx-auto">
          <h2 id="gallery-heading" className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-[#ff7a00] drop-shadow-[0_4px_0_rgba(0,0,0,0.1)] mb-4">
            Vibe Gallery
          </h2>
          <h2 className="text-xl md:text-2xl font-extrabold text-[#1f4027] uppercase tracking-wide mb-4">
            Fresh Juices, Crispy Snacks, & Cold Beverages in Pannamgadu, Andhra Pradesh
          </h2>
          <p className="text-white text-sm md:text-base font-bold tracking-wide leading-relaxed drop-shadow-sm normal-case">
            Explore the visual menu of <strong className="text-[#1f4027]">Gems Juice & Coffee</strong>, conveniently located along the Kolkata-Chennai National Highway Road. From raw, ice-cold seasonal fruit juices and creamy signature milkshakes to hot, spicy samosas and crisp potato wedges, we craft premium road-trip refreshments daily from 6:00 AM to 9:00 PM. Browse our food layout gallery below!
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2.5 rounded-full font-black text-xs md:text-sm uppercase tracking-widest transition-all duration-300 transform active:scale-95 shadow-md ${
                activeFilter === filter
                  ? 'bg-[#1f4027] text-white border-2 border-white scale-105'
                  : 'bg-white/90 text-[#1f4027] hover:bg-[#ff7a00] hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-6 w-full">
          {filteredItems.map((item) => {
            const finalSizeClass = sizeClasses[item.gridSize as keyof typeof sizeClasses] ?? sizeClasses.small;

            return (
              <article
                key={item._id}
                onClick={() => setLightboxItem(item)}
                className={`relative rounded-[2.5rem] overflow-hidden group shadow-xl border-4 border-white/50 bg-white/40 backdrop-blur-sm transition-all duration-500 ease-out hover:shadow-2xl hover:border-[#ff7a00] hover:-translate-y-2 cursor-pointer ${finalSizeClass}`}
              >
                <Image
                  src={item.imageUrl}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                  alt={item.altText}
                  unoptimized
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1f4027]/95 via-[#1f4027]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <span className="text-[#b6d14d] text-xs font-black uppercase tracking-widest mb-2 bg-[#1f4027] px-3 py-1 rounded-full w-fit">
                    {item.category}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-black uppercase tracking-tight leading-none drop-shadow-md">
                    {item.title}
                  </h3>
                  <p className="text-stone-200 text-xs md:text-sm font-semibold mt-1 opacity-90 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <section className="mt-16 text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 max-w-3xl mx-auto border border-white/20">
          <h3 className="text-lg font-black uppercase text-[#1f4027] tracking-wider mb-2">
            Hungry for a Refreshment Break?
          </h3>
          <p className="text-white text-xs md:text-sm font-semibold leading-relaxed mb-4">
            Gems Juice serves fresh fruit mocktails, local highway-style hot snacks, and iced beverages perfect for travelers driving through the Nellore-Tirupati corridor route. Stop by our store in Pannamgadu or browse our real-time stock listings.
          </p>
          <Link
            href="/products"
            className="inline-block bg-[#ff7a00] hover:bg-[#e06b00] text-white font-black text-xs uppercase tracking-widest px-6 py-3 rounded-full shadow-lg transition-transform active:scale-95"
          >
            Explore Full Menu & Prices ➔
          </Link>
        </section>
      </div>

      {lightboxItem && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setLightboxItem(null)}
        >
          <button
            type="button"
            className="absolute top-6 right-6 text-white bg-white/10 hover:bg-[#ff7a00] w-12 h-12 rounded-full flex items-center justify-center font-black text-xl transition-all"
            onClick={() => setLightboxItem(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>

          <div className="relative max-w-4xl w-full h-[70vh] md:h-[80vh] flex flex-col justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20">
              <Image
                src={lightboxItem.imageUrl}
                fill
                sizes="100vw"
                className="object-contain p-2"
                alt={lightboxItem.altText}
                unoptimized
              />
            </div>
            <div className="mt-4 text-center text-white px-4">
              <span className="text-[#b6d14d] text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/10">
                {lightboxItem.category}
              </span>
              <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight mt-1 text-[#ff7a00]">
                {lightboxItem.title}
              </h2>
              <p className="text-stone-400 text-sm font-medium mt-1">
                {lightboxItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { HiOutlineMapPin } from "react-icons/hi2";

const businessHours = { open: 6 * 60, close: 21 * 60 };
const googleMapsUrl = "https://www.google.com/maps/place/Gems+juice+%26+coffee/@13.5113941,80.0912254,16z/data=!4m16!1m9!3m8!1s0x3a4d7929da58f32d:0xd3336bab2c4616da!2sGems+juice+%26+coffee!8m2!3d13.5114205!4d80.0936459!9m1!1b1!16s%2Fg%2F11gy29m655!3m5!1s0x3a4d7929da58f32d:0xd3336bab2c4616da!8m2!3d13.5114205!4d80.0936459!16s%2Fg%2F11gy29m655?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D";

function getStatus() {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = minutes >= businessHours.open && minutes < businessHours.close;

  return {
    isOpen,
    label: isOpen ? "Open Now — Pull over for a fresh break!" : "Closed — See you at 6:00 AM",
    dotClass: isOpen ? "bg-emerald-500 animate-pulse" : "bg-rose-500",
  };
}

export function LiveLocationAndStatus() {
  const [status, setStatus] = useState(() => getStatus());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStatus(getStatus());
    }, 60000);

    return () => window.clearInterval(timer);
  }, []);

  const address = useMemo(
    () => "Kolkata ~ Chennai, National Highway Road, Pannamgadu, Andhra Pradesh 524401",
    [],
  );

  return (
    /* Applied #e0ff69 as the main section background */
    <section className="w-full bg-[#e0ff69] px-6 py-16 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 rounded-4xl border border-black/10 bg-white/40 p-8 backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:p-10">
        
        {/* Left Content Column */}
        <div className="max-w-2xl">
          {/* Badge: White base creates strong separation against the lime overlay */}
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-[#0b2111] px-3 py-1 text-sm font-bold text-white">
            <HiOutlineMapPin className="h-4 w-4 text-emerald-200 font-black" />
            Highway stop • Pannamgadu
          </div>
          
          {/* Headline: Deep contrast charcoal/green text */}
          <h2 className="mt-5 text-xl md:text-3xl font-black tracking-tight text-[#0b2111] sm:text-4xl">
            Find us right on the Kolkata–Chennai corridor.
          </h2>
          
          {/* Address text explicitly darkened for readable contrast ratio */}
          <p className="mt-4 text-base font-semibold md:leading-7 text-[#1b3b24] sm:text-lg">
            {address}
          </p>
          
          <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-emerald-300 px-4 py-1.5 border border-black/5">
            <span className={`inline-flex h-3 w-3 rounded-full ${status.dotClass}`} />
            <span className="text-xs md:text-sm font-bold  text-[#0b2111] ">{status.label}</span>
          </div>
        </div>

        {/* Right Route Card: Dark container gives maximum pop on a neon lime background */}
        <div className="w-full max-w-md rounded-3xl bg-[#0b2111] p-6 shadow-xl shadow-black/10 text-white">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-[#e0ff69]">
            Quick route
          </p>
          
          {/* Main action button matches the lime accent precisely for maximum visibility */}
          <Link
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#e0ff69] px-5 py-3.5 text-sm font-black text-[#0b2111] transition hover:scale-[1.02] active:scale-[0.98]"
          >
            <span
              className="text-xs whitespace-nowrap md:text-xl">Route Me to Gems Juice</span>
            <span className="text-xs font-normal opacity-80 hidden md:block">(Open in Maps)</span>
          </Link>
          
          <p className="mt-4 text-sm font-medium leading-6 text-slate-300">
            Pull over for hot chai, fresh snacks, and chilled juices without losing your route.
          </p>
        </div>
        
      </div>
    </section>
  );
}

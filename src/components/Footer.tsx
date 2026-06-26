import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#1f4027] text-[#ffffff] py-12 px-6 md:px-12 border-t-8 border-[#ff7a00]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-6 justify-between items-start">
        
        {/* Left Side: Brand Identity & Hours */}
        <div className="w-full md:w-[45%] flex flex-col gap-6">
          <div>
            {/* Playful Colorful Brand Typography matching your navbar */}
            <div className="font-black text-4xl md:text-5xl tracking-wider uppercase mb-1 drop-shadow-sm">
              <span className="text-[#4caf50]">G</span>
              <span className="text-[#8bc34a]">e</span>
              <span className="text-[#9c27b0]">m</span>
              <span className="text-[#ff5722]">s</span>
            </div>
            <p className="text-sm font-bold tracking-widest text-[#d7f25d] uppercase">
              Fresh juice and snacks
            </p>
          </div>

          {/* Operational Hours Display Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10 max-w-sm">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#d7f25d] block mb-1">
              Timing Status
            </span>
            <p className="text-base font-semibold">
              Opens Every 06:00 a.m. to 09:00 p.m.
            </p>
          </div>

          {/* Address Content */}
          <div className="flex flex-col gap-1 max-w-md">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#d7f25d]">
              Our Location
            </span>
            <p className="text-sm text-stone-200 leading-relaxed font-medium">
              Kolkatha ~ Chennai, National Highway Road, Pannamgadu, Andhra Pradesh 524401
            </p>
          </div>
        </div>

        {/* Right Side: Embedded Google Map Window */}
        <div className="w-full md:w-[50%] flex justify-end">
          <div className="relative w-full max-w-[500px] h-[280px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group bg-stone-800">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3879.393592960927!2d80.0936459!3d13.5114205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d7929da58f32d%3A0xd3336bab2c4616da!2sGems%20juice%20%26%20coffee!5e0!3m2!1sen!2sin!4v1782389112476!5m2!1sen!2sin" width="600" height="450"  allowFullScreen loading="lazy"></iframe>
          </div>
        </div>

      </div>

      {/* Micro Copyright Bottom Ribbon */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 text-center text-xs font-semibold text-stone-400 tracking-wider">
        &copy; {new Date().getFullYear()} GEMS Juice & Coffee. All Rights Reserved.
      </div>
    </footer>
  );
}

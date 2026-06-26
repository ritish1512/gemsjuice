import { ImageWrapper } from '@/components/ImageWrap'; 
import Image from 'next/image';
import Link from 'next/link'; 

export const metadata = {
  title: 'Gems Juice & Coffee — Pannamgadu',
  description:
    'Gems Juice & Coffee on the Kolkata-Chennai National Highway in Pannamgadu. Fresh fruit juices, highway snacks near Nellore/Tirupati corridor. Open 06:00 AM - 09:00 PM.',
  openGraph: {
    title: 'Gems Juice & Coffee — Pannamgadu',
    description:
      'Fresh fruit juices and highway snacks on the Kolkata-Chennai National Highway. Open 06:00 AM - 09:00 PM.',
    images: ['/og-image.png'],
  },
};

export default function Home() { 
  const animationStyles = ` 
    @keyframes swing { 0%, 100% { transform: rotate(-10deg); } 50% { transform: rotate(10deg); } } 
    @keyframes floatY { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } } 
    @keyframes spinSlow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } } 
    @keyframes liquidGlow { 
      0%, 100% { border-radius: 60% 40% 60% 40% / 40% 60% 40% 60%; box-shadow: 0 0 15px rgba(var(--contrast-rgb, 239, 68, 68), 0.5); } 
      50% { border-radius: 40% 60% 40% 60% / 60% 40% 60% 40%; box-shadow: 0 0 30px rgba(var(--contrast-rgb, 239, 68, 68), 0.8); } 
    } 
    @keyframes popup { 0% { transform: translateY(-100px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } } 
    .img-swing { animation: swing 3s ease-in-out infinite; transform-origin: top center; } 
    .img-float { animation: floatY 4s ease-in-out infinite; } 
    .img-spin { animation: spinSlow 8s linear infinite; } 
    .head-pop{ animation: popup ease-in 1s} 
    .btn-liquid-glow { animation: liquidGlow 4s ease-in-out infinite; transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); } 
  `; 

  return ( 
    <> 
      <style dangerouslySetInnerHTML={{ __html: animationStyles }} /> 
      <ImageWrapper> 
        
        {/* Section 1 */}
        <section className="relative h-screen overflow-hidden flex flex-col justify-between md:justify-start items-center p-6 md:p-0"> 
          <div className="w-full"> 
            <h1 className="head-pop font-alfa text-dominant text-center mt-[45%] md:mt-[6%] text-4xl sm:text-5xl md:text-9xl whitespace-nowrap z-0"> 
              Have a break</h1> 
          </div> 
          
          {/* Decorative Images (Hidden on mobile) */} 
          <img src="/Kerala-Tea.png" className="img-swing hidden md:block w-30 h-auto aspect-square absolute top-[25%] left-[4%]" alt="Samoosa" /> 
          <img src="/singlesamosa.png" className="img-spin hidden md:block w-50 h-auto aspect-square absolute bottom-[15%] left-[14%]" alt="Samoosa" /> 
          <img src="/juice.png" className="img-float hidden md:block w-50 h-auto aspect-square absolute top-[35%] right-[10%]" alt="Samoosa" /> 
          
          <div img-step="1" className="w-[min(99%,550px)] h-auto aspect-square absolute top-[30%] md:top-[14%] md:left-[50%] md:translate-x-[-50%]" /> 
          
          {/* Animated Button Container */} 
          <div className="absolute btn-liquid-glow bg-contrast shadow-sm drop-shadow-contrast w-fit p-4 md:p-6 mb-[10%] md:mb-0 md:absolute top-[70%] md:left-[50%] md:translate-x-[-50%] z-10"> 
            <Link href="/products" className="text-secondary hover:text-gray-200 font-bold tracking-tighter text-xl md:text-3xl whitespace-nowrap block" > 
              Order Something 
            </Link> 
          </div> 
        </section> 

        {/* Section 2 (Snacks) */} 
        <section className='relative h-screen w-full bg-[#b6d14d] overflow-hidden'> 
          <div className='p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col justify-between md:block'> 
            
            {/* Header Area */}
            <div>
              <div className='pt-2 text-4xl md:text-6xl font-alfa tracking-tight mt-15'>Snacks</div> 
              <p className='text-gray-700 text-xs md:text-md font-semibold ml-1 md:ml-4'>Give some reward to your body for being good</p> 
            </div>
            
            {/* Mobile Viewport Container Constraint */}
            <div className="grid grid-rows-3 md:contents items-center h-[75vh] md:h-auto gap-2">
              
              {/* Image Row */}
              <div className="row-span-1 flex justify-center items-center h-full">
                <div img-step="2" className="max-w-67 md:max-w-xl w-full h-auto aspect-square absolute top-[10%] md:top-[10%] md:left-[10%]" /> 
              </div>
              
              {/* Content Description Row */}
              <div className='row-span-1 absolute top-[60%] md:top-[25%] right-[50%] translate-x-[50%] md:translate-x-0 md:right-[14%] md:p-4 max-w-md flex flex-col gap-1 md:gap-4 w-full text-center md:text-left justify-center'> 
                <div className='bg-gray-50/40 rounded-full flex gap-2 items-center justify-center w-max px-2 py-0.5 mx-auto md:mx-0'>
                  <span className='bg-green-500 w-2 h-2 md:w-3 md:h-3 rounded-full'></span>
                  <p className='text-gray-700 text-xs md:text-md font-semibold font-mono'>snack it</p>
                </div> 
                <div className='text-slate-900 font-black tracking-tight text-xl md:text-5xl'>Tasty Stuffs</div> 
                <p className='text-gray-900 text-xs md:text-md font-semibold px-4 md:px-0 line-clamp-3 md:line-clamp-none'>
                  Let your tongue live its own life without considering you for just a small period.
                </p> 
              </div> 
              
              {/* Button Row */}
              <div className='row-span-1 absolute top-[77%] right-[50%] translate-x-[50%] md:translate-x-0  md:top-[55%] md:right-[12%] w-full md:w-sm space-y-1 md:space-y-2 flex flex-col items-center md:items-start justify-center'> 
                <div className='rounded-tr-[40%] rounded-bl-[40%] p-4 md:p-6 bg-contrast w-fit shadow-sm shadow-amber-300 border-green-500'> 
                  <Link href="/snacks" className='font-black tracking-light text-secondary text-lg md:text-2xl'>Order Snack</Link> 
                </div> 
                <div className='font-semibold text-xs md:text-md text-gray-700'>Don't simply see it, order it</div> 
              </div> 
            </div>

          </div> 
        </section> 

        {/* Section 4 (Drinks) */} 
        <section className='relative h-screen w-full overflow-hidden'> 
          <div className='p-6 md:p-10 max-w-7xl mx-auto h-full flex flex-col justify-between md:block'> 
            
            {/* Header Area */}
            <div>
              <div className='pt-2 text-4xl md:text-6xl font-alfa tracking-tight mt-15'>Drinks</div> 
              <p className='text-gray-700 text-xs md:text-md font-semibold ml-1 md:ml-4'>May your body need it</p> 
            </div>
            
            {/* Mobile Viewport Container Constraint */}
            <div className="grid grid-rows-4 md:contents items-center h-[75vh] md:h-auto gap-2">
              
              {/* Image Row */}
                <div img-step="3" className="w-[min(99%,550px)] h-auto aspect-square absolute top-[20%] md:top-[10%] left-[50%] translate-x-[-50%]"/> 
              
              {/* Juices Block Row */}
              <div className=' hidden md:flex row-span-1 p-4 max-w-sm flex-col gap-4 bg-transparent backdrop-blur-md border border-gray-600 rounded-xl z-2 order-2 md:absolute md:top-[57%] md:left-[10%] w-full text-center md:text-left justify-center'> 
                <div className='text-slate-900 font-black tracking-tight text-xl md:text-5xl'>Juices</div> 
                <p className='text-gray-900 text-lg font-semibold  line-clamp-none'>Healthy drinks with healthy fruits, made with proper care.</p> 
              </div> 
              
              {/* Milk Products Block Row */}
              <div className='row-span-1 p-3 md:p-4 max-w-sm hidden md:flex flex-col gap-1 md:gap-4 bg-transparent backdrop-blur-md border border-gray-600 rounded-xl order-3 md:absolute md:top-[20%] md:right-[12%] w-full text-center md:text-left justify-center'> 
                <div className='text-slate-900 font-black tracking-tight text-xl md:text-5xl'>Milk Products</div> 
                <p className='text-gray-900 text-lg font-semibold  line-clamp-none'>Tasty dairy with pure milk products. Your brain needs it.</p> 
              </div> 
              
              {/* Button Row */}
              <div className='row-span-1 w-[90%] md:w-sm space-y-1 md:space-y-2 z-2 order-4 absolute top-[60%] right-[50%] translate-x-[50%] md:translate-x-0 md:right-[12%] flex flex-col items-center md:items-start justify-center'> 
                <div className='rounded-tr-[60%] rounded-tl-[40%] rounded-bl-[60%] rounded-br-[40%] p-4 md:p-6 bg-contrast w-fit shadow-sm shadow-amber-300 border-green-500'> 
                  <Link href="/juice" className='font-black tracking-light text-secondary text-lg md:text-2xl'>Order Drinks</Link> 
                </div> 
                <div className='font-semibold text-xs md:text-md text-gray-700'>Don't simply see it, order it</div> 
                <p className='text-gray-900 text-md font-roboto text-center p-2 border rounded-lg'>Stretch your legs and refresh your soul: grab a real from Gems, ice-cold fresh juice to recharge for the road ahead!</p> 
              
              </div> 

            </div>
          </div> 
        </section> 

      </ImageWrapper> 
      <section className="relative w-full py-16 px-6 md:px-12 bg-[#d7f25d] text-[#1c1c1c] overflow-hidden flex flex-col items-center justify-center">
      <div className="relative max-w-6xl w-full text-center">
        {/* Header Section */}
        <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tight text-[#ff7a00] drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)] mb-4">
          Google Reviews
        </h2>
        
        {/* Call to Action Link */}
        <div className="mb-12">
          <Link 
            href="#" 
            className="inline-block bg-[#1f4027] hover:bg-[#152c1b] text-[#ffffff] font-bold text-lg px-8 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Review us
          </Link>
        </div>

        {/* Mobile Scrollable / Desktop Grid Container */}
        <div className="flex overflow-x-auto pb-6 gap-6 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 md:gap-10 justify-items-center items-stretch w-full max-w-full">
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-[#ff7a00] group transform hover:-translate-y-2 min-w-[85vw] sm:min-w-85 md:min-w-70 max-w-120 w-full snap-center shrink-0"
            >
              <div className="relative w-full h-50 rounded-2xl overflow-hidden bg-stone-100">
                <Image 
                  src={`/review${num}.png`} 
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 33vw, 500px"
                  className="object-cover object-top-left group-hover:scale-105 transition-transform duration-300" 
                  alt={`Google user review card ${num}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
    </> 
  ); 
}
 
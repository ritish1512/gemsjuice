import { HiOutlineBuildingOffice2, HiOutlineClock, HiOutlineShieldCheck, HiOutlineTruck } from "react-icons/hi2";

const amenities = [
  {
    title: "Spacious Free Parking Lot",
    description: "Easy pull-in space for cars, buses, and long-haul travelers looking for a calm stop.",
    icon: HiOutlineBuildingOffice2,
  },
  {
    title: "Spotless, Wheelchair-Accessible Restrooms",
    description: "Clean, accessible facilities designed for comfort, safety, and a quick reset on the road.",
    icon: HiOutlineShieldCheck,
  },
  {
    title: "Air-Conditioned Seating Area",
    description: "A cool, comfortable place to sit down, recharge, and enjoy a fresh snack break.",
    icon: HiOutlineClock,
  },
  {
    title: "Fast Service / Drive-Thru Collection",
    description: "Hot snacks and chilled juices ready for quick pickup so your stop stays short and smooth.",
    icon: HiOutlineTruck,
  },
] as const;

export function TravelerAmenities() {
  return (
    <section className="w-full bg-[#b6d14d] px-6 py-16 md:px-10 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#1f4027]">
            Highway comfort made simple
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Pull over with confidence and leave refreshed.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-900 sm:text-lg font-semibold">
            Gems Juice & Coffee offers a clean, high-speed stop for drivers who want a quick break without compromising on quality.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {amenities.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-6 shadow-[0_18px_60px_-25px_rgba(31,64,39,0.35)] backdrop-blur"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1f4027] text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-700 font-semibold">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

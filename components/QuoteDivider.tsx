import Image from "next/image";
import Divider from "./Divider";
import SlideFromCenter from "@/animations/SlideFormCenter";

export default function QuoteDivider() {
  return (
    <section className="container-max py-12 relative overflow-hidden">
      {/* bg-image */}
      <div className="absolute inset-0">
        <Image
          src="/moon.png"
          fill
          alt="moon"
          className="object-contain opacity-20 pointer-events-none rotate-[130deg]"
        />
      </div>

      <div className="flex flex-col items-center">
        <Divider />
        <div className="flex flex-col items-center justify-between w-full py-10 font-semibold text-white text-center">
          <SlideFromCenter direction="left">
            <h2 className="w-full text-2xl sm:text-3xl md:text-5xl lg:text-7xl">
              LESS DOUBT
            </h2>
          </SlideFromCenter>
          <SlideFromCenter direction="right" distance={45}>
            <h2 className="w-full text-2xl sm:text-3xl md:text-5xl lg:text-7xl">
              MORE OUTPUT
            </h2>
          </SlideFromCenter>
        </div>
        <Divider />
      </div>
    </section>
  );
}

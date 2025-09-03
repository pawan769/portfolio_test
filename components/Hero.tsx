import FadeInFromBottom from "@/animations/FadeInFromBottom";
import HeadlineReveal from "@/animations/HeadlineReveal";
import Image from "next/image";
import PrimaryButton from "./PrimaryButton";

const Hero = () => {
  return (
    <section className="container-max relative flex items-center justify-center  min-h-screen text-white">

      {/* moon-image */}
      <div className="absolute right-0 top-24 size-2/3">
        <Image
          src="/moon.png"
          fill
          alt="moon"
          className="object-contain opacity-70 pointer-events-none"
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-5">
        <HeadlineReveal
          text="FROM DARKNESS TO THE DAWN, IDEAS TAKE FLIGHT."
          className="text-4xl md:text-5xl font-extrabold"
        />
        <FadeInFromBottom>
          <p className="mt-6 text-lg text-gray-300">
            Hi, I am <span className="font-bold">PAWAN BHANDARI</span>. Welcome
            to my portfolio.
          </p>
        </FadeInFromBottom>

        <FadeInFromBottom delay={1.5}>
          <PrimaryButton className="mt-7">Download resume</PrimaryButton>
        </FadeInFromBottom>
      </div>
    </section>
  );
};

export default Hero;

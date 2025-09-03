"use client";
import FadeInFromBottom from "@/animations/FadeInFromBottom";
import useBoolean from "@/hooks/use-boolean";

export default function AboutSection() {
  const [isExpanded, setIsExpanded] = useBoolean(false); //to expand the introduction paragraph

  const toggleExpanded = () => {
    setIsExpanded();
  };

  return (
    <section className="container-max  text-white py-20 md:px-24">
      <div className="max-w-4xl px-20">
        <FadeInFromBottom delay={0.5}>
          <h1 className="text-4xl md:text-5xl font-semibold leading-15 ">
            NAMASTE <span className="inline-block">🙏</span>
            <br />
            I'M PAWAN BHANDARI
          </h1>
        </FadeInFromBottom>

        <div
          className={`transition-all duration-100 ease-in overflow-hidden ${
            isExpanded ? "max-h-screen" : "max-h-20"
          }`}
        >
          <FadeInFromBottom delay={1}>
            <p className="text-sm text-gray-300 mt-4">
              I’m a passionate Full Stack Web Developer with a strong foundation
              in JavaScript, TypeScript, and modern web frameworks.
              <br /> I specialize in building scalable, user-friendly
              applications with clean, maintainable code.
              <br /> My experience ranges from creating interactive,
              animation-rich UIs with Next.js, Tailwind, and GSAP, to developing
              secure and efficient backends using Supabase, Prisma, and
              PostgreSQL/MongoDB. <br /> Beyond technical skills, I enjoy
              solving complex problems, exploring new technologies, and focusing
              on performance, scalability, and user experience. I’m eager to
              bring creativity and technical expertise to projects that make an
              impact.
            </p>
          </FadeInFromBottom>
        </div>

        <div className="mt-10">
          <FadeInFromBottom delay={1.5}>
            <button
              onClick={toggleExpanded}
              className="inline-block text-white text-lg hover:underline transition duration-200"
            >
              {isExpanded ? "Show less" : "Let’s know more →"}
            </button>
          </FadeInFromBottom>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HeadlineRevealProps {
  text: string;
  className?: string;
}

export default function HeadlineReveal({
  text,
  className,
}: HeadlineRevealProps) {
  const el = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const words = el.current.querySelectorAll("span");//selecting all splitted words

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 40, color: "#777" },
        {
          opacity: 1,
          y: 0,
          color: "#fff",
          duration: 1,
          stagger: 0.15,//each word to have some delay
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 80%",
            toggleActions: "restart none restart reset",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  //split into words and animate each word after another
  return (
    <h1 ref={el} className={className}>
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block mr-2">
          {word}
        </span>
      ))}
    </h1>
  );
}

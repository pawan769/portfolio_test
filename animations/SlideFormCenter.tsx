"use client";
import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SlideFromCenterProps {
  children: ReactNode;
  direction?: "left" | "right";
  duration?: number;
  className?: string;
  distance?: number;
  delay?: number;
}

export default function SlideFromCenter({
  children,
  direction = "left",
  duration = 2,
  delay = 0,
  distance = 70,
  className,
}: SlideFromCenterProps) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { xPercent: 0 },
        {
          xPercent: direction === "left" ? -distance : distance,//custom distance from center
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 80%",//start animation when 80% of element enters viewport
            toggleActions: "play none none reset",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [direction, duration]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}

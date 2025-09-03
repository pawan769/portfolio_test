"use client";
import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SlideFromLeftProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  distance?: number; 
  className?: string;
}

export default function SlideFromLeft({
  children,
  duration = 1.2,
  delay = 0,
  distance = 150, 
  className,
}: SlideFromLeftProps) {
  const el = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        {
          opacity: 0,
          x: -distance, 
        },
        {
          opacity: 1,
          x: 0, 
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 85%", 
            toggleActions: "play none none reset",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [duration, delay, distance]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}

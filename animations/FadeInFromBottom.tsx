"use client";
import { ReactNode, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);// to animate according to scroll

interface FadeInFromBottomProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function FadeInFromBottom({
  children,
  delay = 1,
  className,
}: FadeInFromBottomProps) {
  const el = useRef<HTMLDivElement | null>(null);//reference of wrapped element

  useEffect(() => {
    if (!el.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          delay,//custom delay
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el.current,
            start: "top 80%",
            toggleActions: "restart none restart reset",// it restarts the animation when component enters from top and from bottom and resets animation when it leaves from bottom
          },
        }
      );
    }, el);

    return () => ctx.revert();//cleanup function
  }, [delay]);

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  );
}

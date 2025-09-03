import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import Link from "next/link";

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: string | boolean;
}

const PrimaryButton = ({ children, className, href, download }: PrimaryButtonProps) => {
  const commonClasses = cn(
    "p-4 bg-[#222222] rounded-r-full border border-gray-400 text-white hover:bg-white hover:text-black transition ",
    className
  );

  if (href) {
    return (
      <Link href={href} download={download} className={commonClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button className={commonClasses}>
      {children}
    </button>
  );
};

export default PrimaryButton;

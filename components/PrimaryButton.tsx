import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface PrimaryButtonProps {
  children: ReactNode;
  className?: string;
}

const PrimaryButton = ({ children, className }: PrimaryButtonProps) => {
  return (
    <button
      className={cn(
        "p-4 bg-[#222222] rounded-r-full border border-gray-400 text-white hover:bg-white hover:text-black transition ",
        className
      )}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useBoolean from "@/hooks/use-boolean";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useBoolean(false);
  const navItems = ["Home", "Work", "About", "Play"];
  const isMobile = useIsMobile();  //true if screen is less that 640 px

  return (
    <div className="container-max !px-4 sm:!px-20 w-full flex justify-center ">
      <div
        className={`flex items-center justify-between w-full ${
          isMobile
            ? ""
            : "bg-white rounded-full shadow-md border border-gray-300"
        } overflow-hidden`}
      >
        {/* for mobile show hamburger */}
        {isMobile ? (
          <div className="flex items-center justify-end w-full p-4 text-black">
            <button onClick={() => setIsOpen()}>
              {isOpen ? <X className="text-white"/> : <Menu className="text-white" />}
            </button>
          </div>
        ) : (
          <>
             {/* desktop navbar */}
            <div className="flex flex-1 justify-end space-x-10 mx-20">
              {navItems.map((item) => (
                <div
                  key={item}
                  className="relative cursor-pointer text-sm font-medium text-black"
                  onClick={() => setActive(item)}
                >
                  <a href={`#${item.toLowerCase()}`}>{item}</a>
                  {active === item ? (
                    <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-xs">
                      ▲
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
            <button className="bg-black text-white px-5 py-3 rounded-r-full font-medium hover:bg-gray-800 transition">
              Follow me
            </button>
          </>
        )}
      </div>

      {/* mobile navbar */}
      <div
        className={`absolute top-20 left-0 w-full bg-white shadow-md rounded-b-3xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          isMobile && isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <div className="flex flex-col items-center space-y-4 py-4">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-black"
              onClick={() => {
                setActive(item);
                setIsOpen();
              }}
            >
              {item}
            </a>
          ))}
          <button className="bg-black text-white px-5 py-3 rounded-full font-medium hover:bg-gray-800 transition">
            Follow me
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

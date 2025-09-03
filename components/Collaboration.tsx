import React from "react";
import PrimaryButton from "./PrimaryButton";

export default function Collaboration() {
  return (
    <div className="container-max  relative w-full bg-cover bg-center text-white  px-6 md:px-20 bg-[url('/bg-stars.jpg')]">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col  md:flex-row items-center md:items-start justify-between gap-10">
        {/* LeftSide */}
        <div className="my-auto py-5 md:w-1/2">
          <h2 className="text-5xl text-left pl-8  md:text-6xl font-semibold leading-tight">
            Want to <br />
            collaborate??
          </h2>
        </div>

        {/* RightSide */}
        <div className=" md:border-l border-gray-500 opacity-70 py-10 md:w-1/2 md:mt-0 ">
          <div className="border-y md:pl-4 border-gray-500 py-6 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Let’s Connect</h3>
            <p className="text-sm mt-1">
              Feel free to reach out for collaborations or just a friendly hello{" "}
            </p>
            <div className="text-4xl text-left w-full">👋</div>
            <PrimaryButton className="w-fit">Send an Email</PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
}

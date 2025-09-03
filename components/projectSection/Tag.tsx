import React from "react";

const Tag = ({ tag }: { tag: string }) => {
  return (
    <div className="px-3 py-1 rounded-full text-center text-md overflow-hidden w-fit max-w-40 min-w-20 bg-gradient-to-r from-[#222222] via-[#DFA7A5] to-[#AD7C6F]">
      {tag}
    </div>
  );
};

export default Tag;

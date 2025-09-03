export default function ProjectSectionLogo() {
  return (
    <div className="relative flex items-center justify-center w-64 h-32 bg-[#1e1e1e] overflow-hidden">
      {/*white background */}
      <div className="absolute right-0 top-3 w-32 h-16 bg-white rounded-tr-full"></div>

      {/* foreground text */}
      <div className="flex flex-col items-center justify-center text-xl font-bold mix-blend-difference text-white leading-tight">
        <span>THE SIMPLE</span>
        <span className="font-normal">EASY WORK</span>
      </div>
    </div>
  );
}

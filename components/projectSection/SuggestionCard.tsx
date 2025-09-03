import Link from "next/link";

const SuggestionCard = () => {
  return (
    <div className="bg-[#2a2a2a] rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition">
      <h3 className="text-lg font-semibold mb-3">
        Couldn’t find what you need?
      </h3>
      <p className="text-sm text-gray-300 mb-6">
        Suggest a tutorial, course or video. I read seek feedback/suggestion!
      </p>
      <Link
        href="#"
        className="px-6 py-2 rounded-full bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] text-sm font-medium shadow-md"
      >
        Request Now →
      </Link>
    </div>
  );
};

export default SuggestionCard;

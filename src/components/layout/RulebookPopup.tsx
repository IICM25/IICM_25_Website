"use client";
import { useEffect, useState } from "react";

export default function RulebookPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        className="
          relative bg-[#F3E1A0]
          text-[#2b2412]
          border border-[#b89b4a]
          rounded-2xl shadow-2xl
          w-[92%] sm:w-[460px] p-6 animate-fadeIn
        "
      >
        {/* Close */}
        <button
          onClick={() => setVisible(false)}
          className="absolute top-3 right-3
                     text-[#5c4b1f] hover:text-[#2b2412]
                     text-2xl"
          aria-label="Close rulebook popup"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-3 text-[#7a5c12]">
          Official Rulebook
        </h2>

        <p className="text-center text-[#3f361a] mb-6 leading-relaxed">
          Please read the guidelines carefully before participating in
          <br />
          <span className="font-semibold">
            Inter IIT Cultural Meet 8.0
          </span>
        </p>

        {/* Rulebook link */}
        <div className="flex flex-col gap-4">
          <a
            href="https://drive.google.com/file/d/1VUxhRSf0R2xDKwhzhKKDB2_uktCDeV6M/view?usp=drive_open"
            target="_blank"
            rel="noopener noreferrer"
            className="
              px-6 py-3 rounded-lg text-center font-medium
              bg-[#7a5c12] text-[#F3E1A0]
              hover:bg-[#5c450d]
              transition-all shadow-md
            "
          >
            🎭 Cultural Events Rulebook
          </a>
        </div>
      </div>
    </div>
  );
}

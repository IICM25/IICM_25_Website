"use client";

import { BookOpen } from "lucide-react";

export default function ChatbotButton() {
  return (
    <a
      href="https://drive.google.com/file/d/1VUxhRSf0R2xDKwhzhKKDB2_uktCDeV6M/view?usp=drive_open"
      target="_blank"
      rel="noopener noreferrer"
      className="
        fixed bottom-5 right-5 z-[9999]
        flex items-center gap-2
        bg-blue-600 text-white
        px-4 py-3 rounded-full
        shadow-lg
        hover:bg-blue-700
        transition
      "
    >
      <BookOpen size={20} />
      <span className="hidden sm:inline font-medium">
        Official Rulebook
      </span>
    </a>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose }) => {
  

  return (
    <>
      {/* Overlay (dim background) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[9999998]"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-[4.5rem]
          ${isOpen ? "right-0" : "-right-full"}
          w-[260px] p-6
          bg-black/90 backdrop-blur-lg
          flex flex-col items-center justify-center
          rounded-l-[30px]
          transition-all duration-300 z-[9999999]
        `}
      >
        <ul className="flex flex-col items-center list-none p-0">
          <li className="my-2">
            <Link href="/iitk" onClick={onClose} className="text-white text-[22px] hover:text-white">
              About IITK
            </Link>
          </li>

          <li className="my-2">
            <Link href="/gallery" onClick={onClose} className="text-white text-[22px] hover:text-white">
              Gallery
            </Link>
          </li>

          <li className="my-2">
            <Link href="/contact" onClick={onClose} className="text-white text-[22px] hover:text-white">
              Contact
            </Link>
          </li>

          <li className="my-2">
            <a
              href="https://drive.google.com/file/d/1VUxhRSf0R2xDKwhzhKKDB2_uktCDeV6M/view?usp=drive_open"
              target="_blank"
              rel="noreferrer"
              onClick={onClose}
              className="text-white text-[22px] hover:text-white"
            >
              RuleBook
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default MobileDrawer;

"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, easeOut, type Variants } from "framer-motion";

// === Icons (Moved Outside Component) ===
// Optimization: Defined once at the module level, not re-created on every render.
function TrophyIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A3.98 3.98 0 0 1 8 19.95V22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21A3.98 3.98 0 0 0 16 19.95V22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

const UsersIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// === Sponsor Data (Moved Outside Component) ===
// Optimization: This constant data doesn't need to be part of the component.
const sponsors = {
  title: [{ name: "Stellar Corp", sponsor: "Stellar", level: "Title Sponsor" }],
  gold: [
    { name: "Quantum Inc.", sponsor: "Stellar", level: "Gold Sponsor" },
    { name: "Nova Digital", sponsor: "Stellar", level: "Gold Sponsor" },
    { name: "Apex Solutions", sponsor: "Stellar", level: "Gold Sponsor" },
  ],
  silver: [
    { name: "Ecoverse", sponsor: "Stellar", level: "Silver Sponsor" },
    { name: "Momentum AI", sponsor: "Stellar", level: "Silver Sponsor" },
    { name: "Nexus Systems", sponsor: "Stellar", level: "Silver Sponsor" },
    { name: "Helios Energy", sponsor: "Stellar", level: "Silver Sponsor" },
  ],
  partners: [
    { name: "Orion Logistics", sponsor: "Stellar", level: "Partner" },
    { name: "ByteWave", sponsor: "Stellar", level: "Partner" },
    { name: "Zenith Media", sponsor: "Stellar", level: "Partner" },
  ],
};

// === Animation Variants (Moved Outside Component) ===
// Optimization: Also a constant, no need to re-create on render.
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
  },
};

interface SponsorCardProps {
  name: string;
  sponsor: string;
  // Optimization: Removed unused 'level' prop from the interface
}

// === SponsorCard (Working Full Blur on Hover) ===
const SponsorCard: React.FC<SponsorCardProps> = ({ name, sponsor }) => {
  return (
    <motion.div
      className={`relative aspect-square rounded-2xl overflow-hidden 
        bg-white/10 backdrop-blur-md
        border border-white/20 
        shadow-[0_8px_40px_rgba(255,255,255,0.1)]
        hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
        transition-shadow duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
        group will-change-transform will-change-filter`}
      whileHover={{
        scale: 1.04,
        transition: { type: "spring", stiffness: 120, damping: 14 },
      }}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Base static glass layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />

      {/* Blur overlay */}
      <div className="absolute inset-0 bg-transparent transition-all duration-700 ease-in-out group-hover:backdrop-blur-[40px] group-hover:brightness-75 pointer-events-none" />

      {/* Logo */}
      <div className="absolute inset-0 flex items-center justify-center p-10 transition-all duration-700 ease-in-out group-hover:opacity-0 pointer-events-none">
        <Image
          src={`/images/logos/${sponsor.toLowerCase()}.png`}
          alt={`${sponsor} logo`}
          fill
          className="object-contain"
        />
      </div>

      {/* Company Name */}
      <div className="absolute inset-0 flex items-center justify-center text-center transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none">
        <span className="text-white text-3xl font-bold tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] select-none">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

// === Main Component ===
const Partners = () => {
  const [activeTab, setActiveTab] = useState("sponsors");

  // All constants (icons, sponsors, variants) are now defined outside.
  // The component is cleaner and only contains state and JSX.

  return (
    <div className="font-sans overflow-x-hidden min-h-screen relative text-white">
      {/* === Background === */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/images/background_image/top.png"
          alt="Background"
          fill
          priority
          className="object-cover brightness-[0.65]"
        />
      </div>

      {/* === Hero === */}
      <section className="relative text-center pt-28 sm:pt-48 pb-16 sm:pb-28 px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="font-['Playfair_Display',serif] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDE6A3] drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
        >
          Our Partners
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl mt-5 max-w-2xl mx-auto text-gray-300"
        >
          The visionaries who make{" "}
          <span className="font-semibold text-[#FFD37F]">Kreiva Kllanz</span>{" "}
          possible.
        </motion.p>
      </section>

      {/* === Navbar === */}
      <div className="sticky top-0 py-3 sm:py-4 z-30 bg-black/30 backdrop-blur-md">
        <div className="flex justify-center">
          <div className="flex items-center rounded-full bg-white/10 shadow-md border border-white/20 p-1 sm:p-2">
            {["sponsors", "MNP"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "text-yellow-800 bg-white shadow-md"
                    : "text-gray-200 hover:text-yellow-400"
                }`}
              >
                {tab === "sponsors" ? (
                  <TrophyIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                ) : (
                  <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Content === */}
      <main className="px-4 sm:px-8 md:px-16 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === "sponsors" ? (
            <motion.div
              key="sponsors"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 10 }}
              variants={sectionVariants}
            >
              {/* Title Sponsor */}
              <motion.section
                className="py-12 sm:py-16 text-center"
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-[#FFB347]">
                  Title Sponsor
                </h2>
                <div className="max-w-xs sm:max-w-sm mx-auto">
                  {/* Optimization: Using spread props {...s} passes name and sponsor */}
                  <SponsorCard {...sponsors.title[0]} />
                </div>
              </motion.section>

              {/* Gold Sponsors */}
              <motion.section
                className="py-12 sm:py-16 text-center"
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-[#FFB347]">
                  Gold Sponsors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {/* Optimization: Use a unique string (s.name) for the key, not the index */}
                  {sponsors.gold.map((s) => (
                    <SponsorCard key={s.name} {...s} />
                  ))}
                </div>
              </motion.section>

              {/* Silver Sponsors */}
              <motion.section
                className="py-12 sm:py-16 text-center"
                variants={sectionVariants}
              >
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-[#FFB347]">
                  Silver Sponsors
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {sponsors.silver.map((s) => (
                    <SponsorCard key={s.name} {...s} />
                  ))}
                </div>
              </motion.section>
            </motion.div>
          ) : (
            <motion.section
              key="partners"
              className="py-12 sm:py-16 text-center"
              variants={sectionVariants}
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-teal-300">
                Our MNP
              </h2>
              <p className="text-gray-300 mb-12">Together we create magic</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {sponsors.partners.map((s) => (
                  <SponsorCard key={s.name} {...s} />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* === Footer === */}
      <footer className="mt-16 py-8 text-center text-white/70 bg-gradient-to-t from-black/60 to-transparent">
        © 2025 Kreiva Kllanz | All Rights Reserved
      </footer>
    </div>
  );
};

export default Partners;
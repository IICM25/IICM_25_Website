"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  easeOut,
  type Variants,
} from "framer-motion";

// --- SVG Icons ---
// Using inline SVGs for portability, as we can't import libraries.

const TrophyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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

const HeartIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const HomeIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const TicketIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
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
    <path d="M2 9a3 3 0 0 1 0 6v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

const StarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// --- Define Sponsor Card Props ---
interface SponsorCardProps {
  name: string;
  level: string;
  logoBg: string;
  levelColor: string;
  sponsor: string;
}

// --- Re-usable Sponsor Card Component ---
const SponsorCard: React.FC<SponsorCardProps> = ({
  name,
  level,
  logoBg,
  levelColor,
  sponsor,
}) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`h-32 flex items-center justify-center ${logoBg} transition-all duration-300 group-hover:opacity-90`}
      >
        <span className="text-xl font-bold text-white opacity-80">
          {sponsor}
        </span>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className={`text-sm font-medium ${levelColor}`}>{level}</p>
      </div>
    </motion.div>
  );
};

// --- Main Partners Component ---
const Partners = () => {
  const [activeTab, setActiveTab] = useState("sponsors");

  const sponsors = {
    title: [
      {
        name: "Stellar Corp",
        level: "Title Sponsor",
        logoBg: "bg-gradient-to-br from-blue-600 to-blue-800",
      },
    ],
    gold: [
      {
        name: "Quantum Inc.",
        level: "Gold Sponsor",
        logoBg: "bg-gradient-to-br from-amber-400 to-orange-500",
        levelColor: "text-amber-600",
      },
      {
        name: "Nova Digital",
        level: "Gold Sponsor",
        logoBg: "bg-gradient-to-br from-amber-400 to-orange-500",
        levelColor: "text-amber-600",
      },
      {
        name: "Apex Solutions",
        level: "Gold Sponsor",
        logoBg: "bg-gradient-to-br from-amber-400 to-orange-500",
        levelColor: "text-amber-600",
      },
    ],
    silver: [
      {
        name: "Ecoverse",
        level: "Silver Sponsor",
        logoBg: "bg-gradient-to-br from-gray-400 to-gray-600",
        levelColor: "text-gray-500",
      },
      {
        name: "Momentum AI",
        level: "Silver Sponsor",
        logoBg: "bg-gradient-to-br from-gray-400 to-gray-600",
        levelColor: "text-gray-500",
      },
      {
        name: "Nexus Systems",
        level: "Silver Sponsor",
        logoBg: "bg-gradient-to-br from-gray-400 to-gray-600",
        levelColor: "text-gray-500",
      },
      {
        name: "Helios Energy",
        level: "Silver Sponsor",
        logoBg: "bg-gradient-to-br from-gray-400 to-gray-600",
        levelColor: "text-gray-500",
      },
    ],
    partners: [
      {
        name: "Orion Logistics",
        level: "Partner",
        logoBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
        levelColor: "text-teal-600",
      },
      {
        name: "ByteWave",
        level: "Partner",
        logoBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
        levelColor: "text-teal-600",
      },
      {
        name: "Zenith Media",
        level: "Partner",
        logoBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
        levelColor: "text-teal-600",
      },
      {
        name: "Aura Foods",
        level: "Partner",
        logoBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
        levelColor: "text-teal-600",
      },
      {
        name: "Pivot Designs",
        level: "Partner",
        logoBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
        levelColor: "text-teal-600",
      },
      {
        name: "Stratus Cloud",
        level: "Partner",
        logoBg: "bg-gradient-to-br from-teal-400 to-cyan-600",
        levelColor: "text-teal-600",
      },
    ],
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easeOut,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="font-sans bg-[#fffcf6] text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 to-amber-400 text-white pt-32 pb-40 shadow-lg overflow-hidden">
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-orange-100 block drop-shadow-lg">
              Our Partners
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl mt-5 max-w-2xl mx-auto font-medium text-white/90"
          >
            Celebrating the incredible supporters who make Kreiva Kllanz possible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-center gap-4 md:gap-6 mt-12 flex-wrap"
          >
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 w-full z-0">
          <svg
            className="w-full h-auto"
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 100C0 100 360 0 720 0C1080 0 1440 100 1440 100V101H0V100Z"
              fill="#fffcf6"
            />
          </svg>
        </div>
      </section>

      {/* Tabs */}
      <div className="py-6 sticky top-0 z-20 bg-gradient-to-b from-[#fffcf6] via-[#fffcf6]/90 to-[#fffcf6]/70 backdrop-blur-lg">
        <div className="flex justify-center">
          <div className="relative flex items-center rounded-full bg-white/60 shadow-inner border border-white/50 p-1.5">
            {["sponsors", "MNP"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 flex items-center gap-2 rounded-full px-5 sm:px-8 py-2.5 text-sm sm:text-base font-medium transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-orange-800"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab === "sponsors" ? (
                  <TrophyIcon className="w-5 h-5" />
                ) : (
                  <UsersIcon className="w-5 h-5" />
                )}
                <span className="capitalize">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 z-[-1] rounded-full bg-white shadow-md"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="px-4 md:px-8">
        <AnimatePresence mode="wait">
          {activeTab === "sponsors" ? (
            <motion.div
              key="sponsors"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={sectionVariants}
            >
              {/* Title Sponsor */}
              <motion.section
                className="py-16 md:py-24 text-center"
                variants={sectionVariants}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
                  Title Sponsor
                </h2>
                <p className="text-gray-600 text-lg mb-12">
                  Our prestigious platinum partner
                </p>
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                  }}
                  className="max-w-md mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden border-t-8 border-amber-400"
                >
                  <div className="flex flex-col sm:flex-row items-center p-6 sm:p-8">
                    <div
                      className={`w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 flex items-center justify-center rounded-lg sm:rounded-xl mb-4 sm:mb-0 sm:mr-6 ${sponsors.title[0].logoBg}`}
                    >
                      <span className="text-2xl font-bold text-white">
                        {sponsors.title[0].name.split(" ")[0]}
                      </span>
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {sponsors.title[0].name}
                      </h3>
                      <div className="flex justify-start text-amber-400 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon key={i} className="w-6 h-6" />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.section>

              {/* Gold Sponsors */}
              <motion.section
                className="py-16 md:py-24 text-center bg-orange-50/50 rounded-3xl"
                variants={sectionVariants}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-orange-700">
                  Gold Sponsors
                </h2>
                <p className="text-gray-600 text-lg mb-12">
                  Our golden supporters who shine bright
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {sponsors.gold.map((s, i) => (
                    <SponsorCard
                      key={i}
                      sponsor={s.name.split(" ")[0]}
                      name={s.name}
                      level={s.level}
                      logoBg={s.logoBg}
                      levelColor={s.levelColor}
                    />
                  ))}
                </div>
              </motion.section>

              {/* Silver Sponsors */}
              <motion.section
                className="py-16 md:py-24 text-center"
                variants={sectionVariants}
              >
                <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-gray-700">
                  Silver Sponsors
                </h2>
                <p className="text-gray-600 text-lg mb-12">
                  Harmonizing support for our cultural celebration
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  {sponsors.silver.map((s, i) => (
                    <SponsorCard
                      key={i}
                      sponsor={s.name.split(" ")[0]}
                      name={s.name}
                      level={s.level}
                      logoBg={s.logoBg}
                      levelColor={s.levelColor}
                    />
                  ))}
                </div>
              </motion.section>
            </motion.div>
          ) : (
            /* Partners Section */
            <motion.section
              key="partners"
              className="py-16 md:py-24 text-center"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              variants={sectionVariants}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-3 text-teal-700">
                Our MNP
              </h2>
              <p className="text-gray-600 text-lg mb-12">
                Together we create magic
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {sponsors.partners.map((s, i) => (
                  <SponsorCard
                    key={i}
                    sponsor={s.name.split(" ")[0]}
                    name={s.name}
                    level={s.level}
                    logoBg={s.logoBg}
                    levelColor={s.levelColor}
                  />
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Join Section (CTA) */}
      <section className="relative bg-gradient-to-br from-orange-600 to-red-700 text-white py-24 md:py-32 text-center mt-20 overflow-hidden">
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
        <div className="relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-6"
          >
            Join Our Festival Family
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto mb-10 text-lg text-white/90"
          >
            Be part of something extraordinary. Partner with Kreiva Kllanz and
            help us celebrate art, culture, and community.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            className="flex items-center gap-2.5 mx-auto bg-white text-orange-800 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-orange-50 transition-all duration-300"
          >
            <TicketIcon className="w-6 h-6" />
            Sponsorship Opportunities
          </motion.button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1e1308] text-gray-400 py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div>
            <p className="font-semibold text-white/90">
              © 2025 Kreiva Kllanz • IIIT Vadodara
            </p>
            <p className="text-sm mt-1">
              Celebrating Art, Culture, and Technology.
            </p>
          </div>
          <div className="flex justify-center gap-6 mt-6 md:mt-0 text-base">
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Contact
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              Sponsor
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Partners;


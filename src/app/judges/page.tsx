"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, easeOut, type Variants } from "framer-motion";

// === Icons ===
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

// === Glassy Judge Card ===
// === Glassy Judge Card (Now Square) ===
interface JudgeCardProps {
  name: string;
  title: string;
  image: string;
}

const JudgeCard: React.FC<JudgeCardProps> = ({ name, title, image }) => (
  <motion.div
    className={`relative aspect-square rounded-2xl overflow-hidden
      bg-white/10 backdrop-blur-md
      border border-white/20 
      shadow-[0_8px_40px_rgba(255,255,255,0.1)]
      hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]
      transition-all duration-700 ease-out group will-change-transform`}
    whileHover={{
      scale: 1.04,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    }}
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Judge Image */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={image}
        alt={name}
        fill
        className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
      />
      {/* Frosted Blur Overlay */}
      <div className="absolute inset-0 bg-transparent transition-all duration-700 ease-in-out group-hover:backdrop-blur-3xl group-hover:brightness-75" />
    </div>

    {/* Judge Name + Title */}
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
      <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
        {name}
      </h3>
      <p className="text-gray-200 text-sm sm:text-base mt-2 font-medium">
        {title}
      </p>
    </div>
  </motion.div>
);
// === Page Component ===
const Judges = () => {
  const [activeTab] = useState("judges");

  const judges = [
    {
      name: "Dr. A. Verma",
      title: "Dean of Cultural Affairs",
      image: "/images/logos/judge1.jpg",
    },
    {
      name: "Ms. R. Iyer",
      title: "Renowned Choreographer",
      image: "/images/logos/judge1.jpg",
    },
    {
      name: "Mr. K. Sharma",
      title: "Film Director",
      image: "/images/logos/judge1.jpg",
    },
    {
      name: "Ms. T. Banerjee",
      title: "Classical Vocalist",
      image: "/images/logos/judge1.jpg",
    },
    {
      name: "Mr. P. Das",
      title: "Cultural Critic",
      image: "/images/logos/judge1.jpg",
    },
  ];

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
    },
  };

  return (
    <div className="font-sans overflow-x-hidden min-h-screen relative text-white">
      {/* === Background === */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/images/background_image/mid.png"
          alt="Background"
          fill
          priority
          className="object-cover brightness-[0.7]"
        />
      </div>

      {/* === Hero === */}
      <section className="relative text-center pt-32 sm:pt-48 pb-12 sm:pb-20 px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          className="font-['Playfair_Display',serif] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#EEDCA5] drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
        >
          Meet the Judges
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl mt-5 max-w-2xl mx-auto text-gray-300"
        >
          The masters who bring{" "}
          <span className="font-semibold text-[#FFD37F]">wisdom and artistry</span>{" "}
          to every performance.
        </motion.p>
      </section>

      {/* === Judges Grid === */}
      <main className="px-6 sm:px-10 md:px-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.section
            key="judges"
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
            variants={sectionVariants}
            className="py-12 sm:py-16 text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-[#FFB347]">
              Our Esteemed Panel
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {judges.map((judge, index) => (
                <JudgeCard key={index} {...judge} />
              ))}
            </div>
          </motion.section>
        </AnimatePresence>
      </main>

      {/* === Footer === */}
      <footer className="mt-16 py-8 text-center text-white/70 bg-gradient-to-t from-black/60 to-transparent">
        © 2025 Kreiva Kllanz | All Rights Reserved
      </footer>
    </div>
  );
};

export default Judges;
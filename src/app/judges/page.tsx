"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, easeOut, type Variants } from "framer-motion";
import { getSingleDoc } from "@/lib/firebaseFirestore";

/* =======================
   Types
======================= */
interface RawJudge {
  Id?: string;
  name?: string;
  title?: string;
  Cup?: string;
  image?: {
    ref?: string;
    url?: string;
  };
}

interface Judge {
  id: number;
  name: string;
  title: string;
  image?: string;
  cup: string;
}

interface CupSection {
  cup: string;
  judges: Judge[];
}

interface JudgesDoc {
  data: RawJudge[];
}

/* =======================
   Helpers
======================= */
const extractJudges = (raw: unknown): RawJudge[] => {
  if (Array.isArray(raw)) return raw;

  if (
    raw &&
    typeof raw === "object" &&
    "data" in raw &&
    Array.isArray((raw as JudgesDoc).data)
  ) {
    return (raw as JudgesDoc).data;
  }

  return [];
};

const isJudge = (j: Judge | null): j is Judge => j !== null;

/* =======================
   Image Card
======================= */
const JudgeCardWithImage: React.FC<{
  name: string;
  title: string;
  image: string;
}> = ({ name, title, image }) => (
  <motion.div
    className="relative aspect-square w-full max-w-[280px] rounded-2xl overflow-hidden
      bg-white/10 backdrop-blur-md
      border border-white/20
      shadow-[0_8px_40px_rgba(255,255,255,0.1)]
      hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]
      transition-all duration-700 ease-out group"
    whileHover={{ scale: 1.04 }}
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
  >
    <div className="absolute inset-0 bg-gray-800/40">
      <Image
        src={image}
        alt={name}
        fill
        unoptimized
        className="object-cover transition-all duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 transition-all duration-700 group-hover:backdrop-blur-3xl group-hover:brightness-75" />
    </div>

    <div
      className="absolute inset-0 flex flex-col items-center justify-center text-center
      opacity-0 group-hover:opacity-100 transition-all duration-700"
    >
      <h3 className="text-white text-2xl sm:text-3xl font-bold">{name}</h3>
      <p className="text-gray-200 text-sm mt-2">{title}</p>
    </div>
  </motion.div>
);

/* =======================
   Text-Only Card
======================= */
interface JudgeCardTextOnlyProps {
  name: string;
  title: string;
  cup: string;
}

const JudgeCardTextOnly: React.FC<JudgeCardTextOnlyProps> = ({
  name,
  title,
  cup,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.06 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="
      relative w-[280px] h-[150px]
      bg-[#243137]
      rounded-xl
      overflow-hidden
      grid place-content-center
      transition-all duration-500
      group
    "
  >
    <div
      className="
        absolute inset-0
        border-2 border-[#bd9f67]
        opacity-0
        rotate-[10deg]
        transition-all duration-500
        group-hover:opacity-100
        group-hover:rotate-0
        group-hover:inset-3
      "
    />

    <div className="relative z-10 text-center transition-all duration-500">
      <h3
        className="
          text-[#bd9f67]
          text-xl
          font-bold
          tracking-wide
          transition-all duration-300
          group-hover:-translate-y-1
        "
      >
        {name}
      </h3>

      <p
        className="
          mt-2
          text-sm
          text-[#e6d6ad]
          opacity-0
          translate-y-2
          transition-all duration-300
          group-hover:opacity-100
          group-hover:translate-y-0
        "
      >
        {title}
      </p>
    </div>

    <span
      className="
        absolute bottom-3 left-1/2 -translate-x-1/2
        text-[10px]
        uppercase
        tracking-[0.4em]
        text-[#bd9f67]
        opacity-0
        transition-all duration-500
        group-hover:opacity-100
        group-hover:tracking-[0.25em]
      "
    >
      {cup}
    </span>
  </motion.div>
);

/* =======================
   Judges Page
======================= */
const Judges: React.FC = () => {
  const [cups, setCups] = useState<CupSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    const fetchJudges = async () => {
      try {
        const raw = await getSingleDoc("WebContents", "judges_final");
        if (!mounted) return;

        const list = extractJudges(raw);

        const mapped = list.map((r, idx) => {
          const name =
            typeof r.name === "string" ? r.name.trim() : "";
          const title =
            typeof r.title === "string" ? r.title.trim() : "";
          const cup =
            typeof r.Cup === "string" && r.Cup.trim()
              ? r.Cup.trim()
              : "Other";

          if (!name || !title) return null;

          const image =
            r.image?.url && r.image.url.trim()
              ? r.image.url.trim()
              : undefined;

          return {
            id: idx + 1,
            name,
            title,
            cup,
            image,
          };
        });

        const normalized: Judge[] = mapped.filter(isJudge);

        const cupMap: Record<string, Judge[]> = {};
        normalized.forEach((j) => {
          if (!cupMap[j.cup]) cupMap[j.cup] = [];
          cupMap[j.cup].push(j);
        });

        const grouped: CupSection[] = Object.entries(cupMap).map(
          ([cup, judges]) => ({ cup, judges })
        );

        setCups(grouped);
      } catch (err) {
        console.error("Failed to fetch judges:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJudges();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredCups = cups
    .map((cup) => ({
      ...cup,
      judges: cup.judges.filter((j) => {
        const q = search.toLowerCase().trim();
        return (
          !q ||
          j.name.toLowerCase().includes(q) ||
          j.title.toLowerCase().includes(q)
        );
      }),
    }))
    .filter((cup) => cup.judges.length > 0);

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut },
    },
  };

  return (
    <div className="min-h-screen text-white relative overflow-x-hidden">
      <div className="fixed inset-0 -z-20">
        <Image
          src="/Elements/top2.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="pt-52 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          className="font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEDCA5]"
        >
          Meet the Judges
        </motion.h1>
      </section>

      <main className="px-6 sm:px-10 md:px-16 py-16 text-center">
        <div className="max-w-md mx-auto mb-14">
          <input
            type="text"
            placeholder="Search by name or designation…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full
              bg-white/10 backdrop-blur-md
              border border-white/20
              text-white placeholder-gray-300
              focus:outline-none focus:ring-2 focus:ring-[#f1c68a]"
          />
        </div>

        {loading ? (
          <div className="text-gray-300">Loading judges…</div>
        ) : filteredCups.length === 0 ? (
          <div className="text-gray-300 text-lg">
            No judges match your search.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            className="space-y-20 max-w-7xl mx-auto"
          >
            {filteredCups.map((cup) => (
              <div key={cup.cup}>
                <h2 className="mb-10 text-3xl sm:text-4xl font-bold text-[#f1c68a] font-['Playfair_Display']">
                  {cup.cup}
                </h2>

                <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                  {cup.judges.map((j) =>
                    j.image ? (
                      <JudgeCardWithImage
                        key={j.id}
                        name={j.name}
                        title={j.title}
                        image={j.image}
                      />
                    ) : (
                      <JudgeCardTextOnly
                        key={j.id}
                        name={j.name}
                        title={j.title}
                        cup={cup.cup}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Judges;

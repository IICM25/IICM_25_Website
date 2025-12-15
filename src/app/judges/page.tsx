// // "use client";
// // import React, { useEffect, useState } from "react";
// // import Image from "next/image";
// // import { motion, AnimatePresence, easeOut, type Variants } from "framer-motion";
// // import { getSingleDoc } from "@/lib/firebaseFirestore";

// // // === Icons ===
// // const TrophyIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
// //   <svg
// //     className={className}
// //     xmlns="http://www.w3.org/2000/svg"
// //     viewBox="0 0 24 24"
// //     fill="none"
// //     stroke="currentColor"
// //     strokeWidth="2"
// //     strokeLinecap="round"
// //     strokeLinejoin="round"
// //   >
// //     <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
// //     <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
// //     <path d="M4 22h16" />
// //     <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A3.98 3.98 0 0 1 8 19.95V22" />
// //     <path d="M14 14.66V17c0 .55.47.98.97 1.21A3.98 3.98 0 0 0 16 19.95V22" />
// //     <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
// //   </svg>
// // );

// // // === JudgeCard ===
// // interface JudgeCardProps {
// //   name: string;
// //   title: string;
// //   image?: string | null; // optional now
// // }

// // const JudgeCard: React.FC<JudgeCardProps> = ({ name, title, image }) => {
// //   const safeImage = image && image.trim().length > 0 ? image : null;
// //   return (
// //     <motion.div
// //       className={`relative aspect-square rounded-2xl overflow-hidden
// //       bg-white/10 backdrop-blur-md
// //       border border-white/20 
// //       shadow-[0_8px_40px_rgba(255,255,255,0.1)]
// //       hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]
// //       transition-all duration-700 ease-out group will-change-transform`}
// //       whileHover={{
// //         scale: 1.04,
// //         transition: { type: "spring", stiffness: 120, damping: 15 },
// //       }}
// //       initial={{ opacity: 0, y: 25 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, amount: 0.2 }}
// //     >
// //       {/* Judge Image or fallback */}
// //       <div className="absolute inset-0 overflow-hidden bg-gray-800/40 flex items-center justify-center">
// //         {safeImage ? (
// //           <Image
// //             src={safeImage}
// //             alt={name}
// //             unoptimized
// //             fill
// //             className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
// //           />
// //         ) : (
// //           // simple fallback placeholder (initials)
// //           <div className="w-full h-full flex items-center justify-center">
// //             <div className="w-28 h-28 rounded-full bg-gray-600/40 flex items-center justify-center text-white text-xl font-bold">
// //               {name
// //                 .split(" ")
// //                 .map((s) => s[0])
// //                 .join("")
// //                 .slice(0, 2)
// //                 .toUpperCase()}
// //             </div>
// //           </div>
// //         )}
// //         <div className="absolute inset-0 bg-transparent transition-all duration-700 ease-in-out group-hover:backdrop-blur-3xl group-hover:brightness-75" />
// //       </div>

// //       {/* Judge Name + Title */}
// //       <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100">
// //         <h3 className="text-white text-2xl sm:text-3xl font-bold tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
// //           {name}
// //         </h3>
// //         <p className="text-gray-200 text-sm sm:text-base mt-2 font-medium">
// //           {title}
// //         </p>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // // === Judges page ===
// // interface Judge {
// //   id: number;
// //   name: string;
// //   title: string;
// //   image?: string;
// //   Id?: string; // optional original Firestore string id if present
// // }

// // const fallbackJudges: Judge[] = [
// //   { id: 1, name: "Dr. A. Verma", title: "Dean of Cultural Affairs", image: "/images/logos/judge1.png" },
// //   { id: 2, name: "Ms. R. Iyer", title: "Renowned Choreographer", image: "/images/logos/judge1.png" },
// // ];

// // const Judges: React.FC = () => {
// //   const [judges, setJudges] = useState<Judge[]>(fallbackJudges);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     let mounted = true;

// //     const hasDataArray = (x: unknown): x is { data: unknown[] } =>
// //       typeof x === "object" && x !== null && "data" in (x as object) && Array.isArray((x as { data?: unknown }).data);

// //     const normalizeString = (s: unknown): string | undefined =>
// //       typeof s === "string" && s.trim().length > 0 ? s.trim() : undefined;

// //     const pickImageUrl = (img: unknown): string | undefined => {
// //       // if it's already a non-empty string, return it
// //       if (typeof img === "string" && img.trim().length > 0) return img.trim();
// //       // if it's an object, try common keys
// //       if (typeof img === "object" && img !== null) {
// //         const o = img as Record<string, unknown>;
// //         const candidates = ["url", "src", "image", "path", "Ref", "ref", "downloadURL", "downloadUrl"];
// //         for (const k of candidates) {
// //           const v = o[k];
// //           if (typeof v === "string" && v.trim().length > 0) return v.trim();
// //         }
// //         // sometimes the object may be nested like { file: { url: "..." } }
// //         for (const k of Object.keys(o)) {
// //           const nested = o[k];
// //           if (typeof nested === "object" && nested !== null) {
// //             const nestedObj = nested as Record<string, unknown>;
// //             for (const nk of candidates) {
// //               const nv = nestedObj[nk];
// //               if (typeof nv === "string" && nv.trim().length > 0) return nv.trim();
// //             }
// //           }
// //         }
// //       }
// //       return undefined;
// //     };

// //     const fetchJudges = async () => {
// //       try {
// //         const raw = await getSingleDoc("WebContents", "judges");
// //         if (!mounted) return;

// //         console.log("🔥 Raw Judges Data from Firestore:", raw);

// //         const arr: unknown[] = Array.isArray(raw) ? (raw as unknown[]) : hasDataArray(raw) ? raw.data : [];

// //         const ignored: Array<{ idx: number; raw: unknown; reason: string }> = [];

// //         const parsed: Judge[] = arr
// //           .map((it, idx) => {
// //             if (typeof it !== "object" || it === null) {
// //               ignored.push({ idx, raw: it, reason: "not an object" });
// //               return null;
// //             }
// //             const rec = it as Record<string, unknown>;

// //             const name =
// //               normalizeString(rec.name) ??
// //               normalizeString(rec.Name) ??
// //               undefined;

// //             const title =
// //               normalizeString(rec.title) ??
// //               normalizeString(rec.designation) ??
// //               undefined;

// //             // handle image string or object (see pickImageUrl)
// //             const imageCandidate =
// //               rec.image ?? rec.img ?? rec.url ?? undefined;
// //             const image = pickImageUrl(imageCandidate);

// //             const Id = typeof rec.Id === "string" ? rec.Id : typeof rec.id === "string" ? rec.id : undefined;

// //             if (!name) {
// //               ignored.push({ idx, raw: rec, reason: "missing name" });
// //               return null;
// //             }
// //             if (!title) {
// //               ignored.push({ idx, raw: rec, reason: "missing title" });
// //               return null;
// //             }
// //             // allow missing image (we render fallback), but still log if missing
// //             if (!image) {
// //               ignored.push({ idx, raw: rec, reason: "missing/invalid image (will show fallback)" });
// //             }

// //             return {
// //               id: idx + 1,
// //               name,
// //               title,
// //               image,
// //               Id,
// //             } as Judge;
// //           })
// //           .filter((x): x is Judge => x !== null);

// //         console.log("✅ Parsed Judges:", parsed);
// //         if (ignored.length > 0) {
// //           console.warn("⚠️ Ignored / flagged judge rows (some may be missing image):", ignored);
// //         }

// //         if (mounted && parsed.length > 0) {
// //           setJudges(parsed);
// //         } else if (mounted) {
// //           setJudges(fallbackJudges);
// //         }
// //       } catch (err) {
// //         console.error("❌ Failed to fetch judges:", err);
// //         if (mounted) setJudges(fallbackJudges);
// //       } finally {
// //         if (mounted) setLoading(false);
// //       }
// //     };

// //     fetchJudges();

// //     return () => {
// //       mounted = false;
// //     };
// //   }, []);

// //   const sectionVariants: Variants = {
// //     hidden: { opacity: 0, y: 30 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
// //     },
// //   };

// //   return (
// //     <div className="font-sans overflow-x-hidden min-h-screen relative text-white">
// //       {/* === Background === */}
// //       <div className="fixed inset-0 -z-20">
// //         <Image
// //           src="/Elements/top2.png"
// //           alt="Background"
// //           fill
// //           priority
// //           className="object-cover brightness-[1]"
// //         />
// //       </div>

// //       {/* === Hero === */}
// //       <section className="relative text-center pt-10   sm:pt-30  px-4 z-10">
// //         <motion.h1
// //           initial={{ opacity: 0, y: -30 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
// //           className="font-['Playfair_Display',serif] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#EEDCA5] drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
// //         >
// //           Meet the Judges
// //         </motion.h1>
// //         <motion.p
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.7, delay: 0.2 }}
// //           className="text-base vintage-title sm:text-lg md:text-xl mt-5 max-w-2xl mx-auto text-gray-300"
// //         >
// //           The masters who bring{" "}
// //           <span className="font-semibold text-[#f1cc87]">wisdom and artistry</span>{" "}
// //           to every performance.
// //         </motion.p>
// //       </section>

// //       {/* === Judges Grid === */}
// //       <main className="px-6 sm:px-10 md:px-16 relative z-10">
// //         <AnimatePresence mode="wait">
// //           <motion.section
// //             key="judges"
// //             initial="hidden"
// //             animate="visible"
// //             exit={{ opacity: 0, y: 10 }}
// //             variants={sectionVariants}
// //             className="py-12 sm:py-16 text-center"
// //           >
// //             <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-extrabold mb-8 text-[#f1c68a]">
// //               Our Esteemed Panel
// //             </h2>

// //             {loading ? (
// //               <div className="text-center text-gray-300">Loading judges…</div>
// //             ) : (
// //               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
// //                 {judges.map((judge) => (
// //                   <JudgeCard key={judge.Id ?? judge.id} name={judge.name} title={judge.title} image={judge.image} />
// //                 ))}
// //               </div>
// //             )}
// //           </motion.section>
// //         </AnimatePresence>
// //       </main>
// //     </div>
// //   );
// // };

// // export default Judges;
// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { motion, easeOut, type Variants } from "framer-motion";
// import { getSingleDoc } from "@/lib/firebaseFirestore";

// // === JudgeCard ===
// interface JudgeCardProps {
//   name: string;
//   title: string;
//   image?: string | null;
// }

// const JudgeCard: React.FC<JudgeCardProps> = ({ name, title, image }) => {
//   const safeImage = image && image.trim().length > 0 ? image : null;

//   return (
//     <motion.div
//       className={`relative aspect-square rounded-2xl overflow-hidden
//       bg-white/10 backdrop-blur-md
//       border border-white/20 
//       shadow-[0_8px_40px_rgba(255,255,255,0.1)]
//       hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]
//       transition-all duration-700 ease-out group`}
//       whileHover={{
//         scale: 1.04,
//         transition: { type: "spring", stiffness: 120, damping: 15 },
//       }}
//       initial={{ opacity: 0, y: 25 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//     >
//       <div className="absolute inset-0 overflow-hidden bg-gray-800/40 flex items-center justify-center">
//         {safeImage ? (
//           <Image
//             src={safeImage}
//             alt={name}
//             unoptimized
//             fill
//             className="object-cover transition-all duration-700 group-hover:scale-110"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center">
//             <div className="w-28 h-28 rounded-full bg-gray-600/40 flex items-center justify-center text-white text-xl font-bold">
//               {name
//                 .split(" ")
//                 .map((s) => s[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase()}
//             </div>
//           </div>
//         )}
//         <div className="absolute inset-0 transition-all duration-700 group-hover:backdrop-blur-3xl group-hover:brightness-75" />
//       </div>

//       <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-700">
//         <h3 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
//           {name}
//         </h3>
//         <p className="text-gray-200 text-sm sm:text-base mt-2 font-medium">
//           {title}
//         </p>
//       </div>
//     </motion.div>
//   );
// };

// // === Data Types ===
// interface Judge {
//   id: number;
//   name: string;
//   title: string;
//   image?: string;
//   Id?: string;
// }

// // === Judges Page ===
// const Judges: React.FC = () => {
//   const [judges, setJudges] = useState<Judge[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let mounted = true;

//     const hasDataArray = (x: unknown): x is { data: unknown[] } =>
//       typeof x === "object" &&
//       x !== null &&
//       "data" in (x as Record<string, unknown>) &&
//       Array.isArray((x as Record<string, unknown>).data);

//     const normalizeString = (s: unknown): string | undefined =>
//       typeof s === "string" && s.trim().length > 0 ? s.trim() : undefined;

//     const pickImageUrl = (img: unknown): string | undefined => {
//       if (typeof img === "string" && img.trim().length > 0) return img.trim();
//       if (typeof img === "object" && img !== null) {
//         const o = img as Record<string, unknown>;
//         const keys = ["url", "src", "image", "Ref", "ref"];
//         for (const k of keys) {
//           const v = o[k];
//           if (typeof v === "string" && v.trim().length > 0) return v.trim();
//         }
//       }
//       return undefined;
//     };

//     const fetchJudges = async () => {
//       try {
//         const raw = await getSingleDoc("WebContents", "judges");
//         if (!mounted) return;

//         const arr: unknown[] = Array.isArray(raw)
//           ? raw
//           : hasDataArray(raw)
//           ? raw.data
//           : [];

//         const parsed = arr
//   .map((it, idx) => {
//     if (typeof it !== "object" || it === null) return null;

//     const rec = it as Record<string, unknown>;

//     const name =
//       normalizeString(rec.name) ?? normalizeString(rec.Name);
//     const title =
//       normalizeString(rec.title) ?? normalizeString(rec.designation);

//     if (!name || !title) return null;

//     const image = pickImageUrl(rec.image ?? rec.img ?? rec.url);

//     return {
//       id: idx + 1,
//       name,
//       title,
//       image,
//     } as Judge;
//   })
//   .filter((x): x is Judge => x !== null);

//         if (mounted) setJudges(parsed);
//       } catch (error) {
//         console.error("Judges fetch failed:", error);
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     };

//     fetchJudges();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const sectionVariants: Variants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
//     },
//   };

//   return (
//     <div className="font-sans overflow-x-hidden min-h-screen pt-12 relative text-white">
//       {/* Background */}
//       <div className="fixed inset-0 -z-20">
//         <Image
//           src="/Elements/top2.png"
//           alt="Background"
//           fill
//           priority
//           className="object-cover brightness-[1]"
//         />
//       </div>

//       {/* === Hero === */}
//       <section className="relative text-center pt-26   sm:pt-20  px-4 z-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
//           className="font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEDCA5]"
//         >
//           Meet the Judges
//         </motion.h1>
//       </section>

//       {/* Judges */}
//       <main className="px-6 sm:px-10 md:px-16 relative z-10">
//         <motion.section
//           initial="hidden"
//           animate="visible"
//           variants={sectionVariants}
//           className="py-16 text-center"
//         >
//           <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-extrabold mb-8 text-[#f1c68a]">
//             Our Esteemed Panel
//           </h2>

//           {loading ? (
//             <div className="text-gray-300">Loading judges…</div>
//           ) : judges.length === 0 ? (
//             <div className="text-gray-300 text-lg mt-10">
//               Judges not yet added — will be added soon.
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
//               {judges.map((j) => (
//                 <JudgeCard key={j.id} name={j.name} title={j.title} image={j.image} />
//               ))}
//             </div>
//           )}
//         </motion.section>
//       </main>
//     </div>
//   );
// };

// export default Judges;
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, easeOut, type Variants } from "framer-motion";
import { getSingleDoc } from "@/lib/firebaseFirestore";

/* =======================
   Judge Card
======================= */
interface JudgeCardProps {
  name: string;
  title: string;
  image?: string | null;
}

const JudgeCard: React.FC<JudgeCardProps> = ({ name, title, image }) => {
  const safeImage = image && image.trim().length > 0 ? image : null;

  return (
    <motion.div
      className="relative aspect-square rounded-2xl overflow-hidden
        bg-white/10 backdrop-blur-md
        border border-white/20 
        shadow-[0_8px_40px_rgba(255,255,255,0.1)]
        hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]
        transition-all duration-700 ease-out group"
      whileHover={{
        scale: 1.04,
        transition: { type: "spring", stiffness: 120, damping: 15 },
      }}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="absolute inset-0 overflow-hidden bg-gray-800/40 flex items-center justify-center">
        {safeImage ? (
          <Image
            src={safeImage}
            alt={name}
            unoptimized
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-28 h-28 rounded-full bg-gray-600/40 flex items-center justify-center text-white text-xl font-bold">
              {name
                .split(" ")
                .map((s) => s[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>
          </div>
        )}
        <div className="absolute inset-0 transition-all duration-700 group-hover:backdrop-blur-3xl group-hover:brightness-75" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center opacity-0 group-hover:opacity-100 transition-all duration-700">
        <h3 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]">
          {name}
        </h3>
        <p className="text-gray-200 text-sm sm:text-base mt-2 font-medium">
          {title}
        </p>
      </div>
    </motion.div>
  );
};

/* =======================
   Types
======================= */
interface Judge {
  id: number;
  name: string;
  title: string;
  image?: string;
}

/* =======================
   Judges Page
======================= */
const Judges: React.FC = () => {
  const [judges, setJudges] = useState<Judge[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let mounted = true;

    const hasDataArray = (x: unknown): x is { data: unknown[] } =>
      typeof x === "object" &&
      x !== null &&
      "data" in (x as Record<string, unknown>) &&
      Array.isArray((x as Record<string, unknown>).data);

    const normalizeString = (s: unknown): string | undefined =>
      typeof s === "string" && s.trim().length > 0 ? s.trim() : undefined;

    const pickImageUrl = (img: unknown): string | undefined => {
      if (typeof img === "string" && img.trim().length > 0) return img.trim();
      if (typeof img === "object" && img !== null) {
        const o = img as Record<string, unknown>;
        for (const k of ["url", "src", "image", "Ref", "ref"]) {
          const v = o[k];
          if (typeof v === "string" && v.trim().length > 0) return v.trim();
        }
      }
      return undefined;
    };

    const fetchJudges = async () => {
      try {
        const raw = await getSingleDoc("WebContents", "judges");
        if (!mounted) return;

        const arr: unknown[] = Array.isArray(raw)
          ? raw
          : hasDataArray(raw)
          ? raw.data
          : [];

        const parsed = arr
          .map((it, idx) => {
            if (typeof it !== "object" || it === null) return null;
            const rec = it as Record<string, unknown>;

            const name =
              normalizeString(rec.name) ?? normalizeString(rec.Name);
            const title =
              normalizeString(rec.title) ??
              normalizeString(rec.designation);

            if (!name || !title) return null;

            const image = pickImageUrl(rec.image ?? rec.img ?? rec.url);

            return {
              id: idx + 1,
              name,
              title,
              image,
            } as Judge;
          })
          .filter((x): x is Judge => x !== null);

        if (mounted) setJudges(parsed);
      } catch (e) {
        console.error("Judges fetch failed:", e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchJudges();
    return () => {
      mounted = false;
    };
  }, []);

  /* =======================
     Search Filter
  ======================= */
  const filteredJudges = judges.filter((j) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      j.name.toLowerCase().includes(q) ||
      j.title.toLowerCase().includes(q)
    );
  });

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
    },
  };

  return (
    <div className="font-sans overflow-x-hidden min-h-screen pt-12 relative text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-20">
        <Image
          src="/Elements/top2.png"
          alt="Background"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Hero */}
      <section className="text-center pt-12 px-4 z-10 relative">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
          className="font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEDCA5]"
        >
          Meet the Judges
        </motion.h1>
      </section>

      {/* Judges */}
      <main className="px-6 sm:px-10 md:px-16 relative z-10">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="py-16 text-center"
        >
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-extrabold mb-6 text-[#f1c68a]">
            Our Esteemed Panel
          </h2>

          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-10">
            <input
              type="text"
              placeholder="Search by name or designation…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-3 rounded-full
                bg-white/10 backdrop-blur-md
                border border-white/20
                text-white placeholder-gray-300
                focus:outline-none focus:ring-2 focus:ring-[#f1c68a]
                transition"
            />
          </div>

          {loading ? (
            <div className="text-gray-300">Loading judges…</div>
          ) : filteredJudges.length === 0 ? (
            <div className="text-gray-300 text-lg mt-10">
              No judges match your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {filteredJudges.map((j) => (
                <JudgeCard
                  key={j.id}
                  name={j.name}
                  title={j.title}
                  image={j.image}
                />
              ))}
            </div>
          )}
        </motion.section>
      </main>
    </div>
  );
};

export default Judges;

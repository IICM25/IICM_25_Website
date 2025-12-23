// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { getSingleDoc } from "@/lib/firebaseFirestore";
// import { motion, AnimatePresence, easeOut, type Variants } from "framer-motion";

// // === Icons (Moved Outside Component) ===
// function TrophyIcon({ className = "w-5 h-5" }: { className?: string }) {
//   return (
//     <svg
//       className={className}
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
//       <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
//       <path d="M4 22h16" />
//       <path d="M10 14.66V17c0 .55-.47.98-.97 1.21A3.98 3.98 0 0 1 8 19.95V22" />
//       <path d="M14 14.66V17c0 .55.47.98.97 1.21A3.98 3.98 0 0 0 16 19.95V22" />
//       <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
//     </svg>
//   );
// }

// const UsersIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
//   <svg
//     className={className}
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
//     <circle cx="9" cy="7" r="4" />
//     <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
//     <path d="M16 3.13a4 4 0 0 1 0 7.75" />
//   </svg>
// );

// // === Sponsor Interface ===
// interface Sponsor {
//   Id?: string;
//   name: string;
//   sponsor?: string;
//   level?: string;
//   url?: string;
//   logo?: unknown; // unknown shape from Firestore (object | string | nested)
// }

// // === Animation Variants (Moved Outside Component) ===
// const sectionVariants: Variants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
//   },
// };

// interface SponsorCardProps {
//   id?: string;
//   name: string;
//   sponsor?: string;
//   logoUrl?: string | null;
//   url?: string;
// }

// // SponsorCard: uses logoUrl if provided, otherwise shows name.
// const SponsorCard: React.FC<SponsorCardProps> = ({ id, name, sponsor, logoUrl, url }) => {
//   return (
//     <motion.a
//       href={url ?? "#"}
//       target={url ? "_blank" : "_self"}
//       rel={url ? "noopener noreferrer" : undefined}
//       className={`relative aspect-square rounded-2xl overflow-hidden 
//         bg-white/10 backdrop-blur-md
//         border border-white/20 
//         shadow-[0_8px_40px_rgba(255,255,255,0.1)]
//         hover:shadow-[0_0_40px_rgba(255,255,255,0.25)]
//         transition-shadow duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]
//         group will-change-transform will-change-filter`}
//       whileHover={{
//         scale: 1.04,
//         transition: { type: "spring", stiffness: 120, damping: 14 },
//       }}
//       initial={{ opacity: 0, y: 25 }}
//       animate={{ opacity: 1, y: 0, transition: { duration: 0.6 } }}
//       viewport={{ once: true, amount: 0.3 }}
//       aria-label={`${name} ${sponsor ? `— ${sponsor}` : ""} ${id ? `(${id})` : ""}`}
//     >
//       <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
//       <div className="absolute inset-0 bg-transparent transition-all duration-700 ease-in-out group-hover:backdrop-blur-[40px] group-hover:brightness-75 pointer-events-none" />

//       <div className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-700 ease-in-out group-hover:opacity-0 pointer-events-none">
//         {logoUrl ? (
//           <Image
//             src={logoUrl.startsWith("http") ? logoUrl : logoUrl.startsWith("/") ? logoUrl : `/images/logos/${logoUrl}`}
//             alt={`${name} logo`}
//             fill
//             className="object-contain"
//           />
//         ) : (
//           <div className="text-white/80 text-center select-none">
//             <span className="text-2xl font-semibold">{name}</span>
//             {sponsor && <div className="text-sm text-gray-300 mt-2">{sponsor}</div>}
//           </div>
//         )}
//       </div>

//       <div className="absolute inset-0 flex items-center justify-center text-center transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none px-4">
//         <span className="text-white text-3xl font-bold tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] select-none">
//           {name}
//         </span>
//       </div>
//     </motion.a>
//   );
// };

// // helper: normalize group from sponsor/level fields
// function normalizeGroup(s: Sponsor): "title" | "sponsors" | "MNP" | "" {
//   const raw = `${s.sponsor ?? ""} ${s.level ?? ""}`.toLowerCase();
//   if (raw.includes("title")) return "title";
//   if (raw.includes("mnp")) return "MNP";
//   // accept common misspellings / variations for sponsor
//   if (raw.includes("spon") || raw.includes("sponsor") || raw.includes("sponser")) return "sponsors";
//   return "";
// }

// // safe extractor for logo URL from unknown shapes
// function getLogoUrl(logo: unknown): string | null {
//   if (!logo) return null;

//   // if it's a string
//   if (typeof logo === "string") {
//     const trimmed = logo.trim();
//     return trimmed.length > 0 ? trimmed : null;
//   }

//   // if it's an object, try to find common keys
//   if (typeof logo === "object" && logo !== null) {
//     const obj = logo as Record<string, unknown>;
//     // common candidates
//     const candidates = ["url", "src", "path", "downloadURL", "downloadUrl", "publicUrl", "public_url"];
//     for (const k of candidates) {
//       const v = obj[k];
//       if (typeof v === "string" && v.trim().length > 0) return v.trim();
//     }

//     // nested object search one level deep
//     for (const key of Object.keys(obj)) {
//       const sub = obj[key];
//       if (typeof sub === "object" && sub !== null) {
//         const subObj = sub as Record<string, unknown>;
//         for (const k of candidates) {
//           const v = subObj[k];
//           if (typeof v === "string" && v.trim().length > 0) return v.trim();
//         }
//       }
//     }
//   }

//   return null;
// }

// // === Main Component ===
// const Partners: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<"sponsors" | "MNP">("sponsors");
//   const [sponsors, setSponsors] = useState<Sponsor[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [titleSponsor, setTitleSponsor] = useState<Sponsor | null>(null);

//   // fetching logic — safe parsing without any
//   const fetchSponsors = async () => {
//     try {
//       const raw = await getSingleDoc("WebContents", "sponsors");
//       console.log("fetched sponsors raw data:", raw);

//       // Accept shapes: array directly OR { data: [...] }
//       let arr: unknown[] = [];
//       if (Array.isArray(raw)) {
//         arr = raw;
//       } else if (typeof raw === "object" && raw !== null && "data" in (raw as Record<string, unknown>) && Array.isArray((raw as Record<string, unknown>).data)) {
//         arr = ((raw as Record<string, unknown>).data as unknown[]) ?? [];
//       } else {
//         // unknown shape — keep empty and log
//         console.warn("Unexpected sponsors payload shape — expected array or { data: [...] }", raw);
//         arr = [];
//       }

//       // Normalize entries to Sponsor[] as safely as possible
//       const parsed: Sponsor[] = arr
//         .map((item) => {
//           if (typeof item !== "object" || item === null) return null;
//           const it = item as Record<string, unknown>;
//           const name = typeof it.name === "string" ? it.name : typeof it.Name === "string" ? it.Name : undefined;
//           if (!name) return null;
//           const Id = typeof it.Id === "string" ? it.Id : typeof it.id === "string" ? it.id : undefined;
//           const sponsor = typeof it.sponsor === "string" ? it.sponsor : undefined;
//           const level = typeof it.level === "string" ? it.level : undefined;
//           const url = typeof it.url === "string" ? it.url : undefined;
//           const logo = it.logo ?? it.image ?? it.img ?? undefined;
//           return { Id, name, sponsor, level, url, logo } as Sponsor;
//         })
//         .filter((x): x is Sponsor => x !== null);

//       setSponsors(parsed);

//       // find title sponsor
//       const found = parsed.find((s) => normalizeGroup(s) === "title");
//       setTitleSponsor(found ?? null);

//       setLoading(false);
//     } catch (e) {
//       console.error("Failed to fetch sponsors:", e);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchSponsors();
//   }, []);

//   // compute visible sponsors (exclude title and filter by activeTab) and map logo -> logoUrl
//   const visibleSponsors = sponsors
//     .filter((s) => {
//       // exclude the detected title sponsor (use Id if present, otherwise name)
//       if (titleSponsor) {
//         if (titleSponsor.Id && s.Id && titleSponsor.Id === s.Id) return false;
//         if (!titleSponsor.Id && s.name === titleSponsor.name) return false;
//       }

//       const group = normalizeGroup(s);
//       if (activeTab === "sponsors") return group === "sponsors";
//       return group === "MNP";
//     })
//     .map((s) => {
//       const logoUrl = getLogoUrl(s.logo);
//       return { ...s, logoUrl };
//     });

//   // title sponsor logoUrl extraction for render
//   const titleSponsorLogoUrl = titleSponsor ? getLogoUrl(titleSponsor.logo) : null;

//   return (
//     <div className="font-sans overflow-x-hidden min-h-screen relative text-white">
//       {/* === Background === */}
//       <div className="fixed inset-0 -z-20">
//         <Image src="/Elements/top2.png" alt="Background" fill priority className="object-cover brightness-[0.65]" />
//       </div>

//       {/* === Hero === */}
//       <section className="relative text-center pt-28 sm:pt-48 pb-16 sm:pb-28 px-4 z-10">
//         <motion.h1
//           initial={{ opacity: 0, y: -40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
//           className="font-['Playfair_Display',serif] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDE6A3] drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
//         >
//           Our Partners
//         </motion.h1>
//         <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="vintage-title text-base sm:text-lg md:text-xl mt-5 max-w-2xl mx-auto text-gray-300">
//           <span className=" text-amber-50"> The visionaries who make </span> <span className="font-semibold text-[#FFD37F]">Inter IIT Cultural Meet 8.0</span> <span className=" text-amber-50"> possible.</span>
//         </motion.p>
//       </section>

//       {/* === Navbar === */}
//       <div className="sticky top-0 py-3 sm:py-4 z-30 backdrop-blur-md">
//         <div className="flex justify-center">
//           <div className="flex items-center rounded-full bg-white/10 shadow-md border border-white/20 p-1 sm:p-2">
//             {["sponsors", "MNP"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab as "sponsors" | "MNP")}
//                 className={`flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-medium transition-all duration-300 ${
//                   activeTab === tab ? "text-yellow-800 bg-white shadow-md" : "text-gray-200 hover:text-yellow-400"
//                 }`}
//               >
//                 {tab === "sponsors" ? <TrophyIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
//                 <span className="capitalize">{tab}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* === Content === */}
//       <main className="px-4 sm:px-8 md:px-16 relative z-10">
//         <AnimatePresence mode="wait">
//           <motion.div key={activeTab} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10 }} variants={sectionVariants}>
//             {/* Title Sponsor */}
//             <motion.section className="py-12 sm:py-16 text-center" variants={sectionVariants}>
//               <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-extrabold mb-8 text-[#FFB347]">Title Sponsor</h2>

//               {loading ? (
//                 <div className="max-w-6xl mx-auto">
//                   <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center">
//                     <span className="text-gray-300">Loading...</span>
//                   </div>
//                 </div>
//               ) : titleSponsor ? (
//                 <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 max-w-4xl mx-auto gap-8">
//                   <div />
//                   <SponsorCard id={titleSponsor.Id} name={titleSponsor.name} sponsor={titleSponsor.sponsor} logoUrl={titleSponsorLogoUrl} url={titleSponsor.url} />
//                   <div />
//                 </div>
//               ) : (
//                 <div className="max-w-6xl mx-auto text-gray-300">No title sponsor found</div>
//               )}
//             </motion.section>

//             {/* Remaining sponsors / MNP */}
//             <motion.section className="py-12 sm:py-16 text-center" variants={sectionVariants}>
//               <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-extrabold mb-4 text-teal-300">{activeTab === "sponsors" ? "Sponsors" : "MNP"}</h2>

//               {loading ? (
//                 <div className="text-gray-300">Loading...</div>
//               ) : visibleSponsors.length === 0 ? (
//                 <div className="text-gray-300">No {activeTab} found</div>
//               ) : (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
//                   {visibleSponsors.map((s) => (
//                     <SponsorCard key={s.Id ?? s.name} id={s.Id} name={s.name} sponsor={s.sponsor} logoUrl={s.logoUrl ?? null} url={s.url} />
//                   ))}
//                 </div>
//               )}
//             </motion.section>
//           </motion.div>
//         </AnimatePresence>
//       </main>
//     </div>
//   );
// };

// export default Partners;
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getSingleDoc } from "@/lib/firebaseFirestore";
import { motion, AnimatePresence, easeOut, type Variants } from "framer-motion";

// === Icons (Moved Outside Component) ===
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

// === Sponsor Interface ===
interface Sponsor {
  Id?: string;
  name: string;
  sponsor?: string;
  level?: string;
  url?: string;
  logo?: unknown; // unknown shape from Firestore (object | string | nested)
}

// === Animation Variants (Moved Outside Component) ===
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut, staggerChildren: 0.1 },
  },
};

interface SponsorCardProps {
  id?: string;
  name: string;
  sponsor?: string;
  logoUrl?: string | null;
  url?: string;
}

// SponsorCard: uses logoUrl if provided, otherwise shows name.
const SponsorCard: React.FC<SponsorCardProps> = ({ id, name, sponsor, logoUrl }) => {
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
      aria-label={`${name} ${sponsor ? `— ${sponsor}` : ""} ${id ? `(${id})` : ""}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
      <div className="absolute inset-0 bg-transparent transition-all duration-700 ease-in-out group-hover:backdrop-blur-[40px] group-hover:brightness-75 pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center p-6 transition-all duration-700 ease-in-out group-hover:opacity-0 pointer-events-none">
        {logoUrl ? (
          <Image
            src={
              logoUrl.startsWith("http")
                ? logoUrl
                : logoUrl.startsWith("/")
                ? logoUrl
                : `/images/logos/${logoUrl}`
            }
            alt={`${name} logo`}
            fill
            className="object-contain"
          />
        ) : (
          <div className="text-white/80 text-center select-none">
            <span className="text-2xl font-semibold">{name}</span>
            {sponsor && <div className="text-sm text-gray-300 mt-2">{sponsor}</div>}
          </div>
        )}
      </div>

      <div className="absolute inset-0 flex items-center justify-center text-center transition-all duration-700 ease-in-out opacity-0 group-hover:opacity-100 pointer-events-none px-4">
        <span className="text-white text-3xl font-bold tracking-wide drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] select-none">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

// helper: normalize group from sponsor/level fields
function normalizeGroup(s: Sponsor): "title" | "sponsors" | "MNP" | "" {
  const raw = `${s.sponsor ?? ""} ${s.level ?? ""}`.toLowerCase();
  if (raw.includes("title")) return "title";
  if (raw.includes("mnp")) return "MNP";
  // accept common misspellings / variations for sponsor
  if (raw.includes("spon") || raw.includes("sponsor") || raw.includes("sponser")) return "sponsors";
  return "";
}

// safe extractor for logo URL from unknown shapes
function getLogoUrl(logo: unknown): string | null {
  if (!logo) return null;

  // if it's a string
  if (typeof logo === "string") {
    const trimmed = logo.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  // if it's an object, try to find common keys
  if (typeof logo === "object" && logo !== null) {
    const obj = logo as Record<string, unknown>;
    // common candidates
    const candidates = ["url", "src", "path", "downloadURL", "downloadUrl", "publicUrl", "public_url"];
    for (const k of candidates) {
      const v = obj[k];
      if (typeof v === "string" && v.trim().length > 0) return v.trim();
    }

    // nested object search one level deep
    for (const key of Object.keys(obj)) {
      const sub = obj[key];
      if (typeof sub === "object" && sub !== null) {
        const subObj = sub as Record<string, unknown>;
        for (const k of candidates) {
          const v = subObj[k];
          if (typeof v === "string" && v.trim().length > 0) return v.trim();
        }
      }
    }
  }

  return null;
}

// === Main Component ===
const Partners: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"sponsors" | "MNP">("sponsors");
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [titleSponsor, setTitleSponsor] = useState<Sponsor | null>(null);

  // fetching logic — safe parsing without any
  const fetchSponsors = async () => {
    try {
      const raw = await getSingleDoc("WebContents", "sponsors");
      console.log("fetched sponsors raw data:", raw);

      // Accept shapes: array directly OR { data: [...] }
      let arr: unknown[] = [];
      if (Array.isArray(raw)) {
        arr = raw;
      } else if (typeof raw === "object" && raw !== null && "data" in (raw as Record<string, unknown>) && Array.isArray((raw as Record<string, unknown>).data)) {
        arr = ((raw as Record<string, unknown>).data as unknown[]) ?? [];
      } else {
        // unknown shape — keep empty and log
        console.warn("Unexpected sponsors payload shape — expected array or { data: [...] }", raw);
        arr = [];
      }

      // Normalize entries to Sponsor[] as safely as possible
      const parsed: Sponsor[] = arr
        .map((item) => {
          if (typeof item !== "object" || item === null) return null;
          const it = item as Record<string, unknown>;
          const name = typeof it.name === "string" ? it.name : typeof it.Name === "string" ? it.Name : undefined;
          if (!name) return null;
          const Id = typeof it.Id === "string" ? it.Id : typeof it.id === "string" ? it.id : undefined;
          const sponsor = typeof it.sponsor === "string" ? it.sponsor : undefined;
          const level = typeof it.level === "string" ? it.level : undefined;
          const url = typeof it.url === "string" ? it.url : undefined;
          const logo = it.logo ?? it.image ?? it.img ?? undefined;
          return { Id, name, sponsor, level, url, logo } as Sponsor;
        })
        .filter((x): x is Sponsor => x !== null);

      setSponsors(parsed);

      // find title sponsor
      const found = parsed.find((s) => normalizeGroup(s) === "title");
      setTitleSponsor(found ?? null);

      setLoading(false);
    } catch (e) {
      console.error("Failed to fetch sponsors:", e);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  // compute visible sponsors (exclude title and filter by activeTab) and map logo -> logoUrl
  const visibleSponsors = sponsors
    .filter((s) => {
      // exclude the detected title sponsor (use Id if present, otherwise name)
      if (titleSponsor) {
        if (titleSponsor.Id && s.Id && titleSponsor.Id === s.Id) return false;
        if (!titleSponsor.Id && s.name === titleSponsor.name) return false;
      }

      const group = normalizeGroup(s);
      if (activeTab === "sponsors") return group === "sponsors";
      return group === "MNP";
    })
    .map((s) => {
      const logoUrl = getLogoUrl(s.logo);
      return { ...s, logoUrl };
    });

  // title sponsor logoUrl extraction for render
  const titleSponsorLogoUrl = titleSponsor ? getLogoUrl(titleSponsor.logo) : null;

  const firstSponsor = visibleSponsors[0] ?? null;
  const remainingSponsors = visibleSponsors.slice(1);

  return (
    <div className="font-sans overflow-x-hidden min-h-screen relative text-white">
      {/* === Background === */}
      <div className="fixed inset-0 -z-20">
        <Image src="/Elements/top2.png" alt="Background" fill priority className="object-cover " />
      </div>

      {/* === Hero === */}
      <section className="relative text-center pt-28 sm:pt-32 pb-16 sm:pb-15 px-4 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="font-['Playfair_Display',serif] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#FDE6A3] drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)]"
        >
          Our Partners
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="sm:text-lg md:text-xl vintage-title  text-secondary pt-6 max-w-2xl mx-auto drop-shadow-md">
          <span className="vintage-title  text-secondary max-w-2xl mx-auto drop-shadow-md"> The visionaries who make </span> <span className="font-semibold text-[#FFD37F]">Inter IIT Cultural Meet 8.0</span> <span className="vintage-title  text-secondary max-w-2xl mx-auto drop-shadow-md"> possible.</span>
        </motion.p>
      </section>

      {/* === Navbar === */}
      <div className="sticky top-0 py-3 sm:py-4 z-30 backdrop-blur-md">
        <div className="flex justify-center">
          <div className="flex items-center rounded-full bg-white/10 shadow-md border border-white/20 p-1 sm:p-2">
            {["sponsors", "MNP"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "sponsors" | "MNP")}
                className={`flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 text-sm sm:text-base font-medium transition-all duration-300 ${
                  activeTab === tab ? "text-yellow-800 bg-white shadow-md" : "text-gray-200 hover:text-yellow-400"
                }`}
              >
                {tab === "sponsors" ? <TrophyIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === Content === */}
      <main className="px-4 sm:px-8 md:px-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial="hidden" animate="visible" exit={{ opacity: 0, y: 10 }} variants={sectionVariants}>
            {/* Title Sponsor */}
            {/* <motion.section className="py-12 sm:py-16 text-center" variants={sectionVariants}>
              <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-extrabold mb-8 text-[#FDE6A3]">Title Sponsor</h2>

              {loading ? (
                <div className="max-w-6xl mx-auto">
                  <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center">
                    <span className="text-gray-300">Loading...</span>
                  </div>
                </div>
              ) : titleSponsor ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 max-w-4xl mx-auto gap-8">
                  <div />
                  <SponsorCard id={titleSponsor.Id} name={titleSponsor.name} sponsor={titleSponsor.sponsor} logoUrl={titleSponsorLogoUrl} url={titleSponsor.url} />
                  <div />
                </div>
              ) : (
                <div className="max-w-6xl mx-auto text-gray-300 text-lg mt-10">
                  Title sponsor not yet added — will be added soon.
                </div>
              )}
            </motion.section> */}

            {/* Remaining sponsors / MNP */}
            <motion.section className="py-12 sm:py-16 text-center" variants={sectionVariants}>
              <h2 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl font-extrabold mb-4 text-[#FDE6A3]">{activeTab === "sponsors" ? "Sponsors" : "MNP"}</h2>

              {loading ? (
                <div className="text-gray-300">Loading...</div>
              ) : visibleSponsors.length === 0 ? (
                <div className="text-gray-300 text-lg mt-10">
                  {activeTab === "sponsors" ? "Sponsors not yet added — will be added soon." : "MNP not yet added — will be added soon."}
                </div>
              ) : (
                <>
                {firstSponsor && (
                  <div className="grid grid-cols-1 md:grid-cols-3 max-w-4xl mx-auto gap-8 mb-12">
                    <div />
                    <SponsorCard
                      id={firstSponsor.Id}
                      name={firstSponsor.name}
                      sponsor={firstSponsor.sponsor}
                      logoUrl={firstSponsor.logoUrl ?? null}
                      url={firstSponsor.url}
                    />
                    <div />
                  </div>
                )}

                {/* Remaining sponsors */}
                {remainingSponsors.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {remainingSponsors.map((s) => (
                      <SponsorCard
                        key={s.Id ?? s.name}
                        id={s.Id}
                        name={s.name}
                        sponsor={s.sponsor}
                        logoUrl={s.logoUrl ?? null}
                        url={s.url}
                      />
                    ))}
                  </div>
                )}
                </>
              )}
            </motion.section>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Partners;

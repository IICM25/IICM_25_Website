// "use client";

// import React, { useEffect, useState } from "react";
// import Timeline from "@/components/Timeline";
// import { getSingleDoc } from "@/lib/firebaseFirestore";

// // Background fallback image
// const BG_IMAGE = "/top2.jpg";

// // --- RAW FIREBASE SHAPE ---
// interface RawScheduleItem {
//   id?: number | string;
//   Id?: number | string;
//   ID?: number | string;

//   eventName?: string;
//   desc?: string;

//   image?: { url?: string; ref?: string } | string;
//   imageUrl?: string;

//   venue?: string;
//   day?: string | number;

//   startTime?: string | number;
//   start?: string | number;

//   endTime?: string | number;
//   end?: string | number;
// }

// // --- NORMALIZED SHAPE ---
// type ScheduleEvent = {
//   id: number;
//   date: string;
//   title: string;
//   summary: string;
//   imageUrl: string;
//   details: string;
//   start: string;
//   end: string;
//   timestamp: Date;
//   day: string;
//   venue: string;
// };

// export default function Schedule() {
//   const [currentDaySchedule, setCurrentDaySchedule] = useState<ScheduleEvent[]>([]);
//   const [day1, setDay1] = useState<ScheduleEvent[]>([]);
//   const [day2, setDay2] = useState<ScheduleEvent[]>([]);
//   const [day3, setDay3] = useState<ScheduleEvent[]>([]);
//   const [day4, setDay4] = useState<ScheduleEvent[]>([]);
//   // const [day4, setDay4] = useState<ScheduleEvent[]>([]);
//   const [day5, setDay5] = useState<ScheduleEvent[]>([]);
//   const [activeDay, setActiveDay] = useState(1);
//   const [loading, setLoading] = useState(true);

//   const dates = [
//     { day: 0, date: "2025-12-22" },
//     { day: 1, date: "2025-12-23" },
//     { day: 2, date: "2025-12-24" },
//     { day: 3, date: "2025-12-25" },
//     {day: 4, date: "2025-12-26"},
//   ];

//   const getCurrentISTDate = () => {
//     const now = new Date();
//     const ms = now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600 * 1000;
//     return new Date(ms).toISOString().split("T")[0];
//   };

//   const getActiveDayByDate = () => {
//     const today = getCurrentISTDate();
//     const match = dates.find((d) => d.date === today);
//     return match ? match.day : 1;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const raw = await getSingleDoc("WebContents", "Schedule_final");

//         // Accept array or {data: []}
//         let arr: RawScheduleItem[] = [];
//         if (Array.isArray(raw)) arr = raw as RawScheduleItem[];
//         else if (raw && Array.isArray((raw as { data: RawScheduleItem[] }).data))
//           arr = (raw as { data: RawScheduleItem[] }).data;

//         const d1: ScheduleEvent[] = [];
//         const d2: ScheduleEvent[] = [];
//         const d3: ScheduleEvent[] = [];
//         const d4: ScheduleEvent[] = [];
//         const d5: ScheduleEvent[] = [];

//         arr.forEach((e, idx) => {
//           // --- id ---
//           const rawId = e.id ?? e.Id ?? e.ID;
//           const parsedId = Number(rawId);
//           const id = Number.isFinite(parsedId) ? parsedId : idx + 1;

//           // --- text fields ---
//           const title = e.eventName ?? "Untitled";
//           const desc = e.desc ?? "";
//           const venue = e.venue ?? "Venue not specified";

//           // --- image ---
//           let imageUrl = BG_IMAGE;

//           if (typeof e.image === "string") {
//             imageUrl = e.image.trim() || BG_IMAGE;
//           } else if (e.image && typeof e.image === "object") {
//             imageUrl = e.image.url || e.image.ref || BG_IMAGE;
//           } else if (e.imageUrl) {
//             imageUrl = e.imageUrl;
//           }

//           // --- day ---
//           const day = String(e.day ?? "1");

//           // --- start & end strings ---
//           const start = String(e.startTime ?? e.start ?? "");
//           const end = String(e.endTime ?? e.end ?? "");

//           // --- timestamp (for sorting internally if ever needed) ---
//           let timestamp = new Date(0);
//           if (typeof e.startTime === "number") {
//             timestamp =
//               e.startTime > 1e12
//                 ? new Date(e.startTime)
//                 : new Date(e.startTime * 1000);
//           }

//           const event: ScheduleEvent = {
//             id,
//             date: getCurrentISTDate(), // no separate date field in backend
//             title,
//             summary: desc.length > 120 ? desc.slice(0, 120).trim() + "..." : desc,
//             imageUrl,
//             details: `${desc}\nVenue: ${venue}`,
//             start,
//             end,
//             timestamp,
//             day,
//             venue,
//           };

//           if (day === "0") d1.push(event);
//           else if (day === "1") d2.push(event);
//           else if (day === "2") d3.push(event);
//           else if (day === "3") d4.push(event);
//           else if (day === "4") d5.push(event);
//           else d1.push(event);
//         });

//         // Sort all by ID
//         const sortById = (a: ScheduleEvent, b: ScheduleEvent) => a.id - b.id;
//         d1.sort(sortById);
//         d2.sort(sortById);
//         d3.sort(sortById);
//         d4.sort(sortById);
//         d5.sort(sortById);

//         setDay1(d1);
//         setDay2(d2);
//         setDay3(d3);
//         setDay4(d4);
//         setDay5(d5);

//         const initial = getActiveDayByDate();
//         setActiveDay(initial);

//         setCurrentDaySchedule(
//           initial === 1 ? d1 : initial === 2 ? d2 : initial === 3 ? d3 : d4
//         );
//       } catch (err) {
//         console.error("Schedule fetch failed", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (activeDay === 1) setCurrentDaySchedule(day1);
//     else if (activeDay === 2) setCurrentDaySchedule(day2);
//     else if (activeDay === 3) setCurrentDaySchedule(day3);
//     else if (activeDay === 4) setCurrentDaySchedule(day4);
//   }, [activeDay, day1, day2, day3, day4]);

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: `url('/images/background_image/top.png')`, backgroundAttachment: "fixed" }}
//     >
//       <div className="min-h-screen">
//         <div className="container mx-auto py-16">
//           <div className="text-center pt-12 flex flex-col items-center">
//             <h1 className="drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEDCA5] p-5">
//               Schedule
//             </h1>
//             <p className="vintage-title text-xl max-w-[40vw] text-[#f1c68a] mb-8 text-center">
//               Check the day wise schedule of events happening at Inter IIT Cultural Meet 8.0.
//             </p>
//           </div>

//           {/* Day Selector */}
//           <div className="flex justify-center flex-wrap gap-6 mb-10">
//             {dates.map((d) => (
//               <button
//                 key={d.day}
//                 onClick={() => setActiveDay(d.day)}
//                 className={`px-6 py-2 rounded-[5px] shadow-md transition-all duration-300 ${
//                   activeDay === d.day
//                     ? "bg-[#6b131f] text-white hover:bg-[#7a1a22]"
//                     : "bg-white/20 text-white border border-white/20 hover:bg-white/30"
//                 }`}
//               >
//                 Day {d.day}
//               </button>
//             ))}
//           </div>

//           {/* Timeline */}
//           <div className="mx-auto max-w-5xl">
//             {loading ? (
//               <div className="text-center text-gray-300">Loading schedule…</div>
//             ) : currentDaySchedule.length === 0 ? (
//               <div className="text-center text-gray-300">Schedule not yet published.</div>
//             ) : (
//               <Timeline events={currentDaySchedule} />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import Timeline from "@/components/Timeline";
import { getSingleDoc } from "@/lib/firebaseFirestore";

// Background fallback image
const BG_IMAGE = "/top2.jpg";

/* =========================
   RAW FIREBASE SHAPE
========================= */
interface RawScheduleItem {
  id?: number | string;
  Id?: number | string;
  ID?: number | string;

  eventName?: string;
  desc?: string;

  image?: { url?: string; ref?: string } | string;
  imageUrl?: string;

  venue?: string;
  day?: string | number;

  startTime?: string | number;
  start?: string | number;

  endTime?: string | number;
  end?: string | number;
}

/* =========================
   NORMALIZED SHAPE
========================= */
type ScheduleEvent = {
  id: number;
  date: string;
  title: string;
  summary: string;
  imageUrl: string;
  details: string;
  start: string;
  end: string;
  timestamp: Date;
  day: string;
  venue: string;
};

export default function Schedule() {
  const [currentDaySchedule, setCurrentDaySchedule] = useState<ScheduleEvent[]>([]);
  const [day1, setDay1] = useState<ScheduleEvent[]>([]);
  const [day2, setDay2] = useState<ScheduleEvent[]>([]);
  const [day3, setDay3] = useState<ScheduleEvent[]>([]);
  const [day4, setDay4] = useState<ScheduleEvent[]>([]);
  const [day5, setDay5] = useState<ScheduleEvent[]>([]);
  const [activeDay, setActiveDay] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  /* =========================
     DAY CONFIG (0-based)
  ========================= */
  const dates = [
    { day: 0, label: "Day 0", date: "2025-12-22" },
    { day: 1, label: "Day 1", date: "2025-12-23" },
    { day: 2, label: "Day 2", date: "2025-12-24" },
    { day: 3, label: "Day 3", date: "2025-12-25" },
    { day: 4, label: "Day 4", date: "2025-12-26" },
  ];

  /* =========================
     IST DATE HELPERS
  ========================= */
  const getCurrentISTDate = () => {
    const now = new Date();
    const ist =
      now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600 * 1000;
    return new Date(ist).toISOString().split("T")[0];
  };

  const getActiveDayByDate = () => {
    const today = getCurrentISTDate();
    const match = dates.find((d) => d.date === today);
    return match ? match.day : 0;
  };

  /* =========================
     FETCH + NORMALIZE
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const raw = await getSingleDoc("WebContents", "Schedule_final");

        let arr: RawScheduleItem[] = [];
        if (Array.isArray(raw)) arr = raw;
        else if (raw && Array.isArray((raw as any).data)) arr = raw.data;

        const d1: ScheduleEvent[] = [];
        const d2: ScheduleEvent[] = [];
        const d3: ScheduleEvent[] = [];
        const d4: ScheduleEvent[] = [];
        const d5: ScheduleEvent[] = [];

        arr.forEach((e, idx) => {
          const rawId = e.id ?? e.Id ?? e.ID;
          const id = Number.isFinite(Number(rawId)) ? Number(rawId) : idx + 1;

          const title = e.eventName ?? "Untitled Event";
          const desc = e.desc ?? "";
          const venue = e.venue ?? "Venue not specified";

          let imageUrl = BG_IMAGE;
          if (typeof e.image === "string") imageUrl = e.image.trim() || BG_IMAGE;
          else if (e.image && typeof e.image === "object")
            imageUrl = e.image.url || e.image.ref || BG_IMAGE;
          else if (e.imageUrl) imageUrl = e.imageUrl;

          const day = String(e.day ?? "0");
          const start = String(e.startTime ?? e.start ?? "");
          const end = String(e.endTime ?? e.end ?? "");

          let timestamp = new Date(0);
          if (typeof e.startTime === "number") {
            timestamp =
              e.startTime > 1e12
                ? new Date(e.startTime)
                : new Date(e.startTime * 1000);
          }

          const event: ScheduleEvent = {
            id,
            date: getCurrentISTDate(),
            title,
            summary:
              desc.length > 120 ? desc.slice(0, 120).trim() + "..." : desc,
            imageUrl,
            details: `${desc}\nVenue: ${venue}`,
            start,
            end,
            timestamp,
            day,
            venue,
          };

          if (day === "0") d1.push(event);
          else if (day === "1") d2.push(event);
          else if (day === "2") d3.push(event);
          else if (day === "3") d4.push(event);
          else if (day === "4") d5.push(event);
        });

        const sortById = (a: ScheduleEvent, b: ScheduleEvent) => a.id - b.id;
        [d1, d2, d3, d4, d5].forEach((d) => d.sort(sortById));

        setDay1(d1);
        setDay2(d2);
        setDay3(d3);
        setDay4(d4);
        setDay5(d5);

        const initialDay = getActiveDayByDate();
        setActiveDay(initialDay);
        setCurrentDaySchedule([d1, d2, d3, d4, d5][initialDay] || []);
      } catch (err) {
        console.error("Schedule fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
     DAY SWITCH HANDLER
  ========================= */
  useEffect(() => {
    const dayMap = [day1, day2, day3, day4, day5];
    setCurrentDaySchedule(dayMap[activeDay] || []);
  }, [activeDay, day1, day2, day3, day4, day5]);

  /* =========================
     RENDER
  ========================= */
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/background_image/top.png')`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto py-16">
        <div className="text-center pt-12 flex flex-col items-center">
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold text-[#EEDCA5]">
            Schedule
          </h1>
          <p className="text-xl max-w-[40vw] text-[#f1c68a] mt-4">
            Check the day-wise schedule of events at Inter IIT Cultural Meet 8.0
          </p>
        </div>

        {/* Day Selector */}
        <div className="flex justify-center flex-wrap gap-6 my-10">
          {dates.map((d) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(d.day)}
              className={`px-6 py-2 rounded shadow-md transition-all ${
                activeDay === d.day
                  ? "bg-[#6b131f] text-white"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-5xl">
          {loading ? (
            <div className="text-center text-gray-300">
              Loading schedule…
            </div>
          ) : currentDaySchedule.length === 0 ? (
            <div className="text-center text-gray-300">
              Schedule not yet published.
            </div>
          ) : (
            <Timeline events={currentDaySchedule} />
          )}
        </div>
      </div>
    </div>
  );
}

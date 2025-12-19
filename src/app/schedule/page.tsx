"use client";

import React, { useEffect, useState } from "react";
import Timeline from "@/components/Timeline";
import { getSingleDoc } from "@/lib/firebaseFirestore";

/* =========================
   CONSTANTS
========================= */
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
   FIREBASE DOC SHAPE
========================= */
interface FirebaseScheduleDoc {
  data?: RawScheduleItem[];
}

/* =========================
   NORMALIZED SHAPE
========================= */
interface ScheduleEvent {
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
}

/* =========================
   HELPERS
========================= */
const extractScheduleArray = (raw: unknown): RawScheduleItem[] => {
  if (Array.isArray(raw)) return raw;

  if (
    raw &&
    typeof raw === "object" &&
    Array.isArray((raw as FirebaseScheduleDoc).data)
  ) {
    return (raw as FirebaseScheduleDoc).data!;
  }

  return [];
};

const getCurrentISTDate = (): string => {
  const now = new Date();
  const ist =
    now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600 * 1000;
  return new Date(ist).toISOString().split("T")[0];
};

/* =========================
   COMPONENT
========================= */
export default function Schedule() {
  const [currentDaySchedule, setCurrentDaySchedule] = useState<ScheduleEvent[]>(
    []
  );
  const [day1, setDay1] = useState<ScheduleEvent[]>([]);
  const [day2, setDay2] = useState<ScheduleEvent[]>([]);
  const [day3, setDay3] = useState<ScheduleEvent[]>([]);
  const [day4, setDay4] = useState<ScheduleEvent[]>([]);
  const [day5, setDay5] = useState<ScheduleEvent[]>([]);
  const [activeDay, setActiveDay] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

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

  const getActiveDayByDate = (): number => {
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
        const arr = extractScheduleArray(raw);

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
          if (typeof e.image === "string") {
            imageUrl = e.image.trim() || BG_IMAGE;
          } else if (e.image && typeof e.image === "object") {
            imageUrl = e.image.url || e.image.ref || BG_IMAGE;
          } else if (e.imageUrl) {
            imageUrl = e.imageUrl;
          }

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
              desc.length > 120 ? `${desc.slice(0, 120).trim()}...` : desc,
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

        const sortById = (a: ScheduleEvent, b: ScheduleEvent) =>
          a.id - b.id;

        [d1, d2, d3, d4, d5].forEach((d) => d.sort(sortById));

        setDay1(d1);
        setDay2(d2);
        setDay3(d3);
        setDay4(d4);
        setDay5(d5);

        const initialDay = getActiveDayByDate();
        setActiveDay(initialDay);
        setCurrentDaySchedule(
          [d1, d2, d3, d4, d5][initialDay] || []
        );
      } catch (error) {
        console.error("Schedule fetch failed:", error);
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

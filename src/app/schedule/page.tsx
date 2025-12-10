"use client";

import React, { useEffect, useState } from "react";
import Timeline from "@/components/Timeline";
import { getSingleDoc } from "@/lib/firebaseFirestore";

// Background fallback image
const BG_IMAGE = "/top2.jpg";

// --- RAW FIREBASE SHAPE ---
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

// --- NORMALIZED SHAPE ---
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
  const [activeDay, setActiveDay] = useState(1);
  const [loading, setLoading] = useState(true);

  const dates = [
    { day: 1, date: "2025-10-11" },
    { day: 2, date: "2025-10-12" },
    { day: 3, date: "2025-10-13" },
    { day: 4, date: "2025-10-14" },
  ];

  const getCurrentISTDate = () => {
    const now = new Date();
    const ms = now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 3600 * 1000;
    return new Date(ms).toISOString().split("T")[0];
  };

  const getActiveDayByDate = () => {
    const today = getCurrentISTDate();
    const match = dates.find((d) => d.date === today);
    return match ? match.day : 1;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const raw = await getSingleDoc("WebContents", "schedule");

        // Accept array or {data: []}
        let arr: RawScheduleItem[] = [];
        if (Array.isArray(raw)) arr = raw as RawScheduleItem[];
        else if (raw && Array.isArray((raw as { data: RawScheduleItem[] }).data))
          arr = (raw as { data: RawScheduleItem[] }).data;

        const d1: ScheduleEvent[] = [];
        const d2: ScheduleEvent[] = [];
        const d3: ScheduleEvent[] = [];
        const d4: ScheduleEvent[] = [];

        arr.forEach((e, idx) => {
          // --- id ---
          const rawId = e.id ?? e.Id ?? e.ID;
          const parsedId = Number(rawId);
          const id = Number.isFinite(parsedId) ? parsedId : idx + 1;

          // --- text fields ---
          const title = e.eventName ?? "Untitled";
          const desc = e.desc ?? "";
          const venue = e.venue ?? "Venue not specified";

          // --- image ---
          let imageUrl = BG_IMAGE;

          if (typeof e.image === "string") {
            imageUrl = e.image.trim() || BG_IMAGE;
          } else if (e.image && typeof e.image === "object") {
            imageUrl = e.image.url || e.image.ref || BG_IMAGE;
          } else if (e.imageUrl) {
            imageUrl = e.imageUrl;
          }

          // --- day ---
          const day = String(e.day ?? "1");

          // --- start & end strings ---
          const start = String(e.startTime ?? e.start ?? "");
          const end = String(e.endTime ?? e.end ?? "");

          // --- timestamp (for sorting internally if ever needed) ---
          let timestamp = new Date(0);
          if (typeof e.startTime === "number") {
            timestamp =
              e.startTime > 1e12
                ? new Date(e.startTime)
                : new Date(e.startTime * 1000);
          }

          const event: ScheduleEvent = {
            id,
            date: getCurrentISTDate(), // no separate date field in backend
            title,
            summary: desc.length > 120 ? desc.slice(0, 120).trim() + "..." : desc,
            imageUrl,
            details: `${desc}\nVenue: ${venue}`,
            start,
            end,
            timestamp,
            day,
            venue,
          };

          if (day === "1") d1.push(event);
          else if (day === "2") d2.push(event);
          else if (day === "3") d3.push(event);
          else if (day === "4") d4.push(event);
          else d1.push(event);
        });

        // Sort all by ID
        const sortById = (a: ScheduleEvent, b: ScheduleEvent) => a.id - b.id;
        d1.sort(sortById);
        d2.sort(sortById);
        d3.sort(sortById);
        d4.sort(sortById);

        setDay1(d1);
        setDay2(d2);
        setDay3(d3);
        setDay4(d4);

        const initial = getActiveDayByDate();
        setActiveDay(initial);

        setCurrentDaySchedule(
          initial === 1 ? d1 : initial === 2 ? d2 : initial === 3 ? d3 : d4
        );
      } catch (err) {
        console.error("Schedule fetch failed", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (activeDay === 1) setCurrentDaySchedule(day1);
    else if (activeDay === 2) setCurrentDaySchedule(day2);
    else if (activeDay === 3) setCurrentDaySchedule(day3);
    else if (activeDay === 4) setCurrentDaySchedule(day4);
  }, [activeDay, day1, day2, day3, day4]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('/images/background_image/top.png')`, backgroundAttachment: "fixed" }}
    >
      <div className="min-h-screen">
        <div className="container mx-auto py-16">
          <div className="text-center pt-12 flex flex-col items-center">
            <h1 className="font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEDCA5] p-5">
              SCHEDULE
            </h1>
            <p className="font-['Playfair_Display'] text-xl max-w-[40vw] text-[#f1c68a] mb-8 text-center">
              Check the day wise schedule of events happening at Inter IIT Cultural Meet 8.0.
            </p>
          </div>

          {/* Day Selector */}
          <div className="flex justify-center flex-wrap gap-6 mb-10">
            {dates.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`px-6 py-2 rounded-[5px] shadow-md transition-all duration-300 ${
                  activeDay === d.day
                    ? "bg-blue-500/90 text-white hover:bg-blue-600"
                    : "bg-white/20 text-white border border-white/20 hover:bg-white/30"
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="mx-auto max-w-5xl">
            {loading ? (
              <div className="text-center text-gray-300">Loading schedule…</div>
            ) : currentDaySchedule.length === 0 ? (
              <div className="text-center text-gray-300">Schedule not yet published.</div>
            ) : (
              <Timeline events={currentDaySchedule} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

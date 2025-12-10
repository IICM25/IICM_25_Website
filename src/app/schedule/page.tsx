"use client";

import React, { useEffect, useState } from "react";
import Timeline from "@/components/Timeline";
import { getSingleDoc } from "@/lib/firebaseFirestore";
import { Freehand } from "next/font/google";

// single global background image used for the whole page (fallback)
const BG_IMAGE = "/top2.jpg";

const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

type ScheduleEvent = {
  id: number;
  date: string;
  title: string;
  summary: string;
  imageUrl: string;
  details: string;
  start: string; // now string (shown as-is)
  end: string;   // now string (shown as-is)
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
  const [activeDay, setActiveDay] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const dates = [
    { day: 1, date: "2025-10-11" },
    { day: 2, date: "2025-10-12" },
    { day: 3, date: "2025-10-13" },
    { day: 4, date: "2025-10-14" },
  ];

  const getCurrentISTDate = () => {
    const now = new Date();
    const offsetMs = now.getTime() + now.getTimezoneOffset() * 60000 + 5.5 * 60 * 60 * 1000;
    const istDate = new Date(offsetMs);
    return istDate.toISOString().split("T")[0];
  };

  const getActiveDayByDate = () => {
    const today = getCurrentISTDate();
    const found = dates.find((d) => d.date === today);
    return found ? found.day : 1;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const raw = await getSingleDoc("WebContents", "schedule");

        let arr: any[] = [];
        if (Array.isArray(raw)) arr = raw;
        else if (raw && Array.isArray((raw as any).data)) arr = (raw as any).data;
        else arr = [];

        const d1: ScheduleEvent[] = [];
        const d2: ScheduleEvent[] = [];
        const d3: ScheduleEvent[] = [];
        const d4: ScheduleEvent[] = [];

        arr.forEach((e: any, idx: number) => {
          try {
            // id: might be string inside raw — coerce to numeric id for sorting
            const rawId = e.id ?? e.Id ?? e.ID ?? e.Id;
            const idNum = typeof rawId === "number" ? rawId : parseInt(String(rawId ?? ""), 10);
            const id = Number.isFinite(idNum) && !Number.isNaN(idNum) ? idNum : idx + 1;

            // title / description / venue
            const title = typeof e.eventName === "string" ? e.eventName : String(e.eventName ?? e.title ?? "Untitled");
            const desc = typeof e.desc === "string" ? e.desc : String(e.desc ?? "");
            const venue = typeof e.venue === "string" ? e.venue : String(e.venue ?? "Venue not specified");

            // image: raw sample shows image: { ref, url }
            let imageUrl = BG_IMAGE;
            if (e.image) {
              if (typeof e.image === "string" && e.image.trim()) imageUrl = e.image.trim();
              else if (typeof e.image === "object" && e.image !== null) {
                if (typeof e.image.url === "string" && e.image.url.trim()) imageUrl = e.image.url.trim();
                else if (typeof e.image.ref === "string" && e.image.ref.trim()) imageUrl = e.image.ref.trim();
              }
            } else if (typeof e.imageUrl === "string" && e.imageUrl.trim()) {
              imageUrl = e.imageUrl.trim();
            }

            // day: keep as string ("1"/"2"/"3"/"4")
            const day = typeof e.day === "string" ? e.day : String(e.day ?? "1");

            // start/end: treat as strings and show as-is
            const startStr = typeof e.startTime === "string" ? e.startTime : typeof e.start === "string" ? e.start : String(e.startTime ?? e.start ?? "");
            const endStr = typeof e.endTime === "string" ? e.endTime : typeof e.end === "string" ? e.end : String(e.endTime ?? e.end ?? "");

            // for timestamp field (keep a Date to satisfy ScheduleEvent type) — try to parse numeric if present else epoch 0
            let timestamp = new Date(0);
            const maybeNumericStart = e.startTime ?? e.start;
            if (typeof maybeNumericStart === "number") {
              timestamp = maybeNumericStart > 1e12 ? new Date(maybeNumericStart) : new Date(maybeNumericStart * 1000);
            }

            const se: ScheduleEvent = {
              id,
              date: getCurrentISTDate(), // no date provided in this flat schema — use current IST date for display
              title,
              summary: typeof desc === "string" ? (desc.length > 120 ? desc.substring(0, 120).trim() + "..." : desc) : "",
              imageUrl,
              details: desc + `\nVenue: ${venue}`,
              start: startStr,
              end: endStr,
              timestamp,
              day,
              venue,
            };

            if (day === "1") d1.push(se);
            else if (day === "2") d2.push(se);
            else if (day === "3") d3.push(se);
            else if (day === "4") d4.push(se);
            else d1.push(se);
          } catch (inner) {
            // skip malformed rows
            // console.warn("Malformed schedule row", inner);
          }
        });

        // Sort by numeric id ascending (as requested)
        const byId = (a: ScheduleEvent, b: ScheduleEvent) => a.id - b.id;
        d1.sort(byId);
        d2.sort(byId);
        d3.sort(byId);
        d4.sort(byId);

        setDay1(d1);
        setDay2(d2);
        setDay3(d3);
        setDay4(d4);

        const initial = getActiveDayByDate();
        setActiveDay(initial);
        if (initial === 1) setCurrentDaySchedule(d1);
        else if (initial === 2) setCurrentDaySchedule(d2);
        else if (initial === 3) setCurrentDaySchedule(d3);
        else if (initial === 4) setCurrentDaySchedule(d4);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (activeDay === 1) setCurrentDaySchedule(day1);
    else if (activeDay === 2) setCurrentDaySchedule(day2);
    else if (activeDay === 3) setCurrentDaySchedule(day3);
    else if (activeDay === 4) setCurrentDaySchedule(day4);
  }, [activeDay, day1, day2, day3, day4]);

  const changeDay = (day: number) => setActiveDay(day);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/images/background_image/top.png')`,
        backgroundAttachment: "fixed",
      }}
    >
      <div className="min-h-screen">
        <div className="container mx-auto py-16">
          <div className="text-center pt-12 flex flex-col items-center">
            <h1 className={`font-['Playfair_Display'] text-4xl sm:text-6xl md:text-7xl font-bold text-[#EEDCA5] p-5`}>
              SCHEDULE
            </h1>
            <p className="font-['Playfair_Display'] text-l sm:text-xl font-extrabold w-auto max-w-[40vw] text-[#f1c68a] mb-8">
              Check the day wise schedule of events happening at Inter IIT Cultural Meet 8.0 . Select a day to explore the timeline of activities, complete with event details and venues.
            </p>
          </div>

          <div className="flex justify-center flex-wrap gap-6 mb-10">
            {dates.map((d) => (
              <button
                key={d.day}
                onClick={() => changeDay(d.day)}
                className={`px-6 py-2 rounded-[5px] shadow-md transition-all duration-300 ${
                  activeDay === d.day
                    ? "bg-blue-500/90 text-white hover:bg-blue-600 hover:shadow-blue-500/40"
                    : "bg-white/20 text-white border border-white/20 hover:bg-white/30"
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>

          <div className="mx-auto max-w-5xl">
            {loading ? (
              <div className="text-center text-gray-300">Loading schedule…</div>
            ) : currentDaySchedule.length === 0 ? (
              <div className="text-center text-gray-300">Schedule not yet published — will be added soon.</div>
            ) : (
              <Timeline events={currentDaySchedule} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

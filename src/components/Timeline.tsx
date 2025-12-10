"use client";

import React from "react";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  summary: string;
  imageUrl: string;
  start: string;
  end: string;
  venue: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  fallbackImage?: string;
}

const formatTimeDisplay = (start: string, end: string) => {
  const s = start?.trim() ?? "";
  const e = end?.trim() ?? "";
  if (s && e) return `${s} - ${e}`;
  if (s) return s;
  if (e) return e;
  return "Time not specified";
};

const normalizeImageUrl = (url: string | undefined, fallback?: string) => {
  if (!url) return fallback ?? "/top2.jpg";
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("/")) return fallback ?? "/top2.jpg";
  return trimmed;
};

const BOX_WIDTH = "450px";   // SAME WIDTH LEFT + RIGHT
const BOX_HEIGHT = "300px";  // SAME HEIGHT LEFT + RIGHT

const Timeline: React.FC<TimelineProps> = ({ events, fallbackImage = "/top2.jpg" }) => {
  if (!events?.length) {
    return <div className="text-center text-gray-300">No events to show.</div>;
  }

  return (
    <div className="relative max-w-6xl mx-auto py-16 px-4">

      {/* Central vertical line */}
      <div
        className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[4px]
        bg-gradient-to-b from-blue-400 via-blue-600 to-blue-800"
      />

      <div className="space-y-20">
        {events.map((event, index) => {
          const isLeft = index % 2 === 0;
          const img = normalizeImageUrl(event.imageUrl, fallbackImage);
          const timeLabel = formatTimeDisplay(event.start, event.end);

          const textBlock = (
            <div
              style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}
              className="p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl 
                         shadow-lg flex flex-col justify-center text-center
                         transition duration-300 hover:scale-105 hover:shadow-blue-500/40"
            >
              <h3 className="text-[#FFD700] font-bold text-lg mb-2">{event.title}</h3>
              <p className="text-sm text-blue-200 mb-1">{timeLabel}</p>
              <p className="text-sm text-gray-200 mb-2">
                <span className="font-semibold">Venue:</span> {event.venue}
              </p>
              <p className="text-gray-100 break-words">{event.summary}</p>
            </div>
          );

          const imageBlock = (
            <div
              style={{ width: BOX_WIDTH, height: BOX_HEIGHT }}
              className="hidden lg:flex rounded-xl overflow-hidden items-center justify-center"
            >
              <img
                src={img}
                alt={event.title}
                className="w-full h-full object-cover rounded-xl shadow-md border-2 border-white/20
                           transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-blue-500/50 
                           hover:border-blue-400"
              />
            </div>
          );

          return (
            <div key={event.id} className="relative lg:flex lg:flex-row items-center">
              
              {/* LEFT SIDE BLOCK */}
              <div className="flex-1 flex justify-end pr-8">
                {/* On mobile show only text */}
                {isLeft ? textBlock : imageBlock}
              </div>

              {/* CENTER DOT + DATE */}
              <div className="flex flex-col items-center z-10">
                <div className="bg-blue-500 w-6 h-6 rounded-full border-4 border-blue-900 shadow-md" />
                {/* <div className="mt-2 text-xs text-gray-300">{event.date}</div> */}
              </div>

              {/* RIGHT SIDE BLOCK */}
              <div className="flex-1 flex justify-start pl-8">
                {isLeft ? imageBlock : textBlock}
              </div>

              {/* MOBILE MODE — show only text block FULL WIDTH */}
              <div className="lg:hidden mt-6">
                {textBlock}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;

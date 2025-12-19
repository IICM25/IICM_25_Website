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
interface RawSubmissionItem {
  Id?: string;
  event_name?: string;
  title?: string;
  deadline?: string;
  image?: {
    url?: string;
    ref?: string;
  };
}

/* =========================
   FIREBASE DOC SHAPE
========================= */
interface FirebaseSubmissionsDoc {
  data?: RawSubmissionItem[];
}

/* =========================
   NORMALIZED SHAPE (Timeline compatible)
========================= */
interface SubmissionEvent {
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
const extractSubmissionsArray = (raw: unknown): RawSubmissionItem[] => {
  if (Array.isArray(raw)) return raw;

  if (
    raw &&
    typeof raw === "object" &&
    Array.isArray((raw as FirebaseSubmissionsDoc).data)
  ) {
    return (raw as FirebaseSubmissionsDoc).data!;
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
export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<SubmissionEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  /* =========================
     FETCH + NORMALIZE
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const raw = await getSingleDoc("WebContents", "submission");
        const arr = extractSubmissionsArray(raw);

        const normalized: SubmissionEvent[] = arr.map((e, idx) => {
          const imageUrl =
            e.image?.url || e.image?.ref || BG_IMAGE;

          return {
            id: idx + 1,
            date: getCurrentISTDate(),
            title: e.event_name ?? "Submission",
            summary: e.title?.trim() || "Submission details",
            imageUrl,
            details: `Deadline: ${e.deadline ?? "Not specified"}`,
            start: e.deadline ?? "",
            end: "",
            timestamp: new Date(),
            day: "submission",
            venue: "Online",
          };
        });

        setSubmissions(normalized);
      } catch (error) {
        console.error("Submissions fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
            Submissions
          </h1>
          <p className="text-xl max-w-[40vw] text-[#f1c68a] mt-4">
            Important submission deadlines and instructions
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-5xl mt-16">
          {loading ? (
            <div className="text-center text-gray-300">
              Loading submissions…
            </div>
          ) : submissions.length === 0 ? (
            <div className="text-center text-gray-300">
              No submissions available.
            </div>
          ) : (
            <Timeline events={submissions} />
          )}
        </div>
      </div>
    </div>
  );
}

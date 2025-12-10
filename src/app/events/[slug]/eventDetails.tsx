"use client";

import { useState } from "react";
import eventsData from "./events.json" assert { type: "json" };
import { StaggeredFadeIn } from "../../../components/FadeIn";
import { Overview } from "../../../components/Overview";
import { Competitions } from "../../../components/Competitions";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

interface Inter {
  content: string;
  type: string;
}

interface Competition {
  name: string;
  desc: string;
}

interface EventData {
  Id: string;
  desc: Inter;
  flag: Inter;
  title: Inter;
}

export function EventDetails({ slug }: { slug: string }) {
  // get event data
  const data = eventsData as Record<string, { data: EventData[] }>;
  const event = data[slug];
  const details = Array.isArray(event?.data) ? event.data : [];

  const [openCompetition, setOpenCompetition] = useState<string | null>(null);

  const overview = details
    .filter((d) => d.flag.content === "overview")
    .map((d) => d.desc.content)
    .join("\n");

  const title = details
    .filter((d) => d.flag.content === "heading")
    .map((d) => d.title.content)
    .join("\n");

  const competitions: Competition[] = details
    .filter((d) => d.flag.content === "comp")
    .map((d) => ({
      name: d.title.content,
      desc: d.desc.content,
    }));

  const handleCompetitionClick = (competitionName: string) => {
    setOpenCompetition(competitionName);
    // optional: scroll to competitions section
    if (typeof window !== "undefined") {
      document
        .getElementById("competitions-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`max-w-5xl mx-auto ${poppins.className}`}>
      <div className="prose prose-invert prose-lg max-w-none text-white/80 bg-white/5">
        {/* Overview section */}
        <StaggeredFadeIn>
          <div className={poppins.className}>
            <Overview
              content={overview}
              title={title}
              handleCompetitionClick={handleCompetitionClick}
              competitions={competitions}
              slug={slug}
            />
          </div>
        </StaggeredFadeIn>

        {/* Competitions section below */}
        {competitions.length > 0 && (
          <StaggeredFadeIn>
            <section
              id="competitions-section"
              className={`${poppins.className} mt-5`}
            >
              <Competitions
                competitions={competitions}
                openCompetition={openCompetition}
                setOpenCompetition={setOpenCompetition}
              />
            </section>
          </StaggeredFadeIn>
        )}
      </div>
    </div>
  );
}

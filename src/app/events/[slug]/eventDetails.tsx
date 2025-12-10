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

const TABS = ["Overview", "Competitions"];

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
      {/* Tabs */}
     <div className="border-b border-black/20 flex justify-center flex-wrap gap-x-6 gap-y-3 mb-8">
  {visibleTabs.map((tab) => (
    <button
      key={tab}
      onClick={() => setActiveTab(tab)}
      className={`
        font-title whitespace-nowrap rounded-md
        px-3 py-1 sm:px-4 sm:py-2
        transition-colors duration-200
        ${poppins.className}
        ${activeTab === tab
          ? "text-white border-b-2 border-yellow-500 pb-2"
          : "text-gray-300 hover:text-red-400"}
        text-sm sm:text-base md:text-lg lg:text-2xl
        md:lg:text-3xl
        mx-1`}
      >
      {tab}
    </button>
  ))}
</div>


      {/* Tab Content */}
      <div className={`prose prose-invert prose-lg max-w-none text-white/80 text-2xl bg-white/5 ${poppins.className}`}>
        {activeTab === "Overview" && (
          <StaggeredFadeIn>
            <div className={'${poppins.className}'}>
              <Overview
                content={overview}
                title={title}
                handleCompetitionClick={handleCompetitionClick}
                competitions={competitions}
                slug={slug}
              />
            </div>
          </StaggeredFadeIn>
        )}

        {/* {activeTab === "Guidelines" && (
          <StaggeredFadeIn>
            <div className={poppins.className}>
              <Guidelines guidelines={guidelines} />
            </div>
          </StaggeredFadeIn>
        )} */}

        {activeTab === "Competitions" && (
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
            </div>
          </StaggeredFadeIn>
        )}

        {/* {activeTab === "Contacts" && (
          <StaggeredFadeIn>
            <div className={poppins.className}>
              <Contacts contacts={contacts} />
            </div>
          </StaggeredFadeIn>
        )} */}
      </div>
    </div>
  );
}

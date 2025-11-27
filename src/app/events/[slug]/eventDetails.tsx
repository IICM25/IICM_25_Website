"use client";

import { useState } from "react";
import eventsData from "./events.json" assert { type: "json" }; // ✅ Import local JSON
import { StaggeredFadeIn } from "../../../components/FadeIn";
import { Guidelines } from "../../../components/Guidelines";
import { Overview } from "../../../components/Overview";
import { Competitions } from "../../../components/Competitions";
import { Contacts } from "../../../components/Contacts";
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

const TABS = ["Overview", "Guidelines", "Competitions", "Contacts"];

export function EventDetails({ slug }: { slug: string }) {
  // 🔹 Get event data from local JSON
  const data = eventsData as Record<string, { data: EventData[] }>;
  const event = data[slug];
  const details = Array.isArray(event?.data) ? event.data : [];

  const [activeTab, setActiveTab] = useState(TABS[0]);
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

  const contacts = details
    .filter((d) => d.flag.content === "contacts")
    .map((d) => d.desc.content)
    .join("\n");

  const handleCompetitionClick = (competitionName: string) => {
    setActiveTab(TABS[2]);
    setOpenCompetition(competitionName);
  };

  const visibleTabs =
    slug === "MnM" ? TABS.filter((tab) => tab !== "Competitions") : TABS;

  return (
    <div className={`max-w-5xl mx-auto ${poppins.className}`}>
      {/* Tabs */}
      <div className="border-b border-black/20 flex justify-center space-x-6 sm:space-x-8 mb-8">
        {visibleTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-title text-md sm:!text-lg md:!text-3xl  pb-3 transition-colors duration-300 ${poppins.className} ${
              activeTab === tab
                ? "text-white border-b-2 border-yellow-500 "
                : "vintage-body hover:text-red"
            }`}
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

        {activeTab === "Guidelines" && (
          <StaggeredFadeIn>
            <div className={poppins.className}>
              <Guidelines />
            </div>
          </StaggeredFadeIn>
        )}

        {activeTab === "Competitions" && (
          <StaggeredFadeIn>
            <div className={poppins.className}>
              <Competitions
                competitions={competitions}
                openCompetition={openCompetition}
                setOpenCompetition={setOpenCompetition}
              />
            </div>
          </StaggeredFadeIn>
        )}

        {activeTab === "Contacts" && (
          <StaggeredFadeIn>
            <div className={poppins.className}>
              <Contacts contacts={contacts} />
            </div>
          </StaggeredFadeIn>
        )}
      </div>
    </div>
  );
}

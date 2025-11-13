'use client';

import React, { useState, useEffect } from 'react';
// import { getSingleDoc } from '@repo/firebase'; // removed (using local JSON)
import ContactCard from '../../components/layout/ContactCard';
import SideBar from '../../components/layout/SideBar';
import { Freehand } from "next/font/google";

// import JSON from src/data
import coreTeamJson from '@/data/coreTeam.json';

const freehand = Freehand({
  subsets: ["latin"],
  weight: "400",
});

interface Pic {
  ref: string;
  url: string;
}

interface TeamMember {
  Id: string;
  Name: string;
  Vertical: string;
  Email?: string;
  Phone?: string;
  LinkedIn?: string;
  Instagram?: string;
  Facebook?: string;
  Pic?: Pic | string;
}

// Normalizer: convert raw JSON member objects to TeamMember shape
const normalizeMember = (raw: unknown): TeamMember => {
  const r = (raw as Record<string, unknown>) || {};
  const get = (keys: string[]) => {
    for (const k of keys) if (k in r && r[k] != null) return r[k];
    return undefined;
  };

  const id = String(get(["Id", "id"]) ?? "");
  const name = String(get(["Name", "name"]) ?? "");
  const vertical = String(get(["Vertical", "vertical"]) ?? "");
  const email = get(["Email", "email"]) as string | undefined;
  const phone = get(["Phone", "phone"]) as string | undefined;
  const linkedIn = get(["LinkedIn", "linkedin"]) as string | undefined;
  const instagram = get(["Instagram", "instagram"]) as string | undefined;
  const facebook = get(["Facebook", "facebook"]) as string | undefined;

  // Pic can be object {url,..} or string path
  let picObj: Pic | undefined;
  const picRaw = get(["Pic", "pic", "imageUrl", "localImage"]);
  if (picRaw) {
    if (typeof picRaw === "string") {
      picObj = { ref: "", url: picRaw };
    } else if (typeof picRaw === "object") {
      const pr = picRaw as Record<string, unknown>;
      const url = (pr.url ?? pr.Url ?? pr.localImage ?? pr.imageUrl) as string | undefined;
      const ref = (pr.ref ?? pr.Ref ?? "") as string;
      if (url) picObj = { ref: String(ref), url: String(url) };
    }
  }

  return {
    Id: id,
    Name: name,
    Vertical: vertical,
    Email: email,
    Phone: phone,
    LinkedIn: linkedIn,
    Instagram: instagram,
    Facebook: facebook,
    // prefer returning a simple string URL for Pic to keep usage simple in UI
    Pic: picObj ? picObj.url : undefined,
  };
};

const Contact = () => {
  const [coreTeam, setCoreTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load data from imported JSON (single-year mode)
  useEffect(() => {
    setLoading(true);
    try {
      const json = coreTeamJson as unknown;

      if (Array.isArray(json)) {
        setCoreTeam((json as unknown[]).map(normalizeMember));
      } else if (json && typeof json === 'object') {
        const obj = json as Record<string, unknown>;
        // Prefer explicit 'current' keys, then fallback to any first array found
        let arr: unknown[] | undefined = undefined;
        if (Array.isArray(obj.current)) arr = obj.current as unknown[];
        else if (Array.isArray(obj.CURRENT)) arr = obj.CURRENT as unknown[];
        else {
          // find first array property on the object
          const val = Object.values(obj).find((v) => Array.isArray(v));
          if (Array.isArray(val)) arr = val as unknown[];
        }

        if (Array.isArray(arr)) setCoreTeam(arr.map(normalizeMember));
        else setCoreTeam([]);
      } else {
        setCoreTeam([]);
      }
    } catch (e) {
      console.error('Error loading team JSON:', e);
      setCoreTeam([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const sections = [
    { id: "t1", title: "Overall Coordinators" },
    { id: "t2", title: "Hospitality" },
    { id: "t3", title: "Events" },
    { id: "t4", title: "Finance" },
    { id: "t5", title: "Show Management" },
    { id: "t6", title: "Marketing" },
    { id: "t7", title: "Public Relations" },
    { id: "t8", title: "Media and Publicity" },
    { id: "t9", title: "Security" },
    { id: "t10", title: "Design" },
    { id: "t11", title: "Web and App" },
  ];

  // Helper: flexible matching between member.Vertical and section title/match
  const normalize = (s?: string) =>
    (s || "").toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();

  const stripPlural = (s: string) => (s.endsWith("s") ? s.slice(0, -1) : s);

  const matchesSection = (vertical?: string, sectionObj?: { title: string; match?: string }) => {
    if (!vertical || !sectionObj) return false;
    const mv0 = normalize(vertical);
    const target = sectionObj.match ?? sectionObj.title;
    const tv0 = normalize(target);

    if (!mv0 || !tv0) return false;

    if (mv0 === tv0) return true;
    if (mv0.includes(tv0) || tv0.includes(mv0)) return true;
    // compare first token (e.g., "Events & Competitions" vs "Events")
    const mvFirst = mv0.split(/\s|&/)[0];
    const tvFirst = tv0.split(/\s|&/)[0];
    if (mvFirst && tvFirst && (mvFirst === tvFirst)) return true;
    // singular/plural heuristic
    if (stripPlural(mv0) === stripPlural(tv0)) return true;

    return false;
  };

  return (
    <div className="min-h-screen bg-[#F3E1A0] bg-fixed text-gray-200 pt-24 relative">
      <div className="absolute inset-0 pointer-events-none"></div>

      <div className="relative flex">
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5 ml-5 fixed h-full">
          <SideBar />
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 md:p-10 w-full md:ml-[25%] lg:ml-[20%] relative z-10">
          <h1
            className={`vintage-title text-center text-6xl sm:text-7xl font-extrabold
                        text-white mb-12
                        [text-shadow:0_0_20px_rgba(255,192,203,0.9),0_0_40px_rgba(255,192,203,0.5)]`}
          >
            OUR CORE TEAM
          </h1>

          {/* single-year mode: no toggle */}

          {loading ? (
            <p className="text-center text-gray-400">Loading team...</p>
          ) : (
            sections.map((section) => (
              <div key={section.id} className="mb-20  text-center">
                <h2
                  id={section.id}
                  className="text-4xl font-extrabold mb-8 vintage-title
                             bg-gradient-to-r from-gray-400 via-gray-100 to-gray-400 
                             bg-clip-text text-transparent drop-shadow-lg
                             [text-shadow:0_1px_0_rgba(255,255,255,0.4)]"
                >
                  {section.title}
                </h2>

                {/* <div className="w-full flex justify-center">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {coreTeam
                      .filter((member) => matchesSection(member.Vertical, section))
                      .map((member, index) => (
                        <div
                          key={index}
                          className="w-full max-w-xs text-center 
                     transform transition-all hover:scale-105 hover:shadow-xl 
                     rounded-2xl p-4"
                        >
                          <ContactCard member={member} />
                        </div>
                      ))}
                  </div>
                </div> */}
                <div className="w-full flex justify-center">
  {(() => {
    const members = coreTeam.filter((member) =>
      matchesSection(member.Vertical, section)
    );

    // Determine grid class dynamically
    const gridColsClass =
      members.length >= 4
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        : members.length === 3
        ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
        : members.length === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : "grid-cols-1";

    return (
      <div
        className={`grid ${gridColsClass} gap-6 justify-items-center items-center justify-center`}
      >
        {members.map((member, index) => (
          <div
            key={index}
            className="w-full max-w-xs text-center transform transition-all hover:scale-105 hover:shadow-xl rounded-2xl p-4"
          >
            <ContactCard member={member} />
          </div>
        ))}
      </div>
    );
  })()}
</div>


              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

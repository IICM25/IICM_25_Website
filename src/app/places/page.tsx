// "use client";
// import MapClient from '@/components/MapClient';

// export default function MapPlacesPage() {
//   return <MapClient />;
// }
// src/app/places/page.tsx
import React from "react";
import MapClientLoader from "@/components/MapClientLoader";

export const metadata = {
  title: "Places",
};

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* other server-rendered layout/header/content can go here */}
      <MapClientLoader />
    </main>
  );
}

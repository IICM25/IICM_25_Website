// src/components/MapClientLoader.tsx
"use client";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

// dynamically import the heavy client-only map component (only in browser)
const MapClient = dynamic(() => import("@/components/MapClient"), { ssr: false });

export default function MapClientLoader() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading map…
        </div>
      }
    >
      <MapClient />
    </Suspense>
  );
}

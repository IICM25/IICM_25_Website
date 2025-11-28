// "use client";
// import L from 'leaflet';
// import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';

// type Category = 'eatery' | 'venue';

// interface Location {
//   id: number;
//   name: string;
//   lat: number;
//   lng: number;
//   category: Category;
// }
// type LatLngTuple = [number, number];

// const allLocations: Location[] = [
//   { id: 1, name: "Domino's Pizza (OAT)", lat: 26.505152, lng: 80.229454, category: 'eatery' },
//   { id: 2, name: "Cafe Coffee Day", lat: 26.511892, lng: 80.234242, category: 'eatery' },
//   { id: 3, name: "Mama Mio", lat: 26.50585, lng: 80.227325, category: 'eatery' },
//   { id: 4, name: "Zing Pizza & Cafe", lat: 26.504388, lng: 80.231044, category: 'eatery' },
//   { id: 5, name: "Naughty Blender", lat: 26.505143, lng: 80.229346, category: 'eatery' },
//   { id: 6, name: "Campus Restaurant", lat: 26.511568, lng: 80.236354, category: 'eatery' },
//   { id: 101, name: "OAT (Open Air Theatre)", lat: 26.505292, lng: 80.229046, category: 'venue' },
//   { id: 102, name: "New Core Lab", lat: 26.513511, lng: 80.231265, category: 'venue' },
//   { id: 103, name: "Students' Activity Centre (SAC)", lat: 26.512681, lng: 80.231265, category: 'venue' },
//   { id: 104, name: "Lecture Hall Complex (LHC)", lat: 26.509743, lng: 80.233861, category: 'venue' },
//   { id: 105, name: "Auditorium", lat: 26.506591, lng: 80.230721, category: 'venue' },
//   { id: 106, name: "Main Stadium", lat: 26.506725, lng: 80.240766, category: 'venue' },
// ];

// const IITK_CENTER: LatLngTuple = [26.512, 80.232];
// const proto = L.Icon.Default.prototype as unknown as Record<string, unknown>;
// if (proto._getIconUrl) {
//   // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//   delete proto._getIconUrl;
// }

// const defaultIcon = L.icon({
//   iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//   iconSize: [25, 41],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// const selectedIcon = L.icon({
//   iconUrl:
//     'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
//   shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
//   iconSize: [32, 50],
//   iconAnchor: [12, 41],
//   popupAnchor: [1, -34],
//   shadowSize: [41, 41],
// });

// const MapUpdater: React.FC<{ center: LatLngTuple; zoom: number }> = ({ center, zoom }) => {
//   const map = useMap();
//   map.flyTo(center, zoom, { duration: 1.5 });
//   return null;
// };

// interface MapComponentProps {
//   center: LatLngTuple;
//   zoom: number;
//   locations: Location[];
//   selectedId: number | undefined;
//   onMarkerClick: (location: Location) => void;
// }

// const MapComponent: React.FC<MapComponentProps> = ({
//   center,
//   zoom,
//   locations,
//   selectedId,
//   onMarkerClick,
// }) => {
//   return (
//     <MapContainer
//       center={center}
//       zoom={zoom}
//       scrollWheelZoom={true}
//       className="h-full w-full z-0 rounded-xl overflow-hidden"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <MapUpdater center={center} zoom={zoom} />

//       {locations.map((loc) => {
//         const iconToUse = loc.id === selectedId ? selectedIcon : defaultIcon;
//         return (
//           <Marker
//             key={loc.id}
//             position={[loc.lat, loc.lng]}
//             icon={iconToUse}
//             title={loc.name}
//             eventHandlers={{
//               click: () => onMarkerClick(loc),
//             }}
//           >
//             <Popup>
//               <strong>{loc.name}</strong>
//             </Popup>
//           </Marker>
//         );
//       })}
//     </MapContainer>
//   );
// };

// export default function MapClient() {
//   type LatLng = LatLngTuple;
//   const [activeTab, setActiveTab] = useState<Category>('eatery');
//   const initialLocation = allLocations.find((loc) => loc.category === 'eatery');
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation || null);

//   const currentLocationsList = useMemo(() => {
//     return allLocations.filter((loc) => loc.category === activeTab);
//   }, [activeTab]);

//   const currentTabTitle = activeTab === 'eatery' ? 'Eateries & Spots' : 'Events & Venues';
//   const currentTabEmoji = activeTab === 'eatery' ? '🍕' : '🏟️';

//   const mapCenter: LatLng = useMemo(() => {
//     if (selectedLocation) {
//       return [selectedLocation.lat, selectedLocation.lng];
//     }
//     const currentList = currentLocationsList;
//     if (currentList.length > 0) {
//       const sumLat = currentList.reduce((sum, loc) => sum + loc.lat, 0);
//       const sumLng = currentList.reduce((sum, loc) => sum + loc.lng, 0);
//       return [sumLat / currentList.length, sumLng / currentList.length];
//     }
//     return IITK_CENTER;
//   }, [selectedLocation, currentLocationsList]);

//   const handleLocationClick = (location: Location) => {
//     setSelectedLocation(location);
//     setActiveTab(location.category);
//   };

//   const handleTabChange = (newTab: Category) => {
//     if (newTab !== activeTab) {
//       setActiveTab(newTab);
//       const newList = allLocations.filter((loc) => loc.category === newTab);
//       setSelectedLocation(newList[0] || null);
//     }
//   };

//   return (
//     <div
//       className="flex flex-col md:flex-row h-screen p-4 md:p-8 
//                  bg-[url('/images/mid.png')] bg-cover bg-center bg-fixed 
//                  backdrop-blur-sm overflow-hidden "
//     >
//       <div className="w-full md:w-1/2 md:pr-4 mb-4 mt-16 md:mb-0 overflow-hidden">
//         <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl h-[50vh] md:h-full overflow-hidden transition-shadow duration-300">
//           <MapComponent
//             center={mapCenter}
//             zoom={18}
//             locations={allLocations}
//             selectedId={selectedLocation?.id}
//             onMarkerClick={handleLocationClick}
//           />
//         </div>
//       </div>

//       <div className="w-full md:w-1/2 md:pl-4 overflow-hidden mt-16">
//         <div className="bg-white/15  border-3 border-yellow-600 rounded-2xl shadow-2xl p-6 h-[45vh] md:h-full flex flex-col overflow-hidden">
//           <div className="flex mb-6 space-x-2">
//             <button
//               onClick={() => handleTabChange('eatery')}
//               className={`py-3 px-6 text-base md:text-lg font-extrabold transition-all duration-300 focus:outline-none flex-1 rounded-lg border-2
//                 ${activeTab === 'eatery'
//                   ? 'bg-cyan-600 text-white shadow-xl border-cyan-700'
//                   : 'text-cyan-700 bg-white hover:bg-cyan-50 border-cyan-400/50 hover:shadow-lg'
//                 }`
//             >
//               🍕 Eateries
//             </button>
//             <button
//               onClick={() => handleTabChange('venue')}
//               className={`py-3 px-6 text-base md:text-lg font-extrabold transition-all duration-300 focus:outline-none flex-1 rounded-xl border-2
//                 ${activeTab === 'venue'
//                   ? 'bg-cyan-600 text-white shadow-xl border-cyan-700'
//                   : 'text-cyan-700 bg-white hover:bg-cyan-50 border-cyan-400/50 hover:shadow-lg'
//                 }`}>
//               🏟️ Venues
//             </button>
//           </div>

//           <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 border-b pb-2">
//             {currentTabEmoji} {currentTabTitle}
//           </h2>

//           <div className="overflow-y-auto flex-grow pr-2 space-y-3 md:space-y-4 mt-4">
//             <ul className="space-y-3">
//               {currentLocationsList.map((location) => (
//                 <li
//                   key={location.id}
//                   className={`
//                     p-4 rounded-4xl cursor-pointer shadow-lg 
//                     transition-all duration-300 ease-in-out transform 
//                     font-semibold text-base md:text-lg text-center mx-auto max-w-sm
//                     ${
//                       location.id === selectedLocation?.id
//                         ? 'bg-cyan-600 text-white ring-4 ring-cyan-400/50 scale-[1.02] shadow-2xl'
//                         : 'bg-cyan-50 text-gray-800 hover:bg-cyan-500 hover:text-white hover:shadow-xl'
//                     }
//                   `}
//                   onClick={() => handleLocationClick(location)}
//                 >
//                   {location.name}
//                 </li>
//               ))}
//               {currentLocationsList.length === 0 && (
//                 <li className="text-gray-500 p-4 text-center border border-gray-200 rounded-xl">
//                     No locations available in this category.
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // src/components/MapClient.tsx
// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
// import type { Icon as LeafletIcon, IconOptions } from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { getAllDocs } from "@/lib/firebaseFirestore";

// type Category = "eatery" | "venue";

// interface Location {
//   id: number;
//   name: string;
//   lat: number;
//   lng: number;
//   category: Category;
// }
// type LatLngTuple = [number, number];



// const defaultLocations: Location[] = [
//   { id: 1, name: "Domino's Pizza (OAT)", lat: 26.505152, lng: 80.229454, category: "eatery" },
//   { id: 2, name: "Cafe Coffee Day", lat: 26.511892, lng: 80.234242, category: "eatery" },
//   { id: 3, name: "Mama Mio", lat: 26.50585, lng: 80.227325, category: "eatery" },
//   { id: 4, name: "Zing Pizza & Cafe", lat: 26.504388, lng: 80.231044, category: "eatery" },
//   { id: 5, name: "Naughty Blender", lat: 26.505143, lng: 80.229346, category: "eatery" },
//   { id: 6, name: "Campus Restaurant", lat: 26.511568, lng: 80.236354, category: "eatery" },
//   { id: 101, name: "OAT (Open Air Theatre)", lat: 26.505292, lng: 80.229046, category: "venue" },
//   { id: 102, name: "New Core Lab", lat: 26.513511, lng: 80.231265, category: "venue" },
//   { id: 103, name: "Students' Activity Centre (SAC)", lat: 26.512681, lng: 80.231265, category: "venue" },
//   { id: 104, name: "Lecture Hall Complex (LHC)", lat: 26.509743, lng: 80.233861, category: "venue" },
//   { id: 105, name: "Auditorium", lat: 26.506591, lng: 80.230721, category: "venue" },
//   { id: 106, name: "Main Stadium", lat: 26.506725, lng: 80.240766, category: "venue" },
// ];

// const IITK_CENTER: LatLngTuple = [26.512, 80.232];

// const MapUpdater: React.FC<{ center: LatLngTuple; zoom: number }> = ({ center, zoom }) => {
//   const map = useMap();
//   map.flyTo(center, zoom, { duration: 1.5 });
//   return null;
// };

// interface MapComponentProps {
//   center: LatLngTuple;
//   zoom: number;
//   locations: Location[];
//   selectedId: number | undefined;
//   onMarkerClick: (location: Location) => void;
//   defaultIcon: LeafletIcon;
//   selectedIcon: LeafletIcon;
// }

// const MapComponent: React.FC<MapComponentProps> = ({
//   center,
//   zoom,
//   locations,
//   selectedId,
//   onMarkerClick,
//   defaultIcon,
//   selectedIcon,
// }) => {
//   return (
//     <MapContainer
//       center={center}
//       zoom={zoom}
//       scrollWheelZoom={true}
//       className="h-full w-full z-0 rounded-xl overflow-hidden"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <MapUpdater center={center} zoom={zoom} />

//       {locations.map((loc) => {
//         const iconToUse = loc.id === selectedId ? selectedIcon : defaultIcon;
//         return (
//           <Marker
//             key={loc.id}
//             position={[loc.lat, loc.lng] as [number, number]}
//             icon={iconToUse}
//             title={loc.name}
//             eventHandlers={{
//               click: () => onMarkerClick(loc),
//             }}
//           >
//             <Popup>
//               <strong>{loc.name}</strong>
//             </Popup>
//           </Marker>
//         );
//       })}
//     </MapContainer>
//   );
// };

// export default function MapClient() {
//   type LatLng = LatLngTuple;
//   const [activeTab, setActiveTab] = useState<Category>("eatery");
//   const [locations, setLocations] = useState<Location[]>(defaultLocations);
//   const initialLocation = locations.find((loc) => loc.category === "eatery");
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(initialLocation || null);

//   const currentLocationsList = useMemo(() => {
//     return locations.filter((loc) => loc.category === activeTab);
//   }, [activeTab, locations]);

//   const currentTabTitle = activeTab === "eatery" ? "Eateries & Spots" : "Events & Venues";
//   const currentTabEmoji = activeTab === "eatery" ? "" : "";

//   const mapCenter: LatLng = useMemo(() => {
//     if (selectedLocation) {
//       return [selectedLocation.lat, selectedLocation.lng];
//     }
//     const currentList = currentLocationsList;
//     if (currentList.length > 0) {
//       const sumLat = currentList.reduce((sum, loc) => sum + loc.lat, 0);
//       const sumLng = currentList.reduce((sum, loc) => sum + loc.lng, 0);
//       return [sumLat / currentList.length, sumLng / currentList.length];
//     }
//     return IITK_CENTER;
//   }, [selectedLocation, currentLocationsList]);

//   const handleLocationClick = (location: Location) => {
//     setSelectedLocation(location);
//     setActiveTab(location.category);
//   };

//   const handleTabChange = (newTab: Category) => {
//     if (newTab !== activeTab) {
//       setActiveTab(newTab);
//       const newList = locations.filter((loc) => loc.category === newTab);
//       setSelectedLocation(newList[0] || null);
//     }
//   };

//   // Fetch places from Firestore (client only) and merge/replace the default list.
//   useEffect(() => {
//     let mounted = true;
//     const fetchPlaces = async () => {
//       try {
//         const docs = await getAllDocs("places");
//         if (!mounted || !docs) return;

//         const parsed: Location[] = docs
//           .map((d) => {
//             const data = d.data || {};
//             const id = Number(d.uid) || d.uid || undefined;
//             const name = (data.name || data.title || data.Name) as string | undefined;
//             const lat = Number(data.lat ?? data.latitude ?? data.Lat);
//             const lng = Number(data.lng ?? data.longitude ?? data.Lng);
//             const category = (data.category || data.type || (data.kind as string) || "venue") as Category;
//             if (!name || Number.isNaN(lat) || Number.isNaN(lng)) return null;
//             return { id: id as number, name, lat, lng, category } as Location;
//           })
//           .filter((x): x is Location => x !== null && typeof x !== "undefined");

//         if (parsed.length > 0) {
//           setLocations(parsed);
//           setSelectedLocation(parsed.find((loc) => loc.category === activeTab) ?? parsed[0] ?? null);
//         }
//       } catch (err) {
//         // keep default locations on failure
//         // eslint-disable-next-line no-console
//         console.log("Mounted status:", mounted);
//         console.error("Failed to fetch places from Firestore:", err);
//       }
//     };

//     fetchPlaces();
//     return () => {
//       mounted = false;
//     };
//   }, []);

//   // icons (created on client only)
//   const [defaultIcon, setDefaultIcon] = useState<LeafletIcon | null>(null);
//   const [selectedIcon, setSelectedIcon] = useState<LeafletIcon | null>(null);

//   useEffect(() => {
//     if (typeof window === "undefined") return;

//     // dynamic import of leaflet so module evaluation happens only in browser
//     import("leaflet")
//       .then((L) => {
//         // remove prototype _getIconUrl if present (prevents broken default icon lookups)
//         const proto = (L.Icon.Default.prototype as unknown) as Record<string, unknown>;
//         if (proto && proto._getIconUrl) {
//           // delete runtime-only property
//           // eslint-disable-next-line @typescript-eslint/no-unused-expressions
//           delete proto._getIconUrl;
//         }

//         const iconOpts = (opts: IconOptions) => L.icon(opts);

//         const dIcon = iconOpts({
//           iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
//           shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//           iconSize: [25, 41],
//           iconAnchor: [12, 41],
//           popupAnchor: [1, -34],
//           shadowSize: [41, 41],
//         });

//         const sIcon = iconOpts({
//           iconUrl:
//             "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
//           shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
//           iconSize: [32, 50],
//           iconAnchor: [12, 41],
//           popupAnchor: [1, -34],
//           shadowSize: [41, 41],
//         });

//         setDefaultIcon(dIcon);
//         setSelectedIcon(sIcon);
//       })
//       .catch((err) => {
//         // handle failure to load leaflet in very constrained environments
//         // keep icons null so we render the loading fallback below
//         // eslint-disable-next-line no-console
//         console.error("Failed to load leaflet:", err);
//       });
//   }, []);

//   // don't render the map until icons are ready (prevents SSR/CSR mismatch & leaflet runtime errors)
//   if (!defaultIcon || !selectedIcon) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div>Loading map…</div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className="flex flex-col md:flex-row min-h-screen p-4 md:p-8 
//                  bg-[url('/Elements/top2.png')] bg-cover bg-center bg-fixed 
//                   "
//     >
//       <div className="w-full md:w-1/2 md:pr-4 mb-4 mt-24 md:mb-0 overflow-hidden">
//         <div className="bg-white/90  rounded-xl shadow-2xl h-[50vh] md:h-full overflow-hidden transition-shadow duration-300">
//           <MapComponent
//             center={mapCenter}
//             zoom={18}
//             locations={locations}
//             selectedId={selectedLocation?.id}
//             onMarkerClick={handleLocationClick}
//             defaultIcon={defaultIcon}
//             selectedIcon={selectedIcon}
//           />
//         </div>
//       </div>

//       <div className="w-full md:w-1/2 md:pl-4 overflow-hidden mt-16">
//         <div className="bg-white/15  border-3 border-yellow-600 rounded-2xl shadow-2xl p-6 min-h-[45vh] md:h-full flex flex-col overflow-hidden">
//           <div className="flex mb-6 space-x-2">
//             <button
//               onClick={() => handleTabChange("eatery")}
//               className={`py-3 px-6 text-base md:text-lg font-extrabold transition-all duration-300 focus:outline-none flex-1 rounded-lg border-2
//                 ${activeTab === "eatery"
//                   ? "bg-cyan-600 text-white shadow-xl border-cyan-700"
//                   : "text-cyan-700 bg-white hover:bg-cyan-50 border-cyan-400/50 hover:shadow-lg"
//                 }`}
//             >
//               Eateries
//             </button>
//             <button
//               onClick={() => handleTabChange("venue")}
//               className={`py-3 px-6 text-base md:text-lg font-extrabold transition-all duration-300 focus:outline-none flex-1 rounded-xl border-2
//                 ${activeTab === "venue"
//                   ? "bg-cyan-600 text-white shadow-xl border-cyan-700"
//                   : "text-cyan-700 bg-white hover:bg-cyan-50 border-cyan-400/50 hover:shadow-lg"
//                 }`}
//             >
//               Venues
//             </button>
//           </div>

//           <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 border-b pb-2">
//             {currentTabEmoji} {currentTabTitle}
//           </h2>

//           <div className="overflow-y-auto flex-grow pr-2 space-y-3 md:space-y-4 mt-4">
//             <ul className="space-y-3">
//               {currentLocationsList.map((location) => (
//                 <li
//                   key={location.id}
//                   className={`
//                     p-4 rounded-4xl cursor-pointer shadow-lg 
//                     transition-all duration-300 ease-in-out transform 
//                     font-semibold text-base md:text-lg text-center mx-auto max-w-sm
//                     ${
//                       location.id === selectedLocation?.id
//                         ? "bg-cyan-600 text-white ring-4 ring-cyan-400/50 scale-[1.02] shadow-2xl"
//                         : "bg-cyan-50 text-gray-800 hover:bg-cyan-500 hover:text-white hover:shadow-xl"
//                     }
//                   `}
//                   onClick={() => handleLocationClick(location)}
//                 >
//                   {location.name}
//                 </li>
//               ))}
//               {currentLocationsList.length === 0 && (
//                 <li className="text-gray-500 p-4 text-center border border-gray-200 rounded-xl">
//                   No locations available in this category.
//                 </li>
//               )}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }"use client";

import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import type { Icon as LeafletIcon, IconOptions } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getSingleDoc } from "@/lib/firebaseFirestore";

type Category = "eatery" | "venue";

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: Category;
}
type LatLngTuple = [number, number];

// Minimal fallback if fetch fails — won't be shown if fetch returns valid data
const fallbackLocations: Location[] = [
  { id: 1, name: "Domino's Pizza (OAT)", lat: 26.505152, lng: 80.229454, category: "eatery" },
  { id: 101, name: "OAT (Open Air Theatre)", lat: 26.505292, lng: 80.229046, category: "venue" },
];

const IITK_CENTER: LatLngTuple = [26.512, 80.232];

const MapUpdater: React.FC<{ center: LatLngTuple; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.flyTo(center, zoom, { duration: 1.5 });
  return null;
};

interface MapComponentProps {
  center: LatLngTuple;
  zoom: number;
  locations: Location[];
  selectedId: number | undefined;
  onMarkerClick: (location: Location) => void;
  defaultIcon: LeafletIcon;
  selectedIcon: LeafletIcon;
}

const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  locations,
  selectedId,
  onMarkerClick,
  defaultIcon,
  selectedIcon,
}) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-full w-full z-0 rounded-xl overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater center={center} zoom={zoom} />

      {locations.map((loc) => {
        const iconToUse = loc.id === selectedId ? selectedIcon : defaultIcon;
        return (
          <Marker
            key={loc.id}
            position={[loc.lat, loc.lng] as [number, number]}
            icon={iconToUse}
            title={loc.name}
            eventHandlers={{
              click: () => onMarkerClick(loc),
            }}
          >
            <Popup>
              <strong>{loc.name}</strong>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default function MapClient() {
  type LatLng = LatLngTuple;

  // Start with empty array — we will populate from Firestore.
  const [activeTab, setActiveTab] = useState<Category>("eatery");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(true);

  const currentLocationsList = useMemo(() => {
    return locations.filter((loc) => loc.category === activeTab);
  }, [activeTab, locations]);

  const currentTabTitle = activeTab === "eatery" ? "Eateries & Spots" : "Events & Venues";

  const mapCenter: LatLng = useMemo(() => {
    if (selectedLocation) {
      return [selectedLocation.lat, selectedLocation.lng];
    }
    const currentList = currentLocationsList;
    if (currentList.length > 0) {
      const sumLat = currentList.reduce((sum, loc) => sum + loc.lat, 0);
      const sumLng = currentList.reduce((sum, loc) => sum + loc.lng, 0);
      return [sumLat / currentList.length, sumLng / currentList.length];
    }
    return IITK_CENTER;
  }, [selectedLocation, currentLocationsList]);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    setActiveTab(location.category);
  };

  const handleTabChange = (newTab: Category) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
      const newList = locations.filter((loc) => loc.category === newTab);
      setSelectedLocation(newList[0] || null);
    }
  };

  // ---------- Fetch places: minimal mapping for your `{ data: [...] }` shape ----------
  const activeTabRef = React.useRef<Category>(activeTab);
  useEffect(() => {
    activeTabRef.current = activeTab;
  }, [activeTab]);

  useEffect(() => {
    let mounted = true;

    const fetchPlaces = async () => {
      setIsLoadingPlaces(true);
      try {
        const data = await getSingleDoc("WebContents", "places");
        // Expect: { data: Array(...) }
        if (!mounted || !data || !Array.isArray((data as any).data)) {
          // fallback: use minimal built-in list so map still shows something
          if (mounted) {
            setLocations(fallbackLocations);
            setSelectedLocation(fallbackLocations.find((l) => l.category === activeTabRef.current) ?? fallbackLocations[0] ?? null);
            setIsLoadingPlaces(false);
          }
          return;
        }

        const rawItems: unknown[] = (data as any).data;

        const parsed: Location[] = rawItems
          .map((rec: unknown, idx: number) => {
            if (typeof rec !== "object" || rec === null) return null;
            const r = rec as Record<string, unknown>;

            const name = typeof r.name === "string" ? r.name : undefined;
            const lat = typeof r.lat === "number" ? r.lat : typeof r.lat === "string" && r.lat !== "" ? Number(r.lat) : undefined;
            const lng = typeof r.lng === "number" ? r.lng : typeof r.lng === "string" && r.lng !== "" ? Number(r.lng) : undefined;
            const category = (r.category === "eatery" || r.category === "venue") ? (r.category as Category) : undefined;

            if (!name || lat === undefined || lng === undefined || !category) return null;

            // numeric id generation: index+1 + small offset to avoid colliding with other ids
            const id = idx + 1;

            return { id, name, lat, lng, category } as Location;
          })
          .filter((x): x is Location => x !== null);

        // optional console for debug (remove if you don't want logs)
        console.log("Parsed Places:", parsed);

        if (mounted && parsed.length > 0) {
          setLocations(parsed);
          setSelectedLocation(parsed.find((l) => l.category === activeTabRef.current) ?? parsed[0] ?? null);
        } else if (mounted) {
          // no valid rows — fall back
          setLocations(fallbackLocations);
          setSelectedLocation(fallbackLocations.find((l) => l.category === activeTabRef.current) ?? fallbackLocations[0] ?? null);
        }
      } catch (err) {
        console.error("Failed to fetch places:", err);
        if (mounted) {
          setLocations(fallbackLocations);
          setSelectedLocation(fallbackLocations.find((l) => l.category === activeTabRef.current) ?? fallbackLocations[0] ?? null);
        }
      } finally {
        if (mounted) setIsLoadingPlaces(false);
      }
    };

    fetchPlaces();

    return () => {
      mounted = false;
    };
  }, []); // stable deps

  // icons (created on client only)
  const [defaultIcon, setDefaultIcon] = useState<LeafletIcon | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<LeafletIcon | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    import("leaflet")
      .then((L) => {
        const proto = (L.Icon.Default.prototype as unknown) as Record<string, unknown>;
        if (proto && proto._getIconUrl) {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          delete proto._getIconUrl;
        }

        const iconOpts = (opts: IconOptions) => L.icon(opts);

        const dIcon = iconOpts({
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        const sIcon = iconOpts({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
          iconSize: [32, 50],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        setDefaultIcon(dIcon);
        setSelectedIcon(sIcon);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Failed to load leaflet:", err);
      });
  }, []);

  // don't render until icons are ready
  if (!defaultIcon || !selectedIcon) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Loading map…</div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen p-4 md:p-8 
                 bg-[url('/Elements/top2.png')] bg-cover bg-center bg-fixed 
                  "
    >
      <div className="w-full md:w-1/2 md:pr-4 mb-4 mt-24 md:mb-0 overflow-hidden">
        <div className="bg-white/90  rounded-xl shadow-2xl h-[50vh] md:h-full overflow-hidden transition-shadow duration-300">
          <MapComponent
            center={mapCenter}
            zoom={18}
            locations={locations}
            selectedId={selectedLocation?.id}
            onMarkerClick={handleLocationClick}
            defaultIcon={defaultIcon}
            selectedIcon={selectedIcon}
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 md:pl-4 overflow-hidden mt-16">
        <div className="bg-white/15  border-3 border-yellow-600 rounded-2xl shadow-2xl p-6 min-h-[45vh] md:h-full flex flex-col overflow-hidden">
          <div className="flex mb-6 space-x-2">
            <button
              onClick={() => handleTabChange("eatery")}
              className={`py-3 px-6 text-base md:text-lg font-extrabold transition-all duration-300 focus:outline-none flex-1 rounded-lg border-2
                ${activeTab === "eatery"
                  ? "bg-cyan-600 text-white shadow-xl border-cyan-700"
                  : "text-cyan-700 bg-white hover:bg-cyan-50 border-cyan-400/50 hover:shadow-lg"
                }`}
            >
              Eateries
            </button>
            <button
              onClick={() => handleTabChange("venue")}
              className={`py-3 px-6 text-base md:text-lg font-extrabold transition-all duration-300 focus:outline-none flex-1 rounded-xl border-2
                ${activeTab === "venue"
                  ? "bg-cyan-600 text-white shadow-xl border-cyan-700"
                  : "text-cyan-700 bg-white hover:bg-cyan-50 border-cyan-400/50 hover:shadow-lg"
                }`}
            >
              Venues
            </button>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-gray-900 border-b pb-2">
            {currentTabTitle}
          </h2>

          <div className="overflow-y-auto flex-grow pr-2 space-y-3 md:space-y-4 mt-4">
            {isLoadingPlaces ? (
              <div className="text-center p-6">Loading locations…</div>
            ) : (
              <ul className="space-y-3">
                {currentLocationsList.map((location) => (
                  <li
                    key={location.id}
                    className={`
                      p-4 rounded-4xl cursor-pointer shadow-lg 
                      transition-all duration-300 ease-in-out transform 
                      font-semibold text-base md:text-lg text-center mx-auto max-w-sm
                      ${
                        location.id === selectedLocation?.id
                          ? "bg-cyan-600 text-white ring-4 ring-cyan-400/50 scale-[1.02] shadow-2xl"
                          : "bg-cyan-50 text-gray-800 hover:bg-cyan-500 hover:text-white hover:shadow-xl"
                      }
                    `}
                    onClick={() => handleLocationClick(location)}
                  >
                    {location.name}
                  </li>
                ))}
                {currentLocationsList.length === 0 && (
                  <li className="text-gray-500 p-4 text-center border border-gray-200 rounded-xl">
                    No locations available in this category.
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

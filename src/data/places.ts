// data/places.ts

export interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export const places: Location[] = [
  { id: 1, name: "City Park", lat: 34.0522, lng: -118.2437 },
  { id: 2, name: "Central Library", lat: 34.0505, lng: -118.2520 },
  { id: 3, name: "Tech Hub Office", lat: 34.0450, lng: -118.2580 },
  { id: 4, name: "Art Museum", lat: 34.0550, lng: -118.2350 },
  // Add more places...
];
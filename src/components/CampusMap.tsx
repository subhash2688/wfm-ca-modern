"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { WFM_CAMPUSES, type CampusData } from "@/lib/data/campuses";

const COLOR_HEX: Record<string, string> = {
  green:  "#16a34a",
  blue:   "#2563eb",
  purple: "#9333ea",
  red:    "#dc2626",
  orange: "#ea580c",
  yellow: "#ca8a04",
  teal:   "#0d9488",
  amber:  "#d97706",
};

function pinIcon(color: string) {
  const hex = COLOR_HEX[color] ?? "#1A3D5C";
  return L.divIcon({
    className: "wfm-pin",
    html: `
      <div style="
        width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
        background: ${hex}; transform: rotate(-45deg);
        border: 3px solid #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center;
      ">
        <div style="
          width: 8px; height: 8px; border-radius: 50%; background: #fff;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });
}

interface Props {
  campuses?: CampusData[];
  height?: string;
}

export default function CampusMap({ campuses = WFM_CAMPUSES, height = "500px" }: Props) {
  const center: [number, number] = [37.45, -121.95];

  return (
    <div style={{ height, width: "100%" }} className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
      <MapContainer
        center={center}
        zoom={9}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {campuses.map((c) => (
          <Marker key={c.name} position={[c.lat, c.lng]} icon={pinIcon(c.color)}>
            <Popup>
              <div className="font-sans">
                <div className="font-serif text-base font-semibold text-[#1A3D5C]">
                  {c.name}
                </div>
                <div className="mt-1 text-sm text-stone-600">
                  {c.city} · {c.region}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

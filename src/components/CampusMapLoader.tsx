"use client";

import dynamic from "next/dynamic";

const CampusMap = dynamic(() => import("./CampusMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: "500px" }}
      className="flex w-full items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-stone-400"
    >
      Loading map…
    </div>
  ),
});

export default CampusMap;

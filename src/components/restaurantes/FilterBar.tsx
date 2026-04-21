"use client";

import { useRouter, usePathname } from "next/navigation";

type FilterMode = "latest" | "featured" | "adminPick" | "colonia" | "platillo";

const FILTER_TABS: { value: FilterMode; label: string }[] = [
  // { value: "latest", label: "Últimos" },
  // { value: "featured", label: "Destacados" },
  { value: "adminPick", label: "Del chef 10/10" },
  { value: "colonia", label: "Por colonia" },
  { value: "platillo", label: "Por platillo" },
];

// Static lists — replace with props from server once Firebase is connected
const COLONIAS = [
  { ref: "santa-tere", name: "Santa Tere" },
  { ref: "chapultepec", name: "Chapultepec" },
  { ref: "america", name: "América" },
  { ref: "del-fresno", name: "Del Fresno" },
];

const PLATILLOS = [
  "Torta ahogada",
  "Tacos",
  // "Birria",
  // "Pozole",
  // "Mariscos",
  // "Cenadurias",
];

type Props = {
  activeFilter: FilterMode;
  activeColonia?: string;
  activePlatillo?: string;
};

export default function FilterBar({
  activeFilter,
  activeColonia,
  activePlatillo,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function push(filter: FilterMode, extra?: Record<string, string>) {
    const params = new URLSearchParams({ filter, ...extra });
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="space-y-3">
      {/* Main filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTER_TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => push(value)}
            className={`px-4 py-2 rounded-full text-sm font-sans font-medium transition-colors duration-150 ${
              activeFilter === value
                ? "bg-chili text-white"
                : "border border-adobe/30 text-adobe hover:border-chili hover:text-chili"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Colonia sub-filters */}
      {activeFilter === "colonia" && (
        <div className="flex gap-2 flex-wrap">
          {COLONIAS.map(({ ref, name }) => (
            <button
              key={ref}
              onClick={() => push("colonia", { colonia: ref })}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors duration-150 ${
                activeColonia === ref
                  ? "bg-avocado text-white"
                  : "border border-avocado/40 text-avocado hover:bg-avocado/10"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      {/* Platillo sub-filters */}
      {activeFilter === "platillo" && (
        <div className="flex gap-2 flex-wrap">
          {PLATILLOS.map((p) => (
            <button
              key={p}
              onClick={() => push("platillo", { platillo: p })}
              className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-colors duration-150 ${
                activePlatillo === p
                  ? "bg-mango text-carbon"
                  : "border border-mango/40 text-adobe hover:bg-mango/10"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

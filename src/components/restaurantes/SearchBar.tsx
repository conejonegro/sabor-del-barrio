"use client";

import { useRouter, usePathname } from "next/navigation";
import { useRef } from "react";

type Props = {
  defaultValue?: string;
};

export default function SearchBar({ defaultValue = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (value) params.set("q", value);
      router.push(`${pathname}${value ? `?${params.toString()}` : ""}`);
    }, 300);
  }

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-adobe/50 pointer-events-none"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        type="search"
        defaultValue={defaultValue}
        onChange={handleChange}
        placeholder="Buscar por nombre, platillo o colonia…"
        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-adobe/20 bg-white font-sans text-carbon text-sm placeholder:text-adobe/40 focus:outline-none focus:border-chili focus:ring-1 focus:ring-chili transition-colors"
      />
    </div>
  );
}

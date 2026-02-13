"use client";

import { useState, useEffect } from "react";

interface Network {
  id: string;
  name: string;
  color: string;
}

const NETWORKS: Network[] = [
  { id: "ethereum", name: "Ethereum", color: "#627EEA" },
  { id: "base", name: "Base", color: "#0052FF" },
  { id: "arbitrum", name: "Arbitrum", color: "#2D374B" },
  { id: "polygon", name: "Polygon", color: "#8247E5" },
  { id: "optimism", name: "Optimism", color: "#FF0420" },
];

export function NetworkSelector() {
  const [selected, setSelected] = useState<Network>(NETWORKS[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-2 rounded-sm border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-gray-200 transition-colors hover:border-gray-600 hover:bg-gray-800"
      >
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: selected.color }}
        />
        <span className="hidden sm:inline">{selected.name}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-20 mt-2 w-44 rounded-md border border-gray-700 bg-gray-900 py-1 shadow-lg">
            {NETWORKS.map((network) => (
              <button
                key={network.id}
                onClick={() => {
                  setSelected(network);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-gray-200 transition-colors hover:bg-gray-800"
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: network.color }}
                />
                {network.name}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

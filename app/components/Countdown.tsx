"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT_DATE = new Date("2026-04-26T08:00:00-06:00");

interface TimeLeft {
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

function calcTimeLeft(): TimeLeft {
  const diff = EVENT_DATE.getTime() - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  };
}

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return Math.floor(Date.now() / 1000);
}

function getServerSnapshot() {
  return 0;
}

export default function Countdown() {
  const tick = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const time = tick === 0 ? null : calcTimeLeft();

  const renderUnit = useCallback(
    (label: string, value: number | null) => (
      <div key={label} className="flex flex-col items-center">
        <div className="glass flex h-16 w-16 items-center justify-center rounded-xl transition-transform hover:scale-105 sm:h-20 sm:w-20">
          <span className="text-2xl font-bold text-white sm:text-3xl">
            {value !== null ? String(value).padStart(2, "0") : "--"}
          </span>
        </div>
        <span className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
          {label}
        </span>
      </div>
    ),
    []
  );

  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {renderUnit("Días", time?.dias ?? null)}
      {renderUnit("Hrs", time?.horas ?? null)}
      {renderUnit("Min", time?.minutos ?? null)}
      {renderUnit("Seg", time?.segundos ?? null)}
    </div>
  );
}

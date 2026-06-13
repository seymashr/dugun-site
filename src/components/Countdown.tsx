"use client";

import { useEffect, useState } from "react";

export default function Countdown() {
  const weddingDate = new Date("2026-09-12T19:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference =
        weddingDate.getTime() - new Date().getTime();

      if (difference <= 0) return;

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        ),
        minutes: Math.floor(
          (difference / (1000 * 60)) % 60
        ),
        seconds: Math.floor(
          (difference / 1000) % 60
        ),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-12 border border-[#d8d2c5] bg-[#faf8f3] py-8 px-4">
      <h2
        className="text-3xl text-center mb-8 text-[#4f4a43]"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Düğüne Kalan Süre
      </h2>

      <div className="grid grid-cols-4 gap-2 text-center">
        <div>
          <p className="text-3xl md:text-4xl font-semibold text-[#4f4a43]">
            {timeLeft.days}
          </p>
          <p
            className="text-sm uppercase tracking-wider text-[#7b7468]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Gün
          </p>
        </div>

        <div>
          <p className="text-3xl md:text-4xl font-semibold text-[#4f4a43]">
            {timeLeft.hours}
          </p>
          <p
            className="text-sm uppercase tracking-wider text-[#7b7468]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Saat
          </p>
        </div>

        <div>
          <p className="text-3xl md:text-4xl font-semibold text-[#4f4a43]">
            {timeLeft.minutes}
          </p>
          <p
            className="text-sm uppercase tracking-wider text-[#7b7468]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Dakika
          </p>
        </div>

        <div>
          <p className="text-3xl md:text-4xl font-semibold text-[#4f4a43]">
            {timeLeft.seconds}
          </p>
          <p
            className="text-sm uppercase tracking-wider text-[#7b7468]"
            style={{ fontFamily: "var(--font-cormorant)" }}
          >
            Saniye
          </p>
        </div>
      </div>
    </div>
  );
}
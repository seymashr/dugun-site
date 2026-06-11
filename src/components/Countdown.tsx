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
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">
        ⏳ Düğüne Kalan Süre
      </h2>

      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold">
            {timeLeft.days}
          </p>
          <p>Gün</p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {timeLeft.hours}
          </p>
          <p>Saat</p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {timeLeft.minutes}
          </p>
          <p>Dakika</p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {timeLeft.seconds}
          </p>
          <p>Saniye</p>
        </div>
      </div>
    </div>
  );
}
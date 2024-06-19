'use client'

import PerformanceDisplay from "./PerformanceDisplay";
import { useRef, useState } from "react";

// Fonction qui permet de formater le temps en heures, minutes et secondes (hh:mm:ss)
const formatDuration = (ms) => {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / 1000 / 60) % 60;
  const hours = Math.floor(ms / 1000 / 60 / 60);

  return `${hours > 0 ? `${hours}h ` : ""}${minutes > 0 ? `${minutes}m ` : ""}${seconds}s`;
};

// Fonction qui affiche récapitule les résultats de la leçon à la fin de celle-ci
export default function LessonComplete({ correctAnswerCount, incorrectAnswerCount, startTime }) {

  const [displayReview, setDisplayReview] = useState(false);

  const endTime = useRef(Date.now());

  const duration = endTime.current - startTime;
  const durationString = formatDuration(duration);

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center justify-center gap-8 font-bold">
        <h1 className="text-center text-3xl text-yellow-400">
          Leçon terminée ! Bravo !
        </h1>
        <div className="flex flex-wrap justify-center gap-5">
          <div className="min-w-[110px] rounded-xl border-2 border-yellow-400 bg-yellow-400">
            <h2 className="py-1 text-center text-white">Total XP</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-yellow-400">
              {correctAnswerCount}
            </div>
          </div>
          <div className="min-w-[110px] rounded-xl border-2 border-blue-400 bg-blue-400">
            <h2 className="py-1 text-center text-white">Temps</h2>
            <div className="flex justify-center rounded-xl bg-white py-4 text-blue-400">
              {durationString}
            </div>
          </div>

          {/* External component because color changes with performance */}
          <PerformanceDisplay
            correctAnswerCount={correctAnswerCount}
            incorrectAnswerCount={incorrectAnswerCount}
          />
        </div>
      </div>
    </div>
  );
};

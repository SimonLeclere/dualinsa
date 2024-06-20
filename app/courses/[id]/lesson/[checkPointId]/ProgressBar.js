'use client';

import { useEffect, useRef, useState } from "react";
import CloseSvg from "@/components/icons/CloseSvg";
import { useRouter } from "next/navigation";

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes ? minutes + " : " : ""}${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
};

export default function ProgressBar({ params }, { currentQuestionIndex, totalCorrectAnswersNeeded, setQuitMessageShown, timerDuration, onTimerEnd, stopTimer, courseId }) {
  const [counter, setCounter] = useState(timerDuration);
  const timerEndedRef = useRef(false);

  const routeur = useRouter();

  useEffect(() => {
    // Reset counter and timer ended flag whenever timerDuration or currentQuestionIndex changes
    setCounter(timerDuration);
    timerEndedRef.current = false;
  }, [timerDuration, currentQuestionIndex]);

  useEffect(() => {
    if (stopTimer) return;

    if (counter > 0) {
      const timer = setInterval(() => {
        setCounter(prevCounter => {
          if (prevCounter <= 1) {
            clearInterval(timer);
            if (!timerEndedRef.current) {
              onTimerEnd();
              timerEndedRef.current = true;
            }
            return 0;
          }
          return prevCounter - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [counter, stopTimer, onTimerEnd]);

  return (
    <header className="flex items-center gap-4">
      <button
        className="text-gray-400"
        onClick={() => {
          setQuitMessageShown(true);
          routeur.push(`/courses/${params.id}`);
        }}
      >
        <CloseSvg />
      </button>

      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalCorrectAnswersNeeded}
        aria-valuenow={currentQuestionIndex}
      >
        <div
          className={
            "h-full rounded-full bg-green-500 transition-all duration-700 " +
            (currentQuestionIndex > 0 ? "px-2 pt-1 " : "")
          }
          style={{
            width: `${(currentQuestionIndex / totalCorrectAnswersNeeded) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-green-400"></div>
        </div>
      </div>

      <span className={`flex justify-center gap-2 text-lg font-bold tabular-nums ${counter < 10 ? "text-red-500" : ""} ${counter < 10 && counter !== 0 && !stopTimer ? "animate-ping" : ""}`}>
        {formatSeconds(counter)}
      </span>
    </header>
  );
};

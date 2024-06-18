import React, { useEffect, useState, useRef } from "react";

// Fonction qui permet de formater le temps en heures, minutes et secondes (hh:mm:ss)
const formatTime = (timeMs) => {
  const seconds = Math.floor(timeMs / 1000) % 60;
  const minutes = Math.floor(timeMs / 1000 / 60) % 60;
  const hours = Math.floor(timeMs / 1000 / 60 / 60);
  if (hours === 0)
    return [minutes, seconds]
      .map((x) => x.toString().padStart(2, "0"))
      .join(":");
  return [hours, minutes, seconds]
    .map((x) => x.toString().padStart(2, "0"))
    .join(":");
};

export default function TimeLeft({ startTime, endTime }) {
  const [timeLeft, setTimeLeft] = useState(endTime.current - startTime.current);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const remainingTime = endTime.current - Date.now();
      setTimeLeft(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        setTimeLeft(0);
      }
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [endTime]);

  return (
    <div className="flex justify-center gap-2">
      <span className="text-lg font-bold">
        {formatTime(timeLeft)}
        {console.log("timeLeft", timeLeft)}
      </span>
    </div>
  );
}

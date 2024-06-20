// CompletionCircle.js
import React from "react";

export default function CompletionCircle({progress}) {
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (progress * circumference);
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      className="absolute "
    >
      <circle
        cx="55"
        cy="59"
        r="46"
        stroke="#e5e5e5"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="55"
        cy="59"
        r="46"
        stroke="#FFD600" // Couleur de progression
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-500"
        transform="rotate(-90 55 59)" // Rotate the circle by -90 degrees around the center point (55, 59)
      />
    </svg>
  );
}
// CompletionCircle.js
import React from "react";

export default function CompletionCircle({ progress }) {
  const circumference = 2 * Math.PI * 46;
  const offset = circumference - (progress / 5) * circumference;

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
        stroke="black" // Couleur de progression
        strokeWidth="8"
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-all duration-500"
      />
    </svg>
  );
}

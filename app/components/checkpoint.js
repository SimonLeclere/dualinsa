

// checkpoint.js
import React from "react";
import StarSvg from "./icons/StarSvg";
import CheckmarkSvg from "./icons/CheckMarkSvg";
import LockSvg from "./icons/LockSvg";
import BookSvg from "./icons/BookSvg";
import TrophySvg from "./icons/TrophySvg";
import StrongSvg from "./icons/StrongSvg";

const icons = {
  star: <StarSvg className="w-8 h-8" />,
  check: <CheckmarkSvg className="w-8 h-8" />,
  lock: <LockSvg className="w-8 h-8" />,
  book: <BookSvg className="w-8 h-8" />,
  trophy: <TrophySvg className="w-8 h-8" />,
  strong: <StrongSvg className="w-8 h-8" />,
};

export default function CheckButton({ type, className, onClick }) {
  const icon = icons[type.toLowerCase()];

  if (!icon) return null;
  if  (type === "trophy") {
    // Return a special element or component for "Trophy"
    return (
      <div className={`trophy-icon`} onClick={onClick}>
        {icons[type]}
      </div>
    );
  }
    
  return (
    <div
      className={`flex justify-center items-center w-16 h-16 bg-purple-400 rounded-full shadow-md ${className}`}
      onClick={onClick}
    >
      {icon}
    </div>
  );
}

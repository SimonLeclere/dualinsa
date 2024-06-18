// checkpoint.js
import React from "react";
import Link from "next/link";
import StarSvg from "./icons/StarSvg";
import CheckmarkSvg from "./icons/CheckMarkSvg";
import LockSvg from "./icons/LockSvg";
import BookSvg from "./icons/BookSvg";
import TrophySvg from "./icons/TrophySvg";
import StrongSvg from "./icons/StrongSvg";
import ToolTip from "./icons/ToolTip";

const icons = {
  star: StarSvg,
  check: CheckmarkSvg,
  lock: LockSvg,
  book: BookSvg,
  trophy: TrophySvg,
  strong: StrongSvg,
};

export default function CheckButton({
  type,
  href,
  className,
  onClick,
  offset = 0,
  unlocked = false,
  state = "active",
}) {
  const IconComponent = icons[type.toLowerCase()];

  if (!IconComponent) {
    console.error("Invalid type provided to CheckButton:", type);
    return null;
  }

  const baseClasses =
    "flex justify-center items-center w-20 h-20 rounded-full border-b-8 shadow-md cursor-pointer";
    const baseTrophyClasses =
    "flex justify-center items-center w-50 h-50 rounded-full cursor-pointer";
  const unlockedClasses =
    unlocked == true
      ? "bg-purple-500 border-purple-800" 
      : "border-[#b7b7b7] bg-[#e5e5e5]";
  const unlockedTrophyClasses =
    unlocked == true
      ? "bg-transparent border-gray-400"
      : "border-[#b7b7b7] bg-[#e5e5e5]";

  // Spécifique pour le type "trophy"
  if (type.toLowerCase() === "trophy") {


    return (
      <Link href={href} passHref>
        <div
          style={{ transform: `translateX(${offset}px)` }}
          className={`${baseTrophyClasses} ${unlockedTrophyClasses}  `}
          onClick={onClick}
        >
          <IconComponent unlocked={unlocked} className={unlocked && state == "active" ? "animate-bounce" : ""} />
        </div>
      </Link>
    );
  }

  // Générique pour les autres types
  return (
    <Link href={href} passHref>
      <div
        style={{ transform: `translateX(${offset}px)` }}
        className={`${baseClasses} ${unlockedClasses} `}
        onClick={onClick}
      >
        <IconComponent unlocked={unlocked} className="w-12 h-12" />
        {unlocked && state == "active" && <ToolTip offset = {offset} />}
      </div>
    </Link>
  );
}



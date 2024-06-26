// checkpoint.js
import React from "react";
import { useRouter } from "@/navigation";

import StarSvg from "./icons/StarSvg";
import CheckmarkSvg from "./icons/CheckMarkSvg";
import LockSvg from "./icons/LockSvg";
import BookSvg from "./icons/BookSvg";
import TrophySvg from "./icons/TrophySvg";
import StrongSvg from "./icons/StrongSvg";
import ToolTip from "./icons/ToolTip";
import CompletionCircle from "./icons/CompletionCircle";

const icons = {
  star: StarSvg,
  check: CheckmarkSvg,
  lock: LockSvg,
  book: BookSvg,
  trophy: TrophySvg,
  strong: StrongSvg,
};

export default function Checkpoint({ innerRef, type, href, className, offset = 0, unlocked = false, state = "active", progress = 0 }) {
  
  const router = useRouter();
  
  const IconComponent = icons[type.toLowerCase()];

  if (!IconComponent) {
    console.error("Invalid type provided to CheckButton:", type);
    return null;
  }

  const baseClasses =
    "flex justify-center items-center w-20 h-20 rounded-full border-b-8 shadow-md";
  const baseTrophyClasses =
    "flex justify-center items-center w-50 h-50 rounded-full";

  const unlockedClasses =
    unlocked == true
      ? 
      (state == "complete"
        ? "bg-[#FFD600] border-[#FFB800]"
        : "bg-purple-500 border-purple-800")
      : "border-[#b7b7b7] bg-[#e5e5e5]";

  const unlockedTrophyClasses =
    unlocked == true
      ? "bg-transparent border-gray-400"
      : "border-[#b7b7b7] bg-[#e5e5e5]";
  

  // Spécifique pour le type "trophy"
  if (type.toLowerCase() === "trophy") {
    return (
      <button
        ref={innerRef}
        onClick={() => unlocked && router.push(href)}
        className={unlocked ? "cursor-pointer" : "cursor-default"}
        style={{ transform: `translateX(${offset}px)` }}
      >
        <div className={`${baseTrophyClasses} ${unlockedTrophyClasses}`}>
          <IconComponent
            unlocked={unlocked}
            className={unlocked && state == "active" ? "animate-bounce" : ""}
          />
        </div>
      </button>
    );
  }

  // Générique pour les autres types
  return (
    <button
      ref={innerRef}
      onClick={() => unlocked && router.push(href)}
      className={unlocked ? "cursor-pointer" : "cursor-default"}
      style={{ transform: `translateX(${offset}px)` }}
    >
      <div
        className={`${baseClasses} ${unlockedClasses}`}
      >
        <IconComponent unlocked={unlocked} className="w-12 h-12" />
        {unlocked && state == "active" && (
          <CompletionCircle
            progress={progress}
            classname="flex justify-center items-center"
          />
        )}
        {unlocked && state == "active" && <ToolTip offset={offset} />}
      </div>
    </button>
  );
}
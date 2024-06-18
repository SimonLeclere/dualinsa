// checkpoint.js
import React from "react";
import Link from "next/link";
import StarSvg from "./icons/StarSvg";
import CheckmarkSvg from "./icons/CheckMarkSvg";
import LockSvg from "./icons/LockSvg";
import BookSvg from "./icons/BookSvg";
import TrophySvg from "./icons/TrophySvg";
import StrongSvg from "./icons/StrongSvg";

const icons = {
  star: StarSvg,
  check: CheckmarkSvg,
  lock: LockSvg,
  book: BookSvg,
  trophy: TrophySvg,
  strong: StrongSvg,
};

export default function CheckButton({ type, href, className, onClick, offset }) {
  const IconComponent = icons[type.toLowerCase()];

  if (!IconComponent) {
    console.error("Invalid type provided to CheckButton:", type);
    return null;
  }

  if (type.toLowerCase() === "trophy") {
    return (
      <Link href={href} passHref
      style={{transform:`translateX(${offset}px)`}}>
        <div
          className={`flex justify-center items-center w-20 h-20 bg-white border-b-4  rounded-full shadow-md cursor-pointer `}
          onClick={onClick}
        >
          <IconComponent className="w-12 h-12" />
        </div>
      </Link>
    );
  }

  
  return (
    <Link href={href} passHref
    style={{transform:`translateX(${offset}px)`}} >
      <div
        className={`flex justify-center items-center w-20 h-20 rounded-full bg-purple-500 border-purple-800 border-b-4 shadow-md cursor-pointer ${className}`}
        onClick={onClick}
      >
        <IconComponent className="w-12 h-12" />
        </div>
      
    </Link>
  );
  
}



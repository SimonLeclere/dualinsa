"use client";

import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";
import StarSvg from "@/components/icons/StarSvg";
import { CheckmarkSvg } from "@/components/icons/CheckMarkSvg";
import React from "react";
import CheckButton from "@/components/checkpoint";

export default function App() {
  const handleClick = () => {
    console.log("CheckButton clicked!");
  };

  const icons = ["star", "book", "check", "strong", "book", "trophy"]; // Types d'icônes

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <NavBar />
      <div className="flex flex-col items-center gap-4">
        {icons.map((type, index) => (
          <CheckButton
            key={index}
            type={type}
            className="bg-purple-500 border-purple-800"
            onClick={handleClick}
          />
        ))}
      </div>
      <BottomBar />
    </div>
  );
}

"use client";

import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";
import React from "react";
import CheckButton from "@/components/checkpoint";

export default function App() {
  const handleClick = () => {
    console.log("CheckButton clicked!");
  };

  const icons = [
    { type: "star", href: "/page1", offset: 0},
    { type: "book", href: "/page2", offset: 40},
    { type: "check", href: "/page3", offset: 40},
    { type: "strong", href: "/page4", offset: 0},
    { type: "book", href: "/page5", offset: -40},
    { type: "check", href: "/page3", offset: -40},
    { type: "trophy", href: "/page6", offset: 0}
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <NavBar />
      <div className="flex flex-col items-center gap-4">
        {icons.map((icon, index) => (
          <CheckButton
            key={index}
            type={icon.type}
            href={icon.href}
            offset={icon.offset}
            className="bg-purple-500 border-purple-800"
            onClick={handleClick}
          />
        ))}
      </div>
      <BottomBar />
    </div>
  );
}



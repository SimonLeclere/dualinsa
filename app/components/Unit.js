// Unit.js
import React from "react";
import UnitSection from "./UnitSection";

const units = [
  { index: 1, name: "Introduction à la thermochimie" },
  { index: 2, name: "Les grandeurs thermodynamiques" },
  { index: 3, name: "Les réactions chimiques" },
  { index: 4, name: "Les équilibres chimiques" }
];


const checkpoints = [
    [
      { type: "star", href: "/page1", progress: 1},
      { type: "book", href: "/page2", progress: 1},
      { type: "strong", href: "/page3", progress: 1},
      { type: "check", href: "/page3", progress: 1},
      { type: "book", href: "/page2", progress: 1},
      { type: "strong", href: "/page3", progress: 1},
      { type: "trophy", href: "/page4", progress: 1}
    ],
    [
      { type: "star", href: "/page1", progress: 1},
      { type: "book", href: "/page6", progress: 1},
      { type: "strong", href: "/page7", progress: 1},
      { type: "check", href: "/page3", progress: 1},
      { type: "book", href: "/page2", progress: 1},
      { type: "strong", href: "/page3", progress: 1},
      { type: "trophy", href: "/page8", progress: 1}
    ],
    [
      { type: "star", href: "/page9", progress: 1},
      { type: "book", href: "/page10", progress: 1},
      { type: "strong", href: "/page11", progress: 1},
      { type: "check", href: "/page3", progress: 1},
      { type: "book", href: "/page2", progress: 1},
      { type: "strong", href: "/page3", progress: 1},
      { type: "trophy", href: "/page12", progress: 1}
    ],
    [
      { type: "star", href: "/page13", progress: 1},
      { type: "book", href: "/page14", progress: 0.4},
      { type: "strong", href: "/page11", progress: 0},
      { type: "check", href: "/page3", progress: 0},
      { type: "book", href: "/page14", progress: 0},
      { type: "strong", href: "/page11", progress: 0},
      { type: "trophy", href: "/page16", progress: 0}
    ],
  ];

export default function Unit() {
  return (
    <div className="flex flex-col items-center gap-12 w-full">
      {units.map((unit, index) => (
        <UnitSection
          key={unit.index}
          unit={unit}
          checkpoints={checkpoints[index]}
        />
      ))}
    </div>
  );
}






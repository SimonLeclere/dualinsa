"use client";

import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";
import { useEffect, useState } from "react";
import React, { act } from "react";
import CheckButton from "@/components/checkpoint";
import Unit from "@/components/Unit";
import RightBar from "@/components/RightBar";
import Link from "next/link";
import { UpArrowSvg } from "@/components/icons/UpArrowSvg";
import { PracticeExerciseSvg } from "@/components/icons/PracticeExerciseSvg";

export default function App() {
  const handleClick = () => {
    console.log("CheckButton clicked!");
  };

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const updateScrollY = () => setScrollY(globalThis.scrollY ?? scrollY);
    updateScrollY();
    document.addEventListener("scroll", updateScrollY);
    return () => document.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  return (
    <>
      <NavBar />
      <UpArrowSvg />
      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex max-w-2xl grow flex-col">
          <Unit />
          <div className="sticky bottom-28 left-0 right-0 flex items-end justify-between">
            {/* Button pour revenir tout en haut */}
            {scrollY > 200 && (
              <button
                className="absolute right-4 flex h-14 w-14 items-center justify-center self-end rounded-2xl border-2 border-b-4 border-gray-200 bg-white transition hover:bg-gray-50 hover:brightness-90 md:right-0"
                onClick={() => scrollTo(0, 0)}
              >
                <span className="sr-only">Jump to top</span>
                <UpArrowSvg />
              </button>
            )}
          </div>
        </div>
        <RightBar />
      </div>
      <div className="pt-[90px]"></div>{" "}
      {/* Pour avoir un affichage propre lors du defillement */}
    </>
  );
}

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
//       <NavBar />
//       <div className="flex flex-col items-center w-full gap-8 py-8">
//         <Unit />
//       </div>
//       <BottomBar />
//     </div>
//   );
// }

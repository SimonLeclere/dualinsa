"use client";

import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";
import React, { act } from "react";
import CheckButton from "@/components/checkpoint";
import Unit from "@/components/Unit";
import RightBar from "@/components/RightBar";
import Link from "next/link";

export default function App() {
  const handleClick = () => {
    console.log("CheckButton clicked!");
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex max-w-2xl grow flex-col">
          <Unit />
          <div className="sticky bottom-28 left-0 right-0 flex items-end justify-between">
            {/* Button pour revenir tout en haut */}
          </div>
        </div>
        <RightBar />
      </div>
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

"use client";


import NavBar from "@/components/NavBar";
import BottomBar from "@/components/BottomBar";
import React, { act } from "react";
import UnitSection from "@/components/UnitSection";




export default function App() {
  const handleClick = () => {
    console.log("CheckButton clicked!");
  };

  return (
    <div className="flex flex-col items-center justify-center pb-8">
      <NavBar />
        <div className="flex flex-col items-center gap-12 w-full">
        {units.map((unit, index) => (
          <UnitSection
            key={unit.index}
            unit={unit}
            checkpoints={checkpoints[index]}
          />
        ))}
      </div> 
      <BottomBar />
    </div>
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

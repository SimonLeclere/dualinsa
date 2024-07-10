"use client";

import { useState } from "react";

import NavBar from "/app/components/NavBar";
import BottomBar from "/app/components/BottomBar";

import UnitCreatorSection from "./UnitCreatorSection";
import UnitCreatorHeaderPlaceholder from "./UnitHeaderPlaceHolder";

import { useSession } from "next-auth/react";
import { redirect } from "@/navigation";

export default function CoursePage() {

  
  const [units, setUnits] = useState([]);
  
  const session = useSession();

  if (session.status === "loading") return <div>Loading...</div>;
  if (session.status !== "authenticated") return redirect("/auth/signin");

  const addUnit = () => {
    setUnits([
      ...units,
      {
        index: units.length + 1,
        name: `Unit ${units.length + 1}`,
        courseId: "1",
        checkpoints: []
      }
    ]);
  }

  const addCheckpoint = (unitIndex) => {
    setUnits([
      ...units.slice(0, unitIndex),
      {
        ...units[unitIndex],
        checkpoints: [
          ...units[unitIndex].checkpoints,
          {
            id: `${units[unitIndex].checkpoints.length + 1}`,
            triesRequired: 1
          }
        ]
      },
      ...units.slice(unitIndex + 1)
    ]);
  }

  return (
    <div className="flex justify-start gap-3 pr-0 md:pl-8 md:pr-6 md:ml-24 lg:ml-64 lg:gap-12">
      <NavBar />
      <div className="flex max-w-2xl grow flex-col">
        <div className="flex flex-col items-center gap-12 w-full mt-10 md:mt-0 mb-32 md:mb-6">
          {
            units.map((unit, index) => (
              <UnitCreatorSection
                key={unit.index}
                unit={unit}
                addCheckpoint={() => addCheckpoint(index)}
                previousCheckPointsCount={units
                  .slice(0, index)
                  .reduce((acc, unit) => acc + unit.checkpoints.length + 1, 0)}
                checkpoints={units[index].checkpoints}
              />
            ))
          }
          <UnitCreatorHeaderPlaceholder
            onClick={addUnit}
          />
        </div>
      </div>
      <BottomBar selectedTab="create" />
    </div>
  );
}
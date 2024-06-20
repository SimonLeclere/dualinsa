// UnitSection.js
import React from "react";
import UnitHeader from "./UnitHeader";
import Checkpoint from "./checkpoint";




export default function UnitSection({ unit, checkpoints, advancement, previousCheckPointsCount}) {

  function getOffset(numIcon) {
    switch (numIcon % 8) {
      case 0:
        return 0;
      case 1:
        return 60;
      case 2:
        return 120;
      case 3:
        return 60;
      case 4:
        return 0;
      case 5:
        return -60;
      case 6:
        return -120;
      case 7:
        return -60;
      default:
        return 0;

    }
  }

  function getType(numIcon) {
    switch (numIcon % 6) {
      case 0:
        return "star";
      case 1:
        return "check";
      case 2:
        return "book";
      case 3:
        return "trophy";
      case 4:
        return "strong";
      default:
        return "star";
    }
  }

  return (
    <div className="flex flex-col items-center w-full mt-8">
      <UnitHeader
        unitNumber={unit.index}
        unitName={unit.name}
        courseId={unit.courseId}
      />
      <div className="flex flex-col items-center gap-20 mt-8">
        {checkpoints && checkpoints.length > 0 ? (
          checkpoints.map((checkpoint, index) => (
            <Checkpoint
            
              key={`${index}${unit.index}`}
              href={`/courses/${unit.courseId}/lesson/${checkpoint.id}`}
              type={getType(index + previousCheckPointsCount)}
              offset={getOffset(index + previousCheckPointsCount)}
              progress={advancement.currentCheckpointProgress / checkpoint.triesRequired }
              state={advancement.currentUnitCheckpointIndex == index && advancement.currentUnitIndex + 1 === unit.index ? "active" : advancement.currentUnitCheckpointIndex > index ? "complete" : "complete"}
              unlocked={advancement.currentUnitCheckpointIndex >= index && advancement.currentUnitIndex + 1 === unit.index || advancement.currentUnitIndex + 1 > unit.index}
              className="relative"
            />
          ))
        ) : (
          <p>No checkpoints available.</p>
        )}
      </div>
    </div>
  );
}
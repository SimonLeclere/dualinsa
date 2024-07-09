'use client'

import { useEffect, useRef } from "react";
import UnitHeader from "./UnitHeader";
import Checkpoint from "@/Checkpoint";

const getOffset = (index) => {
  const offsets = [0, 60, 120, 60, 0, -60, -120, -60];
  return offsets[index % offsets.length];
};

function getType(numIcon, index, length) {

  // last question is always a trophy
  if (index === length - 1) {
    return "trophy";
  }

  switch (numIcon % 5) {
    case 0:
      return "star";
    case 1:
      return "check";
    case 2:
      return "book";
    case 4:
      return "strong";
    default:
      return "star";
  }
}

export default function UnitSection({ unit, checkpoints, advancement, previousCheckPointsCount}) {

  const checkpointRefs = useRef([]);

  useEffect(() => {
    // scroll to the current checkpoint
    if (advancement.currentUnitIndex + 1 === unit.index && checkpointRefs.current[advancement.currentUnitCheckpointIndex]) {
      checkpointRefs.current[advancement.currentUnitCheckpointIndex].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [advancement.currentUnitCheckpointIndex, advancement.currentUnitIndex, unit.index]);

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
              innerRef={el => (checkpointRefs.current[index] = el)}
              key={`${index}${unit.index}`}
              href={`/courses/${unit.courseId}/lesson/${checkpoint.id}`}
              type={getType(index + previousCheckPointsCount, index, unit.checkpoints.length)}
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
'use client'

import UnitCreatorHeader from "./UnitCreatorHeader";
import Checkpoint from "@/components/Checkpoint";
import CheckpointPlaceholder from "./CheckpointPlaceholder";

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

export default function UnitCreatorSection({ unit, checkpoints, previousCheckPointsCount, addCheckpoint }) {

  return (
    <div className="flex flex-col items-center w-full mt-8">
      <UnitCreatorHeader
        unitNumber={unit.index}
        unitName={unit.name}
        courseId={unit.courseId}
      />
      <div className="flex flex-col items-center gap-20 mt-8">
        {checkpoints && checkpoints.length > 0 && (
          checkpoints.map((checkpoint, index) => (
            <Checkpoint
              key={`${index}${unit.index}`}
              href={`/courses/${unit.courseId}/lesson/${checkpoint.id}`}
              type={getType(index + previousCheckPointsCount, index, unit.checkpoints.length)}
              offset={getOffset(index + previousCheckPointsCount)}
              progress={1}
              state={'complete'}
              unlocked={true}
              className="relative"
            />
          ))
        )}
        <CheckpointPlaceholder offset={getOffset(checkpoints.length + previousCheckPointsCount)} onClick={addCheckpoint} />
      </div>
    </div>
  );
}
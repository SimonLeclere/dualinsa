// UnitSection.js
import React from "react";
import UnitHeader from "./UnitHeader";
import CheckButton from "./checkpoint";




export default function UnitSection({ unit, checkpoints }) {

  function getOffset(numIcon){
    if(numIcon % 6 == 0){
      return 0;
    } else if(numIcon % 6 == 1){
      return 40;
    } else if(numIcon % 6 == 2){
      return 40;
    } else if(numIcon % 6 == 3){
      return 0;
    } else if(numIcon % 6 == 4){
      return -40;
    } else if(numIcon % 6 == 5){
      return -40;
    }
  }

  function getState(progress){
    if(progress == 1){
      return "complete";
    }
  }


  return (
    <div className="flex flex-col items-center w-full mt-8">
      <UnitHeader
        unitNumber={unit.index}
        unitName={unit.name}
      />
      <div className="flex flex-col items-center gap-4 mt-8">
        {checkpoints && checkpoints.length > 0 ? (
          checkpoints.map((checkpoint, index) => (
            <CheckButton
              key={`${index}${unit.index}`}
              type={checkpoint.type}
              href={checkpoint.href}
              offset={getOffset(index)}
              progress={checkpoint.progress}
              state={getState(checkpoint.progress)}
              unlocked={index === 0 || (index > 0 && checkpoints[index - 1] && getState(checkpoints[index - 1].progress) === "complete")}
              className="relative"
              onClick={checkpoint.onClick}
            />
          ))
        ) : (
          <p>No checkpoints available.</p>
        )}
      </div>
    </div>
  );
}

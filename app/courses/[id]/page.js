"use client";

import useSwr from "swr";

import NavBar from "/app/components/NavBar";
import BottomBar from "/app/components/BottomBar";
import UnitSection from "/app/components/UnitSection";

export default function CoursePage({params}) {

    const {data, error, isLoading} = useSwr(`/api/courses/units/${params.id}/listAll`, (url) => fetch(url).then((res) => res.json()));
    
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (data.message) return <div>Erreur: {data.message}</div>;
    
    const units = data?.units; // All units from the course with all their checkpoints
    console.log(units);
    const advancement = data?.advancement; // User advancement in the course
    console.log(advancement);

    return (
        <div className="flex flex-col items-center justify-center pb-8">
        <NavBar />
          <div className="flex flex-col items-center gap-12 w-full">
          {units.map((unit, index) => (
            <UnitSection
              key={unit.index}
              unit={unit}
              previousCheckPointsCount={units.slice(0, index).reduce((acc, unit) => acc + unit.checkpoints.length, 0)}
              checkpoints={units[index].checkpoints}
              advancement={advancement}
            />
          ))}
        </div> 
        <BottomBar />
      </div>
    );
}
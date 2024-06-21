"use client";

import useSwr from "swr";

import NavBar from "/app/components/NavBar";
import RightBar from "/app/components/RightBar";
import BottomBar from "/app/components/BottomBar";
import UnitSection from "/app/components/UnitSection";

export default function CoursePage({ params }) {

  // Fetch Post the params.id to /api/users/lastCourse
  useSwr(`/api/users/lastCourse`, (url) => fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lastCourse: +params.id })
  }).then((res) => res.json()));


  const { data, error, isLoading } = useSwr(`/api/courses/units/${params.id}/listAll`, (url) => fetch(url).then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data.message) return <div>Erreur: {data.message}</div>;

  const units = data?.units; // All units from the course with all their checkpoints
  const advancement = data?.advancement; // User advancement in the course

  return (
    <div className="flex justify-center gap-3 pr-0 md:pr-6 md:ml-24 lg:ml-64 lg:gap-12">
      <NavBar />
      <div className="flex max-w-2xl grow flex-col">
        <div className="flex flex-col items-center gap-12 w-full mt-10 md:mt-0 mb-32 md:mb-6">
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
      </div>
      <RightBar />
      <BottomBar selectedTab="learn" />
    </div>
  );
}
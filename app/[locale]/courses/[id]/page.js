"use client";

import useSwr from "swr";
import { useEffect, useState } from "react";

import NavBar from "/app/components/NavBar";
import RightBar from "/app/components/RightBar";
import BottomBar from "/app/components/BottomBar";
import UnitSection from "/app/components/UnitSection";
import { UpArrowSvg } from "@/components/icons/UpArrowSvg";

import { useSession } from "next-auth/react";
import { redirect } from "@/navigation";

export default function CoursePage({ params }) {

  
  // Revenir au haut de la page
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const updateScrollY = () => setScrollY(globalThis.scrollY ?? scrollY);
    updateScrollY();
    document.addEventListener("scroll", updateScrollY);
    return () => document.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  // Fetch Post the params.id to /api/users/lastCourse
  useSwr(`/api/users/lastCourse`, (url) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lastCourse: +params.id }),
    }).then((res) => res.json())
  );

  const { data, error, isLoading } = useSwr([`/api/courses/units/${params.id}/listAll`, params?.locale],
    ([url, locale]) => fetch(`${url}?locale=${locale || "fr"}`).then((res) => res.json())
  );

  const session = useSession();
  if (session.status === "loading") return <div>Loading...</div>;
  if (session.status !== "authenticated") return redirect("/auth/signin");

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
              previousCheckPointsCount={units
                .slice(0, index)
                .reduce((acc, unit) => acc + unit.checkpoints.length, 0)}
              checkpoints={units[index].checkpoints}
              advancement={advancement}
            />
          ))}
        </div>
        <div className="sticky bottom-28 left-0 right-0 flex items-end justify-between">
          {/* Button pour revenir tout en haut */}
          {scrollY > 200 && (
            <button
              className="absolute right-4 flex h-14 w-14 items-center justify-center self-end rounded-2xl border-2 border-b-4 border-gray-200 bg-white transition hover:bg-gray-50 hover:brightness-90 md:right-0"
              onClick={() => scrollTo(0, 0)}
            >
              <UpArrowSvg />
            </button>
          )}
        </div>
      </div>
      <RightBar />
      <BottomBar selectedTab="learn" />
    </div>
  );
}
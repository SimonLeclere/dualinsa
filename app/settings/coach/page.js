"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSwr from "swr";

import haltereImg from "@/public/haltere.png";
import { SettingsRightNav } from "@/components/SettingsRightNav";

import BottomBar from "@/components/BottomBar";

const goalXpOptions = [
  { title: "Chill", xp: 10 },
  { title: "Révision", xp: 20 },
  { title: "Sérieux", xp: 30 },
  { title: "Intense", xp: 50 },
  { title: "Partiel en approche", xp: 500 },
  { title: "Rattrapage", xp: 5000 },
];

export default function Coach() {
  // TODO : get from API & save the modification of the goal
  const { data: user, error, isLoading } = useSwr('/api/users/', (url) => fetch(url).then((res) => res.json()));
 
  const [goalXp, setGoalXp] = useState('');
  const [localGoalXp, setLocalGoalXp] = useState(goalXp);

  if (user.message) return <div>Erreur: {user.message}</div>;
  
  useEffect(() => {
    if (user) {
      const goalXp = user.dailyGoal;
      setGoalXp(user.dailyGoal);
    }
  }, [user]);
  
  const saveChanges = async (event) => {
    event.preventDefault();
    setGoalXp(localGoalXp)
    // Request to update user
    const res = await fetch('/api/users/dailyGoal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dailyGoal: goalXp }),
    });
  };

  return (
    <div>
      <BottomBar selectedTab="profile" />
      <div className="mx-auto flex flex-col gap-5 px-4 py-20 sm:py-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="text-lg font-bold text-gray-800 sm:text-2xl">
            Modifier l&apos;objectif quotidien
          </h1>
          <button
            className="rounded-2xl border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
            onClick={saveChanges}
            disabled={localGoalXp === goalXp}
          >
            Enregistrer
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div className="flex w-full max-w-xl flex-col gap-8">
            <p className="text-gray-400">
              Choisir un objectif quotidien vous aidera à rester motivé pour vos
              révisions. Vous pouvez changer d&apos;objectif à tout moment.
            </p>
            <div className="flex gap-5">
              <Image
                src={haltereImg.src}
                alt="Haltère"
                className="hidden h-52 w-208 sm:block"
                width={208}
                height={208}
              />
              <div className="grow">
                {goalXpOptions.map(({ title, xp }, i) => {
                  return (
                    <button
                      key={title}
                      className={[
                        "flex w-full items-center justify-between border-2 p-4 first:rounded-t-2xl last:rounded-b-2xl last:border-b-2",
                        xp === localGoalXp
                          ? "border-b-2 border-blue-400 bg-blue-100 text-blue-500"
                          : "border-t-0 border-gray-200 first:border-t-2 hover:bg-gray-100",
                        goalXpOptions[i + 1]?.xp === localGoalXp
                          ? "border-b-0"
                          : "",
                      ].join(" ")}
                      onClick={() => setLocalGoalXp(xp)}
                    >
                      <div className="font-bold">{title}</div>
                      <div>{xp} XP par jour</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <SettingsRightNav selectedTab="Edit Daily Goal" />
        </div>
      </div>
    </div>
  );
};

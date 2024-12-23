"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSwr from "swr";
import { useTranslations } from "next-intl";

import haltereImg from "@/public/haltere.png";
import { SettingsRightNav } from "@/components/SettingsRightNav";

import BottomBar from "@/components/BottomBar";
import NavBar from "@/components/NavBar";

const goalXpOptions = [
  { key: "1", xp: 10 },
  { key: "2", xp: 20 },
  { key: "3", xp: 30 },
  { key: "4", xp: 50 },
  { key: "5", xp: 500 },
  { key: "6", xp: 5000 },
];

export default function Coach() {

  const t = useTranslations("Settings");

  const { data: user, error, isLoading, mutate } = useSwr('/api/users/', (url) => fetch(url).then((res) => res.json()));
 
  const [dailyGoalPreference, setDailyGoalPreference] = useState(user?.dailyGoalPreference || 0);
  const [loading, setLoading] = useState(false);

  // TODO: remove  
  useEffect(() => {
    if (user) {
      setDailyGoalPreference(user.dailyGoalPreference);
    }
  }, [user]);
  
  if (user?.message) return <div>Erreur: {user?.message}</div>;
  
  const saveChanges = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Request to update user
    await fetch('/api/users/dailyGoal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dailyGoalPreference: dailyGoalPreference }),
    });

    mutate({ ...user, dailyGoalPreference });
    setLoading(false);
  };

  return (
    <div>
      <NavBar />
      <BottomBar selectedTab="profile" />
      <div className="mx-auto flex flex-col gap-5 px-4 pt-20 pb-32 sm:pb-10 md:pl-28 lg:pl-72">
        <div className="mx-auto flex w-full max-w-xl items-center justify-between lg:max-w-4xl">
          <h1 className="text-lg font-bold text-gray-800 sm:text-2xl">
            {t('dailyGoalSectionTitle')}
          </h1>
          <button
            className="rounded-2xl border-b-4 border-green-600 bg-green-500 px-5 py-3 font-bold uppercase text-white transition hover:brightness-110 disabled:border-b-0 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:brightness-100"
            onClick={saveChanges}
            disabled={dailyGoalPreference === user?.dailyGoalPreference || loading}
          >
            <div className="flex">
            {loading && ( // Svg du chargement
                <svg className="animate-spin mr-3 ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {t('save')}
            </div>
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <div className="flex w-full max-w-xl flex-col gap-8">
            <p className="text-gray-400">
              {t('dailyGoalDescription')}
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
                {goalXpOptions.map(({ key, xp }, i) => {
                  return (
                    <button
                      key={`${key}-${xp}`}
                      className={[
                        "flex w-full items-center justify-between border-2 p-4 first:rounded-t-2xl last:rounded-b-2xl last:border-b-2",
                        xp === dailyGoalPreference
                          ? "border-b-2 border-blue-400 bg-blue-100 text-blue-500"
                          : "border-t-0 border-gray-200 first:border-t-2 hover:bg-gray-100",
                        goalXpOptions[i + 1]?.xp === dailyGoalPreference
                          ? "border-b-0"
                          : "",
                      ].join(" ")}
                      onClick={() => setDailyGoalPreference(xp)}
                    >
                      <div className="font-bold">{t(`DailyGoalTitles.${key}`)}</div>
                      <div>{t('xpPerDay', { xp })}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <SettingsRightNav selectedTab={t('RightNav.dailyGoalSectionTitle')} />
        </div>
      </div>
    </div>
  );
}
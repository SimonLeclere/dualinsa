'use client'

import BottomBar from "/app/components/BottomBar";

import ProfileStatsSection from "/app/profile/ProfileStatsSection.js";
import ProfileTopBar from "/app/profile/ProfileTopBar";
import ProfileTopSection from "/app/profile/ProfileTopSection";


import useSwr from "swr";


export default function Profile() {

  const { data: user, error, isLoading } = useSwr('/api/users/', (url) => fetch(url).then((res) => res.json()));

  return (
    <div>
      <ProfileTopBar />
      <div className="flex justify-center gap-3 md:pl-2 pt-14 md:ml-24 lg:ml-64">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          {isLoading && <p>Chargement...</p>}
          {error && <p>Erreur de chargement</p>}
          {user?.message && <p>Erreur: {user?.message}</p>}
          {
            user && <>
            <ProfileTopSection user={user} />
            <ProfileStatsSection totalXp={user.score}/>
            </>
          }
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="profile" />
    </div>
  );
}






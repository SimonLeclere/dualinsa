'use client'

import BottomBar from "@/components/BottomBar";

import ProfileStatsSection from "@/profile/ProfileStatsSection.js";
import ProfileTopBar from "@/profile/ProfileTopBar";
import ProfileTopSection from "@/profile/ProfileTopSection";


import useSwr from "swr";

import { redirect } from "@/navigation";
import { useSession } from "next-auth/react";

export default function Profile({ params }) {

  const { data: user, error, isLoading } = useSwr(`/api/users/`, (url) => fetch(url).then((res) => res.json()));

  const session = useSession();
  if (session.status === "loading") return <div>Loading...</div>;
  if (session.status !== "authenticated") return redirect("/auth/signin");

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






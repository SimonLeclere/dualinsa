import BottomBar from "@/components/BottomBar";

import ProfileStatsSection from "@/app/profile/ProfileStatsSection.js";
import ProfileTopBar from "@/app/profile/ProfileTopBar";
import ProfileTopSection from "@/app/profile/ProfileTopSection";

import { getServerSession } from "../api/auth/[...nextauth]/route";

export default async function Profile() {

  const session = await getServerSession();

  const user = {
    username: "simon",
    score: 0,
    dailyGoal: 0,
    avatar: 0,
    streaksRecords: [],
    creationDate: new Date(),
  }

  return (
    <div>
      <ProfileTopBar />
      <div className="flex justify-center gap-3 md:pl-2 pt-14 md:ml-24 lg:ml-64">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection user={user} />
          <ProfileStatsSection user={user} />
        </div>
      </div>
      <div className="pt-[90px]"></div>
      <BottomBar selectedTab="profile" />
    </div>
  );
}






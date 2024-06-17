"use client";

// import { BottomBar } from "~/components/BottomBar";
// import { LeftBar } from "~/components/LeftBar";
// import { TopBar } from "~/components/TopBar";

import ProfileStatsSection from "@/app/profile/ProfileStatsSection.js";
import ProfileTopBar from "@/app/profile/ProfileTopBar";
import ProfileTopSection from "@/app/profile/ProfileTopSection";


export default function Profile() {
  // Main component of the page Profile
  return (
    <div>
      <ProfileTopBar />
      <div className="flex justify-center gap-3 pt-14 md:ml-24 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-4xl flex-col gap-5 p-5">
          <ProfileTopSection />
          <ProfileStatsSection />
        </div>
      </div>
      <div className="pt-[90px]"></div>
    </div>
  );
}






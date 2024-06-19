"use client";

import React from "react";

import LeaderboardPlaceSvg from "../components/icons/LeaderboardPlaceSvg";

const LeaderboardProfile = React.forwardRef(function LeaderboardProfile({ place, username, xp, condition }, ref) {
    return (
        <div ref={ref} className={`flex w-full items-center gap-5 rounded-2xl px-5 py-2 md:mx-0 ${condition ? 'bg-purple-200' : 'hover:bg-gray-100'}`}>
            <div className="flex items-center gap-4">
                {place === 1 ? (
                    <LeaderboardPlaceSvg place={1} />
                ) : place === 2 ? (
                    <LeaderboardPlaceSvg place={2} />
                ) : place === 3 ? (
                    <LeaderboardPlaceSvg place={3} />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center font-bold text-purple-600">
                        {place}
                    </div>
                )}
            </div>
            <div className="grow overflow-hidden overflow-ellipsis font-bold text-center">
                {username}
            </div>
            <div className="shrink-0 text-right text-indigo-500">
                {`${xp} XP`}
            </div>
        </div>
    );
});
  
export default LeaderboardProfile;
  
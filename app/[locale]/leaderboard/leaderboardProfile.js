"use client";

import React from "react";

import LeaderboardPlaceSvg from "../../components/icons/LeaderboardPlaceSvg";

const LeaderboardProfile = React.forwardRef(function LeaderboardProfile({ place, username, xp, condition }, ref) {
    return (
        <div ref={ref} className={`relative flex w-full items-center justify-between gap-5 rounded-2xl px-5 py-2 md:mx-0 ${condition ? 'bg-purple-200' : 'hover:bg-gray-100'}`}>
            <div className="flex items-center gap-4">
                {place <= 3 ? (
                    <LeaderboardPlaceSvg place={place} />
                ) : (
                    <div className="flex h-10 w-10 items-center justify-center font-bold text-purple-600">
                        {place}
                    </div>
                )}
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 font-bold overflow-hidden overflow-ellipsis">
                {username}
            </div>
            <div className="shrink-0 text-right w-20 text-indigo-500">
                {`${xp} XP`}
            </div>
        </div>
    );
});

export default LeaderboardProfile;

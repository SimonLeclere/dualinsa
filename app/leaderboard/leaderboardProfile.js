"use client";

import { fakeUsers } from "../leaderboard/fakeUsers";

import {
    FirstPlaceSvg,
    SecondPlaceSvg,
    ThirdPlaceSvg,
  } from "../components/icons/LeaderboardSvg";


  
  const LeaderboardProfile = ({ place, username, xp, condition }) => {


    return (
        <div className={`flex w-full items-center gap-5 rounded-2xl px-5 py-2 md:mx-0 ${condition ? 'bg-purple-300' : ' hover:bg-gray-100'}`}>
        <div className="flex items-center gap-4">
          {place === 1 ? (
            <FirstPlaceSvg />
          ) : place === 2 ? (
            <SecondPlaceSvg />
          ) : place === 3 ? (
            <ThirdPlaceSvg />
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
  };
  
  export default LeaderboardProfile;
  
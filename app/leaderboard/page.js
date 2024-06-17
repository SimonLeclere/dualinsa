import {
  BronzeLeagueWithSvg,
  BronzeLeagueWithoutSvg,
  SilverLeagueWithSvg,
  SilverLeagueWithoutSvg,
  GoldLeagueWithSvg,
  GoldLeagueWithoutSvg,
  DiamondLeagueWithSvg,
  DiamondLeagueWithoutSvg,
  FirstPlaceSvg,
  LeaderboardBannerSvg,
  LeaderboardExplanationSvg,
  LockedLeaderboardSvg,
  LockedLeagueSvg,
  SecondPlaceSvg,
  ThirdPlaceSvg,
} from "../components/icons/LeaderboardSvg";

import Link from "next/link";
import Image from "next/image";


const LeaderboardProfile = ({ place, name, xp, isCurrentUser }) => {
  return (
    <div
      className={[
        "flex items-center gap-5 rounded-2xl px-5 py-2 hover:bg-gray-100 md:mx-0",
        isCurrentUser ? "bg-gray-200" : "",
      ].join(" ")}
    >
      <div className="flex items-center gap-4">
        {place === 1 ? (
          <FirstPlaceSvg />
        ) : place === 2 ? (
          <SecondPlaceSvg />
        ) : place === 3 ? (
          <ThirdPlaceSvg />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center font-bold text-green-700">
            {place}
          </div>
        )}
        <Image
          width={48}
          height={48}
          className="h-12 w-12 rounded-full"
          src={defaultPicture}
          alt=""
        />
      </div>
      <div className="grow overflow-hidden overflow-ellipsis font-bold">
        {name}
      </div>
      <div className="shrink-0 text-gray-500">{`${xp} XP`}</div>
    </div>
  );
};

function leaderboardLeague(league) {
    switch(league) {
        case "Bronze": 
            return (
              <>
                <BronzeLeagueWithSvg className="h-fit w-20" />
                <LockedLeagueSvg />
                <LockedLeagueSvg />
                <LockedLeagueSvg />
              </>
            );
        case "Silver":
            return (
              <>
                <BronzeLeagueWithoutSvg />
                <SilverLeagueWithSvg className="h-fit w-20" />
                <LockedLeagueSvg />
                <LockedLeagueSvg />
              </>
            );
        case "Gold":
            return (
              <>
                <BronzeLeagueWithoutSvg />
                <SilverLeagueWithoutSvg />
                <GoldLeagueWithSvg className="h-fit w-20" />
                <LockedLeagueSvg />
              </>
            );
        case "Diamond":
            return (
              <>
                <BronzeLeagueWithoutSvg />
                <SilverLeagueWithoutSvg />
                <GoldLeagueWithoutSvg />
                <DiamondLeagueWithSvg className="h-fit w-20" />
              </>
            );
    }
}

export default function LeaderBoard() {
  const league = "Bronze"; // TODO : get from API
  const leaderLeague = `${league} League`; // text for the league

  return (
    <div>
      {/* <LeftBar selectedTab="Leaderboards" /> */}
      <div className="flex justify-center gap-3 pt-14 md:ml-24 md:p-6 md:pt-10 lg:ml-64 lg:gap-12">
        <div className="flex w-full max-w-xl flex-col items-center gap-5 pb-28 md:px-5">
          {(
            <>
              <div className="sticky top-0 -mt-14 flex w-full flex-col items-center gap-5 bg-white pt-14">
                <div className="flex items-center gap-5">
                  {/* <GoldLeagueWithSvg className="h-fit w-20" />
                  <SilverLeagueWithoutSvg />
                  <GoldLeagueWithoutSvg />
                  <DiamondLeagueWithoutSvg />
                  <LockedLeagueSvg /> */}
                  {leaderboardLeague(league)}
                </div>
                <h1 className="text-2xl font-bold">{leaderLeague}</h1>
                <div className="flex w-full flex-col items-center gap-1 pb-5">
                  <p className="text-lg text-gray-500">
                    Top 20 advance to the next league
                  </p>
                  <time className="font-bold text-yellow-400">{"6 days"}</time>
                </div>
                <div className="w-full border-b-2 border-gray-200"></div>
              </div>
              {/* <div className="w-full">
                    {leaderboardUsers.map((user, i) => {
                    return (
                        <LeaderboardProfile
                        key={user.name}
                        place={i + 1}
                        name={user.name}
                        xp={user.xp}
                        isCurrentUser={user.isCurrentUser}
                        />
                    );
                    })}
                </div> */}
            </>
          )}
        </div>
      </div>
      {/* <BottomBar selectedTab="Leaderboards" /> */}
    </div>
  );
}

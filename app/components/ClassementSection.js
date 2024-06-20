import Link from "next/link";
import useSWR from "swr";

import { IconLeagueSvg } from "../components/icons/LeaderboardSvg";

const formatPosition = (position) => {
  if (position === 1) return "1er";
  if (position === 2) return "2ème";
  if (position === 3) return "3ème";
  return `${position}ème`;
};

export const ClassementSection = () => { // TODO : lick to the BDD
    
    const { data, error, isLoading } = useSWR("/api/users/league", (url) => fetch(url).then((res) => res.json()));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    const { league: leagueName, rank: classement, totalUsers: nbParticipants } = data;

    return (
      <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 font-bold text-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Classement</h2>
          <Link href="/leaderboard" className="uppercase text-blue-400">
            Leaderboard
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <IconLeagueSvg leagueName={leagueName} plume={true} lock={false} />
          <p className="font-normal text-gray-500">
            Vous êtes {formatPosition(classement)} sur {nbParticipants} participants !
          </p>
        </div>
      </article>
    );
};

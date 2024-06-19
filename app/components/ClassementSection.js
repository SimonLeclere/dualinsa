import Link from "next/link";

import IconLeagueSvg from "../components/icons/LeaderboardSvg";

export const ClassementSection = () => {
  // TODO : lick to the BDD
  let leagueName = "Bronze";
  let classement = 12;
  let nbParticipants = 100;

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
          Vous êtes {classement}ème sur {nbParticipants} participants !
        </p>
      </div>
    </article>
  );
};

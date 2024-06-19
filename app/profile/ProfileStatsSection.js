import FireSvg from "/app/components/icons/FireSvg";
import LightningSvg from "/app/components/icons/LightningSvg";

import { IconLeagueSvg } from "../components/icons/LeaderboardSvg";
import LeagueMedalSvg from "/app/components/icons/LeagueSvg";
import LeaderboardPlaceSvg from "../components/icons/LeaderboardPlaceSvg";



export default function ProfileStatsSection() {
  /* TODO : Link to the BDD */
  const streak = 0;
  const totalXp = 125;
  const league = "Gold";
  const leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
  const topClassement = 4;

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">Statistiques</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <FireSvg empty={streak === 0} className="w-9 h-9" />
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                streak === 0 ? "text-gray-400" : "",
              ].join(" ")}
            >
              {streak}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Day streak
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <LightningSvg size={35} className="w-9 h-9" />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{totalXp}</span>
            <span className="text-sm text-gray-400 md:text-base">Total XP</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <IconLeagueSvg
            leagueName={league}
            plume={true}
            lock={false}
            className="w-9 h-9"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">
              {leagues.includes(league) ? league : "Unknow league"}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Ligue actuelle
            </span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          {topClassement >= 1 && topClassement <= 3 ? (
            <LeaderboardPlaceSvg place={topClassement} className="w-9 h-9" />
          ) : (
            <LeagueMedalSvg type="empty" className="w-9 h-9" />
          )}
          <div className="flex flex-col">
            <span
              className={[
                "text-xl font-bold",
                topClassement === 0 ? "text-gray-400" : "",
              ].join(" ")}
            >
              Top {topClassement}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              Classement
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};


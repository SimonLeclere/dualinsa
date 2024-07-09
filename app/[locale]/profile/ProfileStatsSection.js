import FireSvg from "/app/components/icons/FireSvg";
import LightningSvg from "/app/components/icons/LightningSvg";

import { IconLeagueSvg } from "../../components/icons/LeaderboardSvg";
import LeagueMedalSvg from "/app/components/icons/LeagueSvg";
import LeaderboardPlaceSvg from "../../components/icons/LeaderboardPlaceSvg";

import useSwr from "swr";
import { useLocale, useTranslations } from "next-intl";


export default function ProfileStatsSection({ totalXp }) {

  const t = useTranslations("Profile");
  const locale = useLocale();

  const { data: streak, error, isLoading } = useSwr(`/api/users/streaks/maxStreaks`, (url) => fetch(url).then((res) => res.json()));
  const { data: league, error1, isLoading1 } = useSwr('/api/users/league', (url) => fetch(url).then((res) => res.json()));

  const leagues = ["Bronze", "Silver", "Gold", "Platinum", "Diamond"];
  const topClassement = league?.rank || "Unknow";

  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold">{t('statsSectionTitle')}</h2>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <FireSvg empty={streak === 0} className="w-9 h-9" />
          <div className="flex flex-col">
            {(isLoading || isLoading1) && <p>...</p>}
            {(error || error1) && <p>Erreur</p>}
            {(streak?.message || league?.message) && <p>Erreur: {streak.message || league.message}</p>}
            <span className="text-xl font-bold">{streak || 0}</span>
            <span className="text-sm text-gray-400 md:text-base">{t('dayStreak')}</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <LightningSvg size={35} className="w-9 h-9" />
          <div className="flex flex-col">
            <span className="text-xl font-bold">{totalXp}</span>
            <span className="text-sm text-gray-400 md:text-base">{t('totalXp')}</span>
          </div>
        </div>
        <div className="flex gap-2 rounded-2xl border-2 border-gray-200 p-2 md:gap-3 md:px-6 md:py-4">
          <IconLeagueSvg
            leagueName={league?.league || "Unknow league"}
            plume={true}
            lock={false}
            className="w-9 h-9"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold">
              {leagues.includes(league?.league || "") ? league?.league || "Unknow league" : "Unknow league"}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              {t('currentLeague')}
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
              {t('rank', { topClassement })}
            </span>
            <span className="text-sm text-gray-400 md:text-base">
              {t('ranking')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};


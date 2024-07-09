import { Link } from "@/navigation";

import { LightningProgressSvg } from "../components/icons/LightningProgressSvg";
import useSWR from "swr";
import { useLocale, useTranslations } from "next-intl";

export const ProgressSection = ({ forNavBar = false }) => {

  const locale = useLocale();
  const t = useTranslations("Sidebar.Progress")

  const { data, error, isLoading } = useSWR(`/api/users/dailyGoal`, (url) => fetch(url).then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { dailyGoal: xpToday, dailyGoalPreference: goalXp } = data;

  if (forNavBar === false) { // Affichage dans RightBar
    return (
      <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 font-bold text-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{t('progressNavBarTitle')}</h2>
          <Link href="/settings/coach" className="uppercase text-blue-400">
            {t('editLink')}
          </Link>
        </div>
        <div className="flex gap-5">
          <LightningProgressSvg />
          <div className="flex grow flex-col justify-around">
            <h3 className="font-normal text-gray-500">{t('objective', { goalXp })}</h3>
            <div className="flex items-center gap-5">
              <div className="relative h-4 w-full grow rounded-full bg-gray-200">
                {xpToday > 0 && (
                  <div
                    className="absolute left-0 top-0 h-4 rounded-full bg-yellow-400"
                    style={{ width: `${Math.min(1, xpToday / goalXp) * 100}%` }}
                  >
                    <div className="absolute left-2 right-2 top-1 h-[6px] rounded-full bg-yellow-300"></div>
                  </div>
                )}
              </div>
              <div className="text-md shrink-0 font-normal text-gray-400">
                {t('xpRatio', { xpToday, goalXp })}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } else { // Affichage dans NavBar
    return (
      <>
        <LightningProgressSvg size={80} />
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-black">{t('progressNavBarTitle')}</h2>
          <p className="text-sm font-normal text-gray-400">
            <div className="flex grow flex-col justify-around">
              <div className="flex items-center gap-5 h-5 w-64">
                <div className="relative h-4 w-full grow rounded-full bg-gray-200">
                  {xpToday > 0 && (
                    <div
                      className="absolute left-0 top-0 h-4 rounded-full bg-yellow-400"
                      style={{
                        width: `${Math.min(1, xpToday / goalXp) * 100}%`,
                      }}
                    >
                      <div className="absolute left-2 right-2 top-1 h-[6px] rounded-full bg-yellow-300"></div>
                    </div>
                  )}
                </div>
                <div className="text-md shrink-0 font-normal text-gray-400">
                  {t('xpRatio', { xpToday, goalXp })}
                </div>
              </div>
            </div>
          </p>
          <Link
            className="font-bold uppercase text-blue-400 w-auto transition hover:brightness-110"
            href="/settings/coach"
          >
            {t('editLink')}
          </Link>
        </div>
      </>
    );
  }
};

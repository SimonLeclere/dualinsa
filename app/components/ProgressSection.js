import { Link } from "@/navigation";
import { LightningProgressSvg } from "../components/icons/LightningProgressSvg";
import useSWR from "swr";
import { useLocale, useTranslations } from "next-intl";

export const ProgressSection = ({ forNavBar = false }) => {

  const locale = useLocale();
  const t = useTranslations("Sidebar.Progress");

  const { data, error, isLoading } = useSWR(`/api/users/dailyGoal`, (url) => fetch(url).then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { dailyGoal: xpToday, dailyGoalPreference: goalXp } = data;

  if (forNavBar === false) { // Display in RightBar
    return (
      <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 font-bold text-gray-700 dark:text-gray-300 transition duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-xl">{t('progressNavBarTitle')}</h2>
          <Link href="/settings/coach" className="uppercase text-blue-400 dark:text-blue-300 transition duration-300">
            {t('editLink')}
          </Link>
        </div>
        <div className="flex gap-5">
          <LightningProgressSvg />
          <div className="flex grow flex-col justify-around">
            <h3 className="font-normal text-gray-500 dark:text-gray-400 transition duration-300">{t('objective', { goalXp })}</h3>
            <div className="flex items-center gap-5">
              <div className="relative h-4 w-full grow rounded-full bg-gray-200 dark:bg-gray-800 transition duration-300">
                {xpToday > 0 && (
                  <div
                    className="absolute left-0 top-0 h-4 rounded-full bg-yellow-400 dark:bg-yellow-500 transition duration-300"
                    style={{ width: `${Math.min(1, xpToday / goalXp) * 100}%` }}
                  >
                    <div className="absolute left-2 right-2 top-1 h-[6px] rounded-full bg-yellow-300 dark:bg-yellow-400 transition duration-300"></div>
                  </div>
                )}
              </div>
              <div className="text-md shrink-0 font-normal text-gray-400 dark:text-gray-500 transition duration-300">
                {t('xpRatio', { xpToday, goalXp })}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  } else { // Display in NavBar
    return (
      <>
        <LightningProgressSvg size={80} />
        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold text-black dark:text-white transition duration-300">{t('progressNavBarTitle')}</h2>
          <p className="text-sm font-normal text-gray-400 dark:text-gray-500 transition duration-300">
            <div className="flex grow flex-col justify-around">
              <div className="flex items-center gap-5 h-5 w-64">
                <div className="relative h-4 w-full grow rounded-full bg-gray-200 dark:bg-gray-800 transition duration-300">
                  {xpToday > 0 && (
                    <div
                      className="absolute left-0 top-0 h-4 rounded-full bg-yellow-400 dark:bg-yellow-500 transition duration-300"
                      style={{
                        width: `${Math.min(1, xpToday / goalXp) * 100}%`,
                      }}
                    >
                      <div className="absolute left-2 right-2 top-1 h-[6px] rounded-full bg-yellow-300 dark:bg-yellow-400 transition duration-300"></div>
                    </div>
                  )}
                </div>
                <div className="text-md shrink-0 font-normal text-gray-400 dark:text-gray-500 transition duration-300">
                  {t('xpRatio', { xpToday, goalXp })}
                </div>
              </div>
            </div>
          </p>
          <Link
            className="font-bold uppercase text-blue-400 dark:text-blue-300 w-auto transition duration-300 hover:brightness-110"
            href="/settings/coach"
          >
            {t('editLink')}
          </Link>
        </div>
      </>
    );
  }
};

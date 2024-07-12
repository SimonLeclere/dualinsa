import { Link } from "@/navigation";
import useSWR from "swr";

import { IconLeagueSvg } from "../components/icons/LeaderboardSvg";
import { useTranslations } from "next-intl";

export const ClassementSection = () => {

  const t = useTranslations("Sidebar.Ranking");
  
  const { data, error, isLoading } = useSWR(`/api/users/league`, (url) => fetch(url).then((res) => res.json()));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error...</div>;

  const { league: leagueName, rank, totalUsers } = data;

  return (
    <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-6 font-bold text-gray-700 dark:text-gray-300 transition duration-300">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{t('sectionTitle')}</h2>
        <Link href="/leaderboard" className="uppercase text-blue-400 dark:text-blue-300 transition duration-300">
          {t('leaderboardLink')}
        </Link>
      </div>

      <div className="flex items-center gap-6">
        <IconLeagueSvg leagueName={leagueName} plume={true} lock={false} />
        <p className="font-normal text-gray-500 dark:text-gray-400 transition duration-300">
          {t('greeting', { rank, totalUsers })}
        </p>
      </div>
    </article>
  );
};

import { Link } from "@/navigation";
import useSWR from "swr";

import { IconLeagueSvg } from "../components/icons/LeaderboardSvg";
import { useLocale, useTranslations } from "next-intl";

const formatPosition = (position) => {
  if (position === 1) return "1er";
  if (position === 2) return "2ème";
  if (position === 3) return "3ème";
  return `${position}ème`;
};

export const ClassementSection = () => {

    const t = useTranslations("Sidebar.Ranking");
    const locale = useLocale();
    
    const { data, error, isLoading } = useSWR(`/${locale}/api/users/league`, (url) => fetch(url).then((res) => res.json()));

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error...</div>;

    const { league: leagueName, rank, totalUsers } = data;

    return (
      <article className="flex flex-col gap-5 rounded-2xl border-2 border-gray-200 p-6 font-bold text-gray-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">{t('sectionTitle')}</h2>
          <Link href="/leaderboard" className="uppercase text-blue-400">
            {t('leaderboardLink')}
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <IconLeagueSvg leagueName={leagueName} plume={true} lock={false} />
          <p className="font-normal text-gray-500">
            {t('greeting', { rank, totalUsers })}
          </p>
        </div>
      </article>
    );
};

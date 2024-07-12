"use client";

import useSwr from "swr";
import { Link } from "@/navigation";
import HomeSvg from "/app/components/icons/HomeSvg";
import BooksSvg from "/app/components/icons/BooksSvg";
import LeaderboardSvg from "/app/components/icons/LeaderboardSvg";
import ProfileSvg from "/app/components/icons/ProfileSvg";
import { useTranslations } from "next-intl";

const bottomBarItems = [
  {
    name: "Learn",
    href: "/courses",
    routeName: "learn",
    icon: <HomeSvg />,
  },
  {
    name: "Cours",
    href: "/courses",
    routeName: "courses",
    icon: <BooksSvg />,
  },
  {
    name: "Leaderboard",
    href: "/leaderboard",
    routeName: "leaderboard",
    icon: <LeaderboardSvg />,
  },
  {
    name: "Profile",
    href: "/profile",
    routeName: "profile",
    icon: <ProfileSvg />,
  },
];

export default function BottomBar({ selectedTab }) {
  const t = useTranslations("BottomBar");

  const { data: lastCourse, error, isLoading } = useSwr('/api/users/lastCourse', (url) => fetch(url).then((res) => res.json()));

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <div>Loading...</div>;

  if (!isLoading && !error && lastCourse?.lastCourse && lastCourse?.lastCourse != "0") {
      bottomBarItems[0].href = `/courses/${lastCourse.lastCourse}`;
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 md:right-auto top-auto md:top-0 z-20 border-t-2 md:border-t-0 md:border-r-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-gray-900 flex-col md:flex-row lg:w-64 p-5 transition duration-300">
        <Link
          href="/courses"
          className="mb-5 ml-5 mt-5 hidden text-3xl font-feather font-bold text-purple-400 dark:text-purple-300 lg:block transition duration-300"
        >
          dualinsa
        </Link>

        <ul className="flex flex-row md:flex-col h-16 items-stretch gap-3">
          {bottomBarItems.map((item) => {
            return (
              <li
                key={`${item.routeName}-bottom-bar-${item.href}`}
                className="flex flex-1 items-center md:items-stretch justify-center md:justify-normal"
              >
                <Link
                  href={item.href}
                  className={`${
                    item.routeName === selectedTab
                      ? "border-2 border-sky-300 bg-sky-100 dark:border-sky-600 dark:bg-sky-900 text-blue-400 dark:text-blue-300"
                      : "text-gray-400 dark:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                  } flex grow items-center justify-center md:justify-start gap-3 rounded-xl px-2 py-1 text-sm font-bold uppercase transition duration-300`}
                >
                  {item.icon}
                  <span className="hidden lg:flex">{t(`items.${item.routeName}`) || ""}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

import Link from "next/link";

import HomeSvg from "/app/components/icons/HomeSvg";
import BooksSvg from "/app/components/icons/BooksSvg";
import LeaderboardSvg from "/app/components/icons/LeaderboardSvg";
import ProfileSvg from "/app/components/icons/ProfileSvg";

const bottomBarItems = [
    {
        name: "Learn",
        href: "/learn",
        routeName: 'learn',
        icon: <HomeSvg />
    },
    {
        name: "Cours",
        href: "/courses",
        routeName: 'courses',
        icon: <BooksSvg />
    },
    {
        name: "Leaderboard",
        href: "/leaderboard",
        routeName: 'leaderboard',
        icon: <LeaderboardSvg />
    },
    {
        name: "Profile",
        href: "/profile",
        routeName: 'profile',
        icon: <ProfileSvg />,
    },
];


export default function BottomBar({ selectedTab }) {

    return (
        <nav className="fixed bottom-0 left-0 right-0 md:right-auto top-auto md:top-0 z-20 border-t-2 md:border-t-0 md:border-r-2 border-neutral-200 bg-white flex-col md:flex-row lg:w-64 p-5">

            <Link
                href="/learn"
                className="mb-5 ml-5 mt-5 hidden text-3xl font-feather font-bold text-purple-400 lg:block"
            >
                dualinsa
            </Link>

            <ul className="flex flex-row md:flex-col h-16 items-stretch gap-3">
                {bottomBarItems.map((item) => {
                    return (
                        <li
                            key={item.href}
                            className="flex flex-1 items-center md:items-stretch justify-center md:justify-normal"
                        >
                            <Link
                                href={item.href}
                                className={`${item.routeName === selectedTab ? "border-2 border-sky-300 bg-sky-100 text-blue-400" : "text-gray-400 hover:bg-gray-100"} flex grow items-center justify-center md:justify-start gap-3 rounded-xl px-2 py-1 text-sm font-bold uppercase`}
                            >
                                {item.icon}
                                <span className="hidden lg:flex">{item.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};
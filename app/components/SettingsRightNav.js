import Link from "next/link";

const useSettingsPages = () => {
  return (
    ([
        { title: "Account", href: "/settings/account" },
        { title: "Edit Daily Goal", href: "/settings/coach" },
    ]));
};

export const SettingsRightNav = ({ selectedTab }) => {
    const settingsPages = useSettingsPages();
    return (
        <div className="hidden h-fit w-80 flex-col gap-1 rounded-2xl border-2 border-gray-200 p-5 lg:flex">
        {settingsPages.map(({ title, href }) => {
            return (
            <Link
                key={title}
                href={href}
                className={[
                "rounded-2xl p-4 font-bold hover:bg-gray-300",
                title === selectedTab ? "bg-gray-300" : "",
                ].join(" ")}
            >
                {title}
            </Link>
            );
        })}
        </div>
    );
};

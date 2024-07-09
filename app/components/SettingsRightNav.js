import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

export const SettingsRightNav = ({ selectedTab }) => {

    const t = useTranslations("Settings.RightNav");

    return (
        <div className="hidden h-fit w-80 flex-col gap-1 rounded-2xl border-2 border-gray-200 p-5 lg:flex">
            <Link
                href="/settings/account"
                className={`rounded-2xl p-4 font-bold hover:bg-gray-300 ${selectedTab === t('accountSectionTitle') ? "bg-gray-300" : ""}`}
            >
                {t('accountSectionTitle')}
            </Link>

            <Link
                href="/settings/coach"
                className={`rounded-2xl p-4 font-bold hover:bg-gray-300 ${selectedTab === t('dailyGoalSectionTitle') ? "bg-gray-300" : ""}`}
            >
                {t('dailyGoalSectionTitle')}
            </Link>
        </div>
    );
};

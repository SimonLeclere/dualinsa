'use client'

import { useRouter, Link } from '@/navigation';
import CloseSvg from "/app/components/icons/CloseSvg";
import Button from "/app/components/Button";
import { useTranslations } from "next-intl";
import { signOut } from "next-auth/react"
import { redirect } from "@/navigation";
import { useSession } from "next-auth/react";

export default function Signout() {
    const t = useTranslations("Auth.Signout");
    const router = useRouter();
    const session = useSession();

    if (session.status === "loading") return <div>Loading...</div>;
    if (session.status !== "authenticated") return redirect("/auth/signin");

    const handleSignout = async () => {
        await signOut();
        router.push('/');
    }

    return (
        <main className="fixed inset-0 z-30 flex flex-col bg-white dark:bg-gray-800 p-7 transition duration-300">
            <header className="flex flex-row-reverse justify-between sm:flex-row">
                <Link
                    className="flex text-gray-400 dark:text-gray-200"
                    href="/"
                >
                    <CloseSvg />
                </Link>
            </header>

            <div className="flex grow items-center justify-center">
                <div className="flex w-full flex-col gap-5 sm:w-96">
                    <h2 className="text-center text-2xl font-bold text-gray-800 dark:text-gray-100">
                        {t('signout')}
                    </h2>

                    <Button
                        color="sky"
                        onClick={handleSignout}
                    >
                        {t('confirmSignout')}
                    </Button>
                </div>
            </div>
        </main>
    );
};

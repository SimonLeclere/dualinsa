"use client";

import { Link } from "@/navigation";
import React from "react";

import GlobeSvg from "@/components/icons/GlobeSvg";
import bgSnow from "@/public/bg-snow.svg";

import LoginOrStartButtonsGroup from "./loginOrStartButtonsGroup";
import { useTranslations } from "next-intl";

export default function Home() {

  // const sess = useSession();

  // if (!sess.data) redirect("/auth/signin");

  const t = useTranslations("HomePage");

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center bg-sky-800 text-white"
      style={{ backgroundImage: `url(${bgSnow.src})` }}
    >
      <Link
        className="fixed left-0 top-0 px-10 py-4 text-white text-4xl font-feather"
        href="/"
      >
        {t('dualinsa')}
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-3 px-4 md:gap-36">
        <GlobeSvg className="h-fit w-7/12 md:w-[360px]" />

        <div>
          <p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12">
            {t('catchPhrase')}
          </p>

          <LoginOrStartButtonsGroup />
        </div>
      </div>
    </main>
  );
}

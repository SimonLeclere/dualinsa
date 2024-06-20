"use client";

import { useState } from "react";
import Link from "next/link";

import Calendar from "@/components/Calendar";

import FireSvg from "@/components/icons/FireSvg";
import GemSvg from "@/components/icons/GemSvg";
import LingotsTreasureChestSvg from "@/components/icons/LingotsTreasureChestSvg";
import { ProgressSection } from "./ProgessSection";

// type MenuState = "HIDDEN" | "STREAK" | "GEMS";

export default function NavBar({
  backgroundColor = "bg-purple-400",
  borderColor = "border-purple-500",
}) {
  const [menu, setMenu] = useState("HIDDEN");
  const [streak, setStreak] = useState(0);
  const [lingots, setLingots] = useState(0);

  return (
    <header className="fixed z-20 h-[58px] w-full">
      <div
        className={`relative flex h-full w-full items-center justify-around border-b-2 px-[10px] transition duration-500 md:hidden ${borderColor} ${backgroundColor}`}
      >
        <button
          className="flex items-center gap-2 font-bold text-white"
          onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
        >
          <FireSvg empty={streak === 0} />
          <span className={streak > 0 ? "text-white" : "text-black opacity-20"}>
            {streak}
          </span>
        </button>

        <button
          className="flex items-center gap-2 font-bold"
          onClick={() => setMenu((x) => (x === "GEMS" ? "HIDDEN" : "GEMS"))}
        >
          <GemSvg empty={lingots === 0} />
          <span
            className={lingots > 0 ? "text-white" : "text-black opacity-20"}
          >
            {lingots}
          </span>
        </button>

        {/* DROPDOWN MENU */}
        <div
          className={`absolute left-0 right-0 top-full bg-white transition duration-300 ${
            menu === "HIDDEN" ? "opacity-0" : "opacity-100"
          }`}
        >
          {(() => {
            switch (menu) {
              case "STREAK":
                return (
                  <div className="flex grow flex-col items-center gap-3 p-5 border-b-2 border-gray-300">
                    <h2 className="text-xl font-bold">Streak</h2>
                    <p className="text-sm text-gray-400">
                      {`Practice each day so your streak won't reset!`}
                    </p>
                    <div className="self-stretch">
                      <Calendar />
                    </div>
                  </div>
                );

              case "GEMS":
                return (
                  <>
                    <div className="flex grow items-center gap-3 p-5 border-b-2 border-gray-300">
                      <LingotsTreasureChestSvg className="h-20 w-20" />
                      <div className="flex flex-col gap-3">
                        <h2 className="text-xl font-bold text-black">
                          Lingots
                        </h2>
                        <p className="text-sm font-normal text-gray-400">
                          You have {lingots}{" "}
                          {lingots === 1 ? "lingot" : "lingots"}.
                        </p>
                        <Link
                          className="font-bold uppercase text-blue-400 transition hover:brightness-110"
                          href="/shop"
                        >
                          Go to shop
                        </Link>
                      </div>
                    </div>

                    <div className="flex grow items-center gap-3 p-5 border-b-2 border-gray-300">
                      <ProgressSection forNavBar={true} />
                    </div>
                  </>
                );

              case "HIDDEN":
                return null;
            }
          })()}
          <div
            className={[
              "absolute left-0 top-full h-screen w-screen bg-black opacity-30 z-10",
              menu === "HIDDEN" ? "pointer-events-none" : "",
            ].join(" ")}
            onClick={() => setMenu("HIDDEN")}
            aria-label="Hide menu"
            role="button"
          ></div>
        </div>
      </div>
    </header>
  );
}

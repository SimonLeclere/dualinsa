"use client"

import FireSvg from "./icons/FireSvg";
import EmptyFireSvg from "./icons/EmptyFireSvg";
import Calendar from "./Calendar";
import GemSvg from "./icons/GemSvg";
import EmptyGemSvg from "./icons/EmptyGemSvg";
import LingotsTreasureChestSvg from "./icons/LingotsTreasureChestSvg";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";
import React from "react";

export default function StreakCoinSection() {
    const streak = 2;
    const lingots = 4;
    const [streakShown, setStreakShown] = React.useState(false);
    const [gemsShown, setGemsShown] = React.useState(false);


    return (
      <>
        <span
          className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-orange-500 hover:bg-gray-100"
          onMouseEnter={() => setStreakShown(true)}
          onMouseLeave={() => {
            setStreakShown(false);
          }}
          onClick={(event) => {
            if (event.target !== event.currentTarget) return;
            setStreakShown((x) => !x);
          }}
          role="button"
          tabIndex={0}
        >
          <div className="pointer-events-none">
            {streak > 0 ? <FireSvg /> : <EmptyFireSvg />}
          </div>
          <span className={streak > 0 ? "text-orange-500" : "text-gray-300"}>
            {streak}
          </span>
          <div
            className="absolute top-full z-10 flex flex-col gap-5 rounded-2xl border-2 border-gray-300 bg-white p-5 text-black"
            style={{
              left: "calc(50% - 200px)",
              width: 400,
              display: streakShown ? "flex" : "none",
            }}
          >
            <h2 className="text-center text-lg font-bold">Streak</h2>
            <p className="text-center text-sm font-normal text-gray-400">
              Mais votre série sera remise à zéro demain si vous ne vous
              entraînez pas demain. Attention !
            </p>
            <Calendar />
          </div>
        </span>
        <span
          className="relative flex items-center gap-2 rounded-xl p-3 font-bold text-red-500 hover:bg-gray-100"
          onMouseEnter={() => setGemsShown(true)}
          onMouseLeave={() => setGemsShown(false)}
          onClick={() => setGemsShown((x) => !x)}
          role="button"
          tabIndex={0}
        >
          {lingots > 0 ? <GemSvg /> : <EmptyGemSvg />}
          <span className={lingots > 0 ? "text-red-500" : "text-gray-300"}>
            {lingots}
          </span>
        </span>
      </>
    );
}
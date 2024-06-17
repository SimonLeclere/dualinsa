'use client';

import { useState } from "react";
import Link from "next/link";

import Calendar from "@/components/Calendar"

import FireSvg from "@/components/icons/FireSvg";
import CoinSvg from "@/components/icons/CoinSvg";
import CoinStackSvg from "@/components/icons/CoinStackSvg";

// type MenuState = "HIDDEN" | "STREAK" | "GEMS";

const streaks = [
    { date: new Date(2024, 4, 15), userId: 2 },
    { date: new Date(2024, 4, 16), userId: 2 },
    { date: new Date(2024, 4, 17), userId: 2 },

    { date: new Date(2024, 5, 12), userId: 2 },
    { date: new Date(2024, 5, 13), userId: 2 },
    { date: new Date(2024, 5, 14), userId: 2 },
    { date: new Date(2024, 5, 15), userId: 2 },
    { date: new Date(2024, 5, 16), userId: 2 },
];



export default function NavBar({ backgroundColor = "bg-purple-400", borderColor = "border-purple-500" }) {

    const [menu, setMenu] = useState("HIDDEN");
    const [streak, setStreak] = useState(0);
    const [score, setLingots] = useState(0);

    return (
        <header className="fixed z-20 h-[58px] w-full">
            <div className={`relative flex h-full w-full items-center justify-around border-b-2 px-[10px] transition duration-500 md:hidden ${borderColor} ${backgroundColor}`}>

                <button
                    className="flex items-center gap-2 font-bold text-white"
                    onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
                >
                    <FireSvg empty={streak === 0} />
                    <span className={streak > 0 ? "text-white" : "text-black opacity-20"}>{streak}</span>
                </button>

                <button
                    className="flex items-center gap-2 font-bold"
                    onClick={() => setMenu((x) => (x === "GEMS" ? "HIDDEN" : "GEMS"))}
                >
                    <CoinSvg empty={score === 0} />
                    {/* <GemSvg empty={score === 0}/> */}
                    <span className={score > 0 ? "text-white" : "text-black opacity-20"}>{score}</span>
                </button>

                {/* DROPDOWN MENU */}
                <div className={`absolute left-0 right-0 top-full bg-white transition duration-300 ${menu === "HIDDEN" ? "opacity-0" : "opacity-100"}`}>
                    {(() => {
                        switch (menu) {
                            case "STREAK":
                                return (
                                    <div className="flex grow flex-col items-center gap-3 p-5">
                                        <h2 className="text-xl font-bold">Streak</h2>
                                        <p className="text-sm text-gray-400">
                                            {`Practice each day so your streak won't reset!`}
                                        </p>
                                        <div className="self-stretch">
                                            <Calendar streaks={streaks} />
                                        </div>
                                    </div>
                                );

                            case "GEMS":
                                return (
                                    <div className="flex grow items-center gap-3 p-5">
                                        <CoinStackSvg className="h-24 w-24" />
                                        <div className="flex flex-col gap-3">
                                            <h2 className="text-xl font-bold text-black">Experience</h2>
                                            <p className="text-sm font-normal text-gray-400">
                                                Vous avez {score}{" "} xp
                                            </p>
                                            <Link
                                                className="font-bold uppercase text-blue-400 transition hover:brightness-110"
                                                href="/leaderboard"
                                            >
                                                Leaderboard
                                            </Link>
                                        </div>
                                    </div>
                                );

                            case "HIDDEN":
                                return null;
                        }
                    })()}
                    <div
                        className={[
                            "absolute left-0 top-full h-screen w-screen bg-black opacity-30",
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
};
'use client';

import { useState } from "react";

import Link from "next/link";
// import { Calendar } from "./Calendar";

import FireSvg from "@/components/icons/FireSvg";
import GemSvg from "@/components/icons/GemSvg";
import MoreOptionsSvg from "@/components/icons/MoreOptionsSvg";
import LighterSvg from "@/components/icons/LighterSvg";

// type MenuState = "HIDDEN" | "COURSES" | "STREAK" | "GEMS" | "MORE";

export default function NavBar({ backgroundColor = "bg-purple-400", borderColor = "border-purple-500" }) {

    const [menu, setMenu] = useState("HIDDEN");
    const [now, setNow] = useState(new Date());
    const [streak, setStreak] = useState(0);
    const [lingots, setLingots] = useState(0);
    const [language, setLanguage] = useState({ name: "French" });

    return (
        <header className="fixed z-20 h-[58px] w-full">
            <div className={`relative flex h-full w-full items-center justify-between border-b-2 px-[10px] transition duration-500 sm:hidden ${borderColor} ${backgroundColor}`}>
                <button onClick={() => setMenu((x) => (x === "COURSES" ? "HIDDEN" : "COURSES"))}>
                    placeholder
                </button>

                <button
                    className="flex items-center gap-2 font-bold text-white"
                    onClick={() => setMenu((x) => (x === "STREAK" ? "HIDDEN" : "STREAK"))}
                >
                    <FireSvg empty={streak === 0} />{" "}
                    <span className={streak > 0 ? "text-white" : "text-black opacity-20"}>
                        {streak}
                    </span>
                </button>

                <button
                    className="flex items-center gap-2 font-bold"
                    onClick={() => setMenu((x) => (x === "GEMS" ? "HIDDEN" : "GEMS"))}
                >
                    <GemSvg empty={lingots === 0}/>
                    <span className={lingots > 0 ? "text-white" : "text-black opacity-20"}>
                        {lingots}
                    </span>
                </button>

                <MoreOptionsSvg
                    onClick={() => setMenu((x) => (x === "MORE" ? "HIDDEN" : "MORE"))}
                    role="button"
                />

                <div className={`absolute left-0 right-0 top-full bg-white transition duration-300 ${menu === "HIDDEN" ? "opacity-0" : "opacity-100"}`}>
                    {(() => {
                        switch (menu) {
                            case "COURSES":
                                return (
                                    <div className="flex gap-5 p-5">
                                        <div className="flex flex-col items-center justify-between gap-2">
                                            <LighterSvg className="h-10 w-10" />
                                            <span className="font-bold">Thermochimie</span>
                                        </div>
                                        <Link
                                            className="flex flex-col items-center justify-between gap-2"
                                            href="/register"
                                        >
                                            <div className="rounded-2xl border-4 border-white">
                                                +{/* <AddLanguageSvg className="h-16 w-20" /> */}
                                            </div>
                                            <span className="font-bold text-gray-400">Courses</span>
                                        </Link>
                                    </div>
                                );

                            case "STREAK":
                                return (
                                    <div className="flex grow flex-col items-center gap-3 p-5">
                                        <h2 className="text-xl font-bold">Streak</h2>
                                        <p className="text-sm text-gray-400">
                                            {`Practice each day so your streak won't reset!`}
                                        </p>
                                        <div className="self-stretch">
                                            {/* <Calendar now={now} setNow={setNow} /> */}
                                        </div>
                                    </div>
                                );

                            case "GEMS":
                                return (
                                    <div className="flex grow items-center gap-3 p-5">
                                        {/* <LingotsTreasureChestSvg className="h-24 w-24" /> */}
                                        <div className="flex flex-col gap-3">
                                            <h2 className="text-xl font-bold text-black">Lingots</h2>
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
                                );

                            case "MORE":
                                return (
                                    <div className="flex grow flex-col">
                                        <Link
                                            className="flex items-center gap-2 p-2 font-bold text-gray-700"
                                            href="https://podcast.duolingo.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Podcast
                                        </Link>
                                        <Link
                                            className="flex items-center gap-2 border-t-2 border-gray-300 p-2 font-bold text-gray-700"
                                            href="https://schools.duolingo.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Schools
                                        </Link>
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
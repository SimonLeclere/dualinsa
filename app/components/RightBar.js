'use client';

import { useState } from "react";

import React from 'react';

import Calendar from "/app/components/Calendar"

import ProgressSection  from "@/components/ProgressSection";
import FireSvg from "/app/components/icons/FireSvg"; 
import CoinSvg from "/app/components/icons/CoinSvg";

export default function RightBar() {
    const [streak, setStreak] = useState(0);
    const [score, setScore] = useState(0);
    const [menu, setMenu] = useState('HIDDEN'); 

    const borderColor = 'border-gray-200';
    const backgroundColor = 'bg-white';

    const streaks = []; 

    return (
        <header className="fixed z-20 h-[58px] w-full">
            <div className={`relative flex h-full w-full items-center justify-around border-b-2 px-[10px] transition duration-500 md:hidden ${borderColor} ${backgroundColor}`}>

               
                <button
                    className="flex items-center gap-2 font-bold text-white"
                    onClick={() => setMenu((x) => (x === 'STREAK' ? 'HIDDEN' : 'STREAK'))}
                >
                    <FireSvg empty={streak === 0} />
                    <span className={streak > 0 ? 'text-white' : 'text-black opacity-20'}>{streak}</span>
                </button>

                
                <button
                    className="flex items-center gap-2 font-bold"
                    onClick={() => setMenu((x) => (x === 'GEMS' ? 'HIDDEN' : 'GEMS'))}
                >
                    <CoinSvg empty={score === 0} />
      
                    <span className={score > 0 ? 'text-white' : 'text-black opacity-20'}>{score}</span>
                </button>

                {/* DROPDOWN MENU */}
                <div className={`absolute left-0 right-0 top-full bg-white transition duration-300 ${menu === 'HIDDEN' ? 'opacity-0' : 'opacity-100'}`}>
                    {(() => {
                        switch (menu) {
                            case 'STREAK':
                                return (
                                    <div className="flex grow flex-col items-center gap-3 p-5">
                                        <h2 className="text-xl font-bold">Streak</h2>
                                        <p className="text-sm text-gray-400">
                                            {`Practice each day so your streak won't reset!`}
                                        </p>
                                        <div className="self-stretch">
                                            {/* Assuming Calendar component is defined and streaks array is passed */}
                                            {/* <Calendar streaks={streaks} /> */}
                                        </div>
                                    </div>
                                );

                            case 'GEMS':
                                return (
                                    <div className="flex grow items-center gap-3 p-5">
                                        <CoinStackSvg className="h-24 w-24" />
                                        <div className="flex flex-col gap-3">
                                            <h2 className="text-xl font-bold text-black">Experience</h2>
                                            <p className="text-sm font-normal text-gray-400">
                                                Vous avez {score} XP
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

                            case 'HIDDEN':
                                return null;

                            default:
                                return null;
                        }
                    })()}
                    <div
                        className={[
                            'absolute left-0 top-full h-screen w-screen bg-black opacity-30',
                            menu === 'HIDDEN' ? 'pointer-events-none' : '',
                        ].join(' ')}
                        onClick={() => setMenu('HIDDEN')}
                        aria-label="Hide menu"
                        role="button"
                    ></div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <ProgressSection />
            </div>
        </header>
    );
}
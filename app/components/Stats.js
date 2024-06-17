"use client";

import { useState } from "react";

export default function Stats({ streak = 0, totalXP = 0 }) {


    return (
        <section>
            <h2 className = "mb-5 text-2xl font-bold text-center">Statistiques</h2>
            <div className = "flex justify-between">
                <div className = "border border-gray-800 rounded-2xl">
                    <h3 className = "text-xl font-bold">Streak</h3>
                    <p className = "text-center">{streak}</p>
                </div>
                <div className = "border border-gray-800 rounded-2xl">
                    <h3 className = "text-xl font-bold">Total XP</h3>
                    <p className = "text-center">{totalXP}</p>
                </div>
            </div>
        </section>
    )
}
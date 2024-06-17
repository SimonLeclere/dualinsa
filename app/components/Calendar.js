'use client';

import { useState } from "react";
import ChevronSvg from "@/components/icons/ChevronSvg";

const range = (lo, hi) => {
    const result = Array(hi - lo);
    for (let i = lo; i < hi; i++) {
        result[i - lo] = i;
    }
    return result;
};

const getFirstDayOfWeek = (y, m) => {
    var firstDay = new Date(y, m, 1);
    return firstDay.getDay();
};

const dateEquals = (a, b) => {
    return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
};

const getDaysInMonth = (y, m) => {
    return new Date(y, m + 1, 0).getDate();
};

const getCalendarDays = (now) => {
    const startOfMonth = getFirstDayOfWeek(now.getFullYear(), now.getMonth());
    const calendarDays = [];
    const firstWeekEndDate = 8 - startOfMonth;
    
    const firstWeek = [...range(0, startOfMonth).map(() => null), ...range(1, firstWeekEndDate)];
    calendarDays.push(firstWeek);

    const daysCount = getDaysInMonth(now.getFullYear(), now.getMonth());

    for (let weekStartDate = firstWeekEndDate; weekStartDate <= daysCount; weekStartDate += 7) {
        calendarDays.push(
            range(weekStartDate, weekStartDate + 7).map((date) =>
                date <= daysCount ? date : null,
            ),
        );
    }
    return calendarDays;
};

export default function Calendar({ streaks }) {

    const [now, setNow] = useState(new Date());

    let formatter = new Intl.DateTimeFormat('en-EN', { month: "long", year: 'numeric' });
    const formattedNowMonth = formatter.format(now);
    const staticNow = new Date();
    const calendarDays = getCalendarDays(now);

    const handlePrevMonth = () => {
        setNow((now) => new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()));
    };

    const handleNextMonth = () => {
        setNow((now) => new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()));
    };

    return (
        <article className="flex flex-col rounded-xl border-2 border-gray-300 p-3 text-gray-400">
            <header className="flex items-center justify-between gap-3">
                <button
                    className="text-gray-400"
                    onClick={handlePrevMonth}
                >
                    <ChevronSvg direction="left" />
                    <span className="sr-only">Go to previous month</span>
                </button>
                <h3 className="text-lg font-bold uppercase text-gray-500">
                    {formattedNowMonth}
                </h3>
                <button
                    className="text-gray-400"
                    onClick={handleNextMonth}
                >
                    <ChevronSvg direction="right" />
                    <span className="sr-only">Go to next month</span>
                </button>
            </header>
            <div className="flex justify-between px-3 py-2">
                {"SMTWTFS".split("").map((day, i) => {
                    return (
                        <div key={i} className="flex h-9 w-9 items-center justify-center">
                            {day}
                        </div>
                    );
                })}
            </div>
            <div className="flex flex-col gap-3 px-3 py-2">
                {calendarDays.map((week, i) => {
                    return (
                        <div key={i} className="flex justify-between">
                            {week.map((date, i) => {
                                const isActiveDate = date !== null && streaks.some((streak) => dateEquals(streak.date, new Date(now.getFullYear(), now.getMonth(), date)));
                                const isCurrentDate = date === staticNow.getDate() && now.getMonth() === staticNow.getMonth() && now.getFullYear() === staticNow.getFullYear();
                                
                                return (
                                    <div
                                        key={i}
                                        className={[
                                            "flex h-9 w-9 items-center justify-center rounded-full",
                                            isActiveDate
                                                ? "bg-orange-400 text-white"
                                                : isCurrentDate
                                                    ? "bg-gray-300 text-gray-600"
                                                    : "",
                                        ].join(" ")}
                                    >
                                        {date}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </article>
    );
};

'use client'

import useSwr from "swr";
import { useState } from "react";
import { useTranslations } from "next-intl";

import Image from "next/image";
import Link from "next/link";

import NavBar from "/app/components/NavBar";
import RightBar from "/app/components/RightBar";
import BottomBar from "/app/components/BottomBar";

import lighterImg from "/public/lighter.png";
import beakerImg from "/public/beaker.png";
import pistonImg from "/public/piston.png";

const icons = {
    lighter: <Image src={lighterImg.src} alt="lighter" width="80" height="80" className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />,
    beaker: <Image src={beakerImg.src} alt="beaker" width="80" height="80" className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />,
    piston: <Image src={pistonImg.src} alt="piston" width="80" height="80" className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />
}

export default function CoursesList() {

    const t = useTranslations("CoursesList");

    const { data: courses, error, isLoading, mutate } = useSwr('/api/courses/listAll', (url) => fetch(url).then((res) => res.json()));
    const [enrollLoading, setEnrollLoading] = useState(false); // false or courseId

    const handleEnroll = async (e, courseId) => {
        e.preventDefault();

        if (enrollLoading) return;
        setEnrollLoading(courseId);

        const result = await fetch('/api/courses/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ course_id: courseId })
        });

        if (result.ok) {
            setEnrollLoading(false);
            mutate([
                ...courses.map(course => {
                    if (course.id === courseId) {
                        course.isEnrolled = true;
                    }
                    return course;
                })
            ], false);
        }
    }

    return (
        <div className="flex justify-center gap-3 md:ml-24 lg:ml-64 lg:gap-12">
            <NavBar />
            <div className="flex max-w-2xl grow flex-col pt-14 sm:pt-10">

                <div className="px-4 pb-20">
                    <div className="py-7">
                        <h2 className="mb-5 text-2xl font-bold">{t('courses')}</h2>

                        {isLoading && <p>Chargement...</p>}
                        {error && <p>Erreur de chargement</p>}
                        {!isLoading && error && courses.message ? <div>Erreur: {courses?.message || ""}</div> : ""}

                        {
                            courses &&
                            courses
                                // enrolled courses first, then the rest
                                .sort((a, b) => b.isEnrolled - a.isEnrolled)
                                .map((course) => {
                                    return (
                                        <Link
                                            key={course.id}
                                            className={`flex border-t-2 border-gray-300 py-5 ${course.isEnrolled ? 'cursor-pointer' : 'cursor-default'}`}
                                            href={course.isEnrolled ? `/courses/${course.id}` : "#"}
                                        >
                                            {icons.lighter}
                                            <section className="flex flex-col w-full gap-3">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                    <h3 className="text-lg font-bold">{course.name}</h3>
                                                    <div className="w-fit inline-flex h-7 rounded-full bg-gray-200 px-3 py-1 text-sm font-bold uppercase text-gray-400 whitespace-nowrap">
                                                        {t('semester', { semester: course.semester })}
                                                    </div>
                                                </div>

                                                <p className="text-sm text-gray-500">
                                                    {course.description}
                                                </p>

                                                <button
                                                    className={`flex w-fit items-center gap-1 rounded-2xl border-2 bg-white px-4 py-2 text-sm font-bold uppercase ${course.isEnrolled ? 'border-gray-300 text-gray-300' : 'border-gray-500 text-gray-500'}`}
                                                    disabled={course.isEnrolled || enrollLoading === course.id}
                                                    onClick={(e) => handleEnroll(e, course.id)}
                                                >
                                                    <svg className={`${enrollLoading !== course.id && "hidden"} animate-spin mr-3 ml-1 h-5 w-5 text-gray-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    {course.isEnrolled ? t('alreadyEnrolled') : t('enroll')}
                                                </button>
                                            </section>
                                        </Link>
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
            <RightBar />
            <BottomBar selectedTab="courses" />
        </div>
    );
};
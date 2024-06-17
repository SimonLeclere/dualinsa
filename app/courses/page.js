'use client'

import Image from "next/image";
import Link from "next/link";

import NavBar from "/app/components/NavBar";
import BottomBar from "/app/components/BottomBar";

// import { LeftBar } from "~/components/LeftBar";
// import { TopBar } from "~/components/TopBar";

import lighterImg from "/public/lighter.png";
import beakerImg from "/public/beaker.png";
import pistonImg from "/public/piston.png";

const icons = {
    lighter: <Image src={lighterImg.src} alt="lighter" width="80" height="80" className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />,
    beaker: <Image src={beakerImg.src} alt="beaker" width="80" height="80" className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />,
    piston: <Image src={pistonImg.src} alt="piston" width="80" height="80" className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />
}

const courses = [
    {
        id: 1,
        name: "Thermochimie",
        description: "Apprends à étudier les échanges d'énergie lors de réactions chimiques !",
        department: "stpi",
        icon: 'lighter',
        semester: 2,
        celeneLink: "https://celene.insa-cvl.fr"
    },
    {
        id: 2,
        name: "Mécanique des fluides",
        description: "Apprends à décrire les fluides et leurs propriétés !",
        department: "mri",
        icon: 'beaker',
        semester: 3,
        celeneLink: "https://celene.insa-cvl.fr"
    },
    {
        id: 3,
        name: "Mécanismes et assemblages",
        description: "Apprends à décrire des systèmes mécaniques complexes !",
        department: "mri",
        icon: 'piston',
        semester: 3,
        celeneLink: "https://celene.insa-cvl.fr"
    
    }
]

const userCourses = [
    {
        userId: 2,
        courseId: 1,
        currentUnitIndex: 0,
        currentUnitCheckpointIndex: 0
    }
]

export default function CoursesList() {

    return (
        <div>
            <NavBar />
            <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
                <div className="px-4 pb-20">
                    <div className="py-7">
                        <h2 className="mb-5 text-2xl font-bold">Matières</h2>

                        {
                            courses
                            .sort((a, b) => userCourses.some(uc => uc.courseId === b.id) - userCourses.some(uc => uc.courseId === a.id))
                            .map((course) => {
                                return (
                                    <Link
                                        key={course.id}
                                        className={`flex border-t-2 border-gray-300 py-5 ${userCourses.find((uc) => uc.courseId === course.id) ? 'cursor-pointer' : 'cursor-default'}`}
                                        href={userCourses.find((uc) => uc.courseId === course.id) ? `/courses/${course.id}` : "#"}
                                    >
                                        {icons[course.icon]}
                                        <section className="flex flex-col w-full gap-3">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg font-bold">{course.name}</h3>
                                                <div className="inline-flex h-7 rounded-full bg-gray-200 px-3 py-1 text-sm font-bold uppercase text-gray-400 whitespace-nowrap">
                                                    Semestre {course.semester}
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-500">
                                                {course.description}
                                            </p>
                                            
                                            <button
                                                className={`flex w-fit items-center gap-1 rounded-2xl border-2 bg-white px-4 py-2 text-sm font-bold uppercase ${userCourses.find((uc) => uc.courseId === course.id) ? 'border-gray-300 text-gray-300' : 'border-gray-500 text-gray-500'}`}
                                                disabled={userCourses.find((uc) => uc.courseId === course.id)}
                                                onClick={(e) => e.preventDefault()}
                                            >
                                                {userCourses.find((uc) => uc.courseId === course.id) ? 'Déjà inscrit' : 'S\'inscrire'}
                                            </button>
                                        </section>
                                    </Link>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <BottomBar selectedTab="courses" />
        </div>
    );
};
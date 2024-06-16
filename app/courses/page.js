import NavBar from "../components/NavBar";

// import { BottomBar } from "~/components/BottomBar";
// import { LeftBar } from "~/components/LeftBar";
// import { TopBar } from "~/components/TopBar";

import LighterSvg from "../components/icons/LighterSvg";

export default function CoursesList() {

    return (
        <div>
            <NavBar />
            {/* <LeftBar selectedTab="Shop" /> */}
            <div className="flex justify-center gap-3 pt-14 sm:p-6 sm:pt-10 md:ml-24 lg:ml-64 lg:gap-12">
                <div className="px-4 pb-20">
                    <div className="py-7">
                        <h2 className="mb-5 text-2xl font-bold">Matières</h2>

                        <div className="flex border-t-2 border-gray-300 py-5">
                            <LighterSvg className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />
                            <section className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold">Thermochimie</h3>
                                    <div className="inline-flex w-fit h-7 rounded-full bg-gray-200 px-3 py-1 text-sm font-bold uppercase text-gray-400">
                                        Semestre 2
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500">
                                    Apprends à étudier les échanges d&quot;énergie lors de réactions chimiques !
                                </p>
                                
                                <button
                                    className="flex w-fit items-center gap-1 rounded-2xl border-2 border-gray-300 bg-white px-4 py-2 text-sm font-bold uppercase text-gray-300"
                                    disabled
                                >
                                    Déjà inscrit
                                </button>

                            </section>
                        </div>

                        <div className="flex border-t-2 border-gray-300 py-5">
                            <LighterSvg className="flex-shrink-0 mx-4 w-20 h-20 sm:mx-16 sm:w-24 sm:h-24" />
                            <section className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-bold">Thermochimie</h3>
                                    <div className="inline-flex w-fit h-7 rounded-full bg-gray-200 px-3 py-1 text-sm font-bold uppercase text-gray-400">
                                        Semestre 2
                                    </div>
                                </div>
                                
                                <p className="text-sm text-gray-500">
                                    Apprends à étudier les échanges d&quot;énergie lors de réactions chimiques !
                                </p>
                                
                                <button
                                    className="flex w-fit items-center gap-1 rounded-2xl border-2 border-gray-500 bg-white px-4 py-2 text-sm font-bold uppercase text-gray-500"
                                >
                                    S&apos;inscrire
                                </button>
                            </section>
                        </div>

                    </div>
                </div>
                {/* <RightBar /> */}
            </div>
            {/* <BottomBar selectedTab="Shop" /> */}
        </div>
    );
};
"use client";

import useSwr from "swr";

import NavBar from "/app/components/NavBar";
import BottomBar from "/app/components/BottomBar";

export default function CoursePage() {

    const {data, error, isLoading} = useSwr('/api/courses', (url) => fetch(url).then(res => res.json()));
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    const units = data?.units; // All units from the course with all their checkpoints
    const advancement = data?.advancement; // User advancement in the course
    // advancement.currentUnitIndex & advancement.currentCheckpointIndex

    return (
        <div className="flex flex-col h-screen">
            <NavBar />
            <div className="flex flex-grow items-center justify-center">
                <h1 className="text-4xl font-bold">Cours</h1>
            </div>
            <BottomBar selectedTab="courses" />
        </div>
    );
}
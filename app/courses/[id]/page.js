import NavBar from "/app/components/NavBar";
import BottomBar from "/app/components/BottomBar";

export default function CoursePage() {
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
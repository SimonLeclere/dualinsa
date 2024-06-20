import { ClassementSection } from "./ClassementSection";
import { ProgressSection } from "./ProgressSection";
import StreakCoinSection from "./StreakCoinSection";
import PatagerSection from "./ShareSection";


export default function RightBar() {
    return (
        <aside className="sticky top-0 pt-8 w-96 flex-col gap-8 self-start hidden md:flex ">
            <article className="my-6 flex justify-around gap-4">
                <StreakCoinSection />
            </article>
            <ProgressSection />
            <ClassementSection />
            <PatagerSection />
        </aside>
    );
}
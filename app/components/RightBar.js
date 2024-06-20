import { ClassementSection } from "./ClassementSection";
import { ProgressSection } from "./ProgessSection"; 
import StreakCoinSection from "./StreakCoinSection";
import PatagerSection from "./PartagerSection";


export default function RightBar() {
    return (
      <aside className="sticky top-0 mt-8 w-96 flex-col gap-8 self-start hidden md:flex ">
        <article className="my-6 flex justify-around gap-4">
          <StreakCoinSection />
        </article>
          <ProgressSection />
          <ClassementSection />
          <PatagerSection />
      </aside>
    );
}
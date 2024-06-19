import { ClassementSection } from "./ClassementSection";
import { ProgressSection } from "./ProgessSection"; 
import StreakCoinSection from "./StreakCoinSection";


export default function RightBar() {
    return (
      <div className="sticky top-0 mt-8 w-96 flex-col gap-8 self-start sm:flex">
        <div className="my-6 flex justify-between gap-4">
          <StreakCoinSection />
        </div>
        <ProgressSection />
        <ClassementSection />
      </div>
    );
}
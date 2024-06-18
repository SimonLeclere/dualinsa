import { ProgressSection } from "../components/ProgressSection";
import { ClassementSection } from "../components/ClassementSection";

export default function test() {
  return (
    <div className="flex flex-col gap-5">
      <ProgressSection />
      <ClassementSection />
    </div>
  );
}

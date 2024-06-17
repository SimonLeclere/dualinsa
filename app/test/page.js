import { DailyQuestsSection, XpProgressSection } from "../components/RightSection";

export default function test() {
  return (
    <div className="flex flex-col gap-5">
      <DailyQuestsSection />
        <XpProgressSection />
    </div>
  );
}

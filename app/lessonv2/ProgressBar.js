import CloseSvg from "../components/icons/CloseSvg";

export default function ProgressBar({ currentQuestionIndex, totalCorrectAnswersNeeded, setQuitMessageShown }) {
  return (
    <header className="flex items-center gap-4">
      
      <button
        className="text-gray-400"
        onClick={() => setQuitMessageShown(true)}
      >
        <CloseSvg />
      </button>

      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalCorrectAnswersNeeded}
        aria-valuenow={currentQuestionIndex}
      >
        <div
          className={
            "h-full rounded-full bg-green-500 transition-all duration-700 " +
            (currentQuestionIndex > 0 ? "px-2 pt-1 " : "")
          }
          style={{
            width: `${(currentQuestionIndex / totalCorrectAnswersNeeded) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-green-400"></div>
        </div>
      </div>

      <span className="flex justify-center gap-2 text-lg font-bold">2 : 30</span>

    </header>
  );
};

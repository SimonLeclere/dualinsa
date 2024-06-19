import Link from "next/link";
import CloseSvg from "../components/icons/CloseSvg";
import TimeLeft from "../components/TimeLeft";

// Fonction qui affiche la barre de progression de la leçon en cours (nombre de réponses correctes, nombre de réponses correctes nécessaires, message de quitter la leçon, nombre de vies restantes)
export default function ProgressBar({
  correctAnswerCount,
  incorrectAnswerCount,
  totalCorrectAnswersNeeded,
  setQuitMessageShown,
  startTime,
  endTime,
}) {
  return (
    <header className="flex items-center gap-4">
      {correctAnswerCount === 0 ? (
        <Link href="/learn" className="text-gray-400">
          <CloseSvg />
          <span className="sr-only">Quitter la leçon</span>
        </Link>
      ) : (
        <button
          className="text-gray-400"
          onClick={() => setQuitMessageShown(true)}
        >
          <CloseSvg />
          <span className="sr-only">Quitter la leçon</span>
        </button>
      )}
      <div
        className="h-4 grow rounded-full bg-gray-200"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={
          correctAnswerCount + incorrectAnswerCount / totalCorrectAnswersNeeded
        }
      >
        <div
          className={
            "h-full rounded-full bg-green-500 transition-all duration-700 " +
            (correctAnswerCount > 0 ? "px-2 pt-1 " : "")
          }
          style={{
            width: `${(correctAnswerCount / totalCorrectAnswersNeeded) * 100}%`,
          }}
        >
          <div className="h-[5px] w-full rounded-full bg-green-400"></div>
        </div>
      </div>
      {/* {hearts !== null &&
        [1, 2, 3].map((heart) => {
          if (heart <= hearts) {
            return <LessonTopBarHeart key={heart} />;
          }
          return <LessonTopBarEmptyHeart key={heart} />;
        })} */}
      <TimeLeft startTime={startTime} endTime={endTime} />
    </header>
  );
};

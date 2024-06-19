import Link from "next/link";
import ReviewLesson from "./ReviewLesson";
import LessonFastForwardEndPassSvg from "../components/icons/LessonFastForwardEndPassSvg";

// Fonction qui affiche un mmessage de réussite à la fin d'une leçon et débloque l'unité suivante
export default function LessonFastForwardEndPass({
  unitNumber,
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}) {
  //const jumpToUnit = useBoundStore((x) => x.jumpToUnit);
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardEndPassSvg />
        <h1 className="text-2xl font-bold">
          Vous avez débloqué l'unité {unitNumber}!
        </h1>
        <p className="text-lg text-gray-500">
          Bravo ! Vous avancez à grands pas !
        </p>
      </div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setReviewLessonShown(true)}
          >
            Voir le récapitulatif
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href="/learn"
          >
            Continue
          </Link>
        </div>
      </section>
      <ReviewLesson
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    </div>
  );
}

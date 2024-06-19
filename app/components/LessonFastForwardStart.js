import Link from "next/link";
import LessonFastForwardStartSvg from "./icons/LessonFastForwardStartSvg";

// Fonction qui permet de passer à l'unité suivante
export default function LessonFastForwardStart({
  unitNumber,
  setIsStartingLesson,
}) {
  return (
    <div className="flex min-h-screen flex-col px-5 py-8 text-center">
      <div className="flex grow flex-col items-center justify-center gap-5">
        <LessonFastForwardStartSvg />
        <h1 className="text-lg font-bold">
          Vous voulez passer à l'unité {unitNumber}?
        </h1>
        <p className="text-sm text-gray-400">
          Passez le test pour prendre de l'avance. Mais nous ne vous faciliterons pas la tâche.
        </p>
      </div>
      <div className="flex flex-col gap-5"></div>
      <section className="border-gray-200 sm:border-t-2 sm:p-10">
        <div className="mx-auto flex max-w-5xl flex-col-reverse items-center gap-5 sm:flex-row sm:justify-between">
          <Link
            href="/learn"
            className="font-bold uppercase text-blue-400 transition hover:brightness-110"
          >
            Peut-être plus tard
          </Link>
          <button
            className="w-full rounded-2xl border-b-4 border-blue-500 bg-blue-400 p-3 font-bold uppercase text-white transition hover:brightness-110 sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setIsStartingLesson(false)}
          >
            Let's go !
          </button>
        </div>
      </section>
    </div>
  );
}

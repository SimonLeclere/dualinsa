import Link from "next/link";

export default function LessonCompleteBottomBar({ setDisplayReview, id }) {
  return (
    <div className="w-full fixed bottom-0 px-2 sm:px-0">
      <section className="border-gray-200 sm:border-t-2 sm:p-10 sm:pb-4 pb-4 sm:pt-4 sm:pl-4 sm:pr-4">
        <div className="mx-auto gap-4 flex flex-col-reverse sm:flex-row max-w-5xl sm:justify-between">
          <button
            className="rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:min-w-[150px] sm:max-w-fit"
            onClick={() => setDisplayReview(true)}
          >
            Voir le récapitulatif
          </button>
          <Link
            className="flex w-full items-center justify-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            href={`/courses/${id}`}
          >
            Continue
          </Link>
        </div>
      </section>
    </div>
  );
}

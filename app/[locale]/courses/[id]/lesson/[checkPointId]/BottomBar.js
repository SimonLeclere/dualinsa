"use client";
import { useState, useImperativeHandle, forwardRef } from "react";

import BigCloseSvg from "@/components/icons/BigCloseSvg";
import DoneSvg from "@/components/icons/DoneSvg";

import { useTranslations } from "next-intl";

const Bottombar = forwardRef(function BottomBar(
  {
    showConfirmButton,
    isAnswerCorrect,
    showCorrectAnswer,
    displayCorrection,
    checkAnswer,
    showNextQuestion,
    disableAllButtons,
  },
  ref
) {

  const t = useTranslations("Lesson.BottomBar");

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    skipQuestion: async () => {
      const result = await checkAnswer(true);
      setCorrectAnswer(result);
    },
  }));

  const validateAnswer = async (skip) => {
    if (loading) return;
    setLoading(true);
    const correction = await checkAnswer(skip);

    setLoading(false);
    setCorrectAnswer(correction);
  };

  return (
    <div className="w-full fixed bottom-0">
      <section className="bg-white border-gray-200 sm:border-t-2 px-4 sm:p-10 sm:pb-4 pb-4 sm:pt-4">
        <div className="mx-auto flex flex-col gap-4 sm:flex-row-reverse max-w-5xl sm:justify-between">
          {!showConfirmButton ? (
            <button
              className="grow rounded-2xl bg-gray-200 p-3 font-bold uppercase text-gray-400 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
              disabled
            >
              {t('verifyAnswer')}
            </button>
          ) : (
            <button
              onClick={async () => await validateAnswer()}
              className={`grow ${loading && "inline-flex"} items-center rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white sm:min-w-[150px] sm:max-w-fit sm:grow-0`}
              disabled={disableAllButtons}
            >
              <svg
                className={`${!loading && "hidden"} animate-spin mr-3 ml-1 h-5 w-5 text-white`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {t('verifyAnswer')}
            </button>
          )}
          <button
            className={`grow ${loading && "inline-flex"} rounded-2xl border-0 sm:border-2 sm:border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:min-w-[150px] sm:max-w-fit`}
            onClick={async () => await validateAnswer(true)}
            disabled={disableAllButtons}
          >
            <svg
              className={`${!loading && "hidden"} items-center animate-spin mr-3 ml-1 h-5 w-5 text-gray-400`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {t('skipQuestion')}
          </button>
        </div>
      </section>

      {/* Bottom bar avec la correction */}
      <div
        className={
          showCorrectAnswer
            ? isAnswerCorrect
              ? "fixed bottom-0 left-0 right-0 bg-lime-100 font-bold text-green-600 transition-all"
              : "fixed bottom-0 left-0 right-0 bg-red-100 font-bold text-red-500 transition-all"
            : "fixed -bottom-80 left-0 right-0"
        }
      >
        <div className="flex max-w-5xl flex-col gap-4 p-5 sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:py-14">
          <>
            {isAnswerCorrect ? (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-green-500 sm:block">
                  <DoneSvg />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">{t('greeting')}</div>
                  {
                    displayCorrection && (
                      <div className="text-sm font-normal">{correctAnswer.split("\n").map((line, i) => <p key={i}>{line}</p>)}</div>
                    )
                  }
                </div>
              </div>
            ) : (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-red-500 sm:block">
                  <BigCloseSvg />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">{t('correctSolutionTitle')}</div>{" "}
                  <div className="text-sm font-normal">{correctAnswer.split("\n").map((line, i) => <p key={i}>{line}</p>)}</div>
                </div>
              </div>
            )}
          </>
          <button
            onClick={showNextQuestion}
            className={
              isAnswerCorrect
                ? "w-full rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
                : "w-full rounded-2xl border-b-4 border-red-600 bg-red-500 p-3 font-bold uppercase text-white transition hover:brightness-105 sm:min-w-[150px] sm:max-w-fit"
            }
          >
            {t('continueButton')}
          </button>
        </div>
      </div>
    </div>
  );
});

export default Bottombar;

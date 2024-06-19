'use client';
import { useState } from "react";

import BigCloseSvg from "../components/icons/BigCloseSvg";
import DoneSvg from "../components/icons/DoneSvg";

export default function BottomBar({ showConfirmButton, isAnswerCorrect, showCorrectAnswer, checkAnswer, showNextQuestion }) {

  const [correctAnswer, setCorrectAnswer] = useState("");

  const validateAnswer = (skip) => {
    const correction = checkAnswer(skip);
    setCorrectAnswer(correction);
  };

  return (
    <div className="w-full fixed bottom-0" >
      <section className="bg-white border-gray-200 sm:border-t-2 px-4 sm:p-10">
        <div className="mx-auto flex flex-col sm:flex-row max-w-5xl sm:justify-between">
          <button
            className="hidden rounded-2xl border-2 border-b-4 border-gray-200 bg-white p-3 font-bold uppercase text-gray-400 transition hover:border-gray-300 hover:bg-gray-200 sm:block sm:min-w-[150px] sm:max-w-fit"
            onClick={() => checkAnswer(true)}
          >
            Sauter
          </button>
          {!showConfirmButton ? (
            <button
              className="grow rounded-2xl bg-gray-200 p-3 font-bold uppercase text-gray-400 sm:min-w-[150px] sm:max-w-fit sm:grow-0"
              disabled
            >
              Vérifier
            </button>
          ) : (
            <button
              onClick={() => validateAnswer()}
              className="grow rounded-2xl border-b-4 border-green-600 bg-green-500 p-3 font-bold uppercase text-white sm:min-w-[150px] sm:max-w-fit sm:grow-0"
            >
              Vérifier
            </button>
          )}
          <button
            className="text-md font-bold text-gray-400 sm:hidden py-2"
            onClick={() => validateAnswer(true)}
          >
            Sauter
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
            : "fixed -bottom-52 left-0 right-0"
        }
      >
        <div className="flex max-w-5xl flex-col gap-4 p-5 sm:mx-auto sm:flex-row sm:items-center sm:justify-between sm:p-10 sm:py-14">
          <>
            {isAnswerCorrect ? (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-green-500 sm:block">
                  <DoneSvg />
                </div>
                <div className="text-2xl">Bon travail !</div>
              </div>
            ) : (
              <div className="mb-2 flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="hidden rounded-full bg-white p-5 text-red-500 sm:block">
                  <BigCloseSvg />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="text-2xl">Solution correcte :</div>{" "}
                  <div className="text-sm font-normal">{correctAnswer}</div>
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
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

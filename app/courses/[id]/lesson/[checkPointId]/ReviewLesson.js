"use client";

import { useState } from "react";
import BigCloseSvg from "@/components/icons/BigCloseSvg";
import DoneSvg from "@/components/icons/DoneSvg";

// Fonction qui affiche les réponses correctes et incorrectes à la fin d'une leçon
export default function ReviewLesson({
  reviewLessonShown,
  setReviewLessonShown,
  questionResults,
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center p-5 transition duration-300 ${
        reviewLessonShown ? "" : "pointer-events-none opacity-0"
      }`}
    >
      <div
        className={`absolute inset-0 bg-black ${
          reviewLessonShown ? "opacity-75" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setReviewLessonShown(false)}
      ></div>
      <div className="relative flex w-full max-w-4xl flex-col gap-5 rounded-2xl border-2 border-gray-200 bg-white p-8 max-h-full">
        <button
          className="absolute -right-5 -top-5 rounded-full border-2 border-gray-200 bg-gray-100 p-1 text-gray-400 hover:brightness-90"
          onClick={() => setReviewLessonShown(false)}
        >
          <BigCloseSvg className="h-8 w-8" />
          <span className="sr-only">Fermer</span>
        </button>
        <div className="overflow-y-auto">
          <h2 className="text-center text-3xl pb-5">Solutions</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {questionResults.map((questionResult, i) => {
              return (
                <div
                  key={i}
                  className={`relative flex flex-col items-stretch hyphens-auto break-all gap-3 rounded-xl p-5 text-left ${
                    questionResult.isCorrect
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  <div className="flex justify-between gap-2 break-normal">
                    <h3 className="font-bold">{questionResult.question}</h3>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white">
                      {questionResult.isCorrect ? (
                        <DoneSvg className="h-5 w-5" />
                      ) : (
                        <BigCloseSvg className="sticky h-5 w-5" />
                      )}
                    </div>
                  </div>
                  {questionResult.isCorrect ? (
                    <div className="text-green-600">
                      {questionResult.userAnswer}
                    </div>
                  ) : (
                    <>
                      <div className="text-red-500 line-through">
                        {questionResult.userAnswer || "Aucune réponse"}
                      </div>
                      <div className="text-sm font-normal">
                        {questionResult.correctAnswer}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

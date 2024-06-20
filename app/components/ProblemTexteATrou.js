import ProgressBar from "./ProgressBar";
import QuitMessage from "./QuitMessage";
import CheckAnswer from "./CheckAnswer";

// Fonction pour compter le nombre de {} dans un string
function countOccurences(string, word) {
  return string.split(word).length - 1;
}

import React from "react";

export default function ProblemTexteATrou({
  problem,
  correctAnswerCount,
  totalCorrectAnswersNeeded,
  selectedAnswers,
  setSelectedAnswers,
  quitMessageShown,
  correctAnswerShown,
  setQuitMessageShown,
  isAnswerCorrect,
  onCheckAnswer,
  onFinish,
  onSkip,
  startTime,
  endTime,
}) {
  const { question, texteATrous, correctAnswer, answerTiles } = problem;

  console.log("Selected answers:");
  selectedAnswers.forEach((answer) => {
    console.log(answerTiles[answer]);
  });

  // Trou est un tableau du nombre de {} dans texteATrous
  let nbTrou = countOccurences(texteATrous, "{}");
  let ensTrou = new Array(nbTrou);

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            startTime={startTime}
            endTime={endTime}
          />
        </div>

        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24">
          <h1 className="mb-2 text-2xl font-bold sm:text-3xl">{question}</h1>
          <div className="w-full">
            <div className="flex items-center gap-2 px-2">
              {texteATrous.split("{}").map((part, index) => (
                <React.Fragment key={index}>
                  {part}
                  {index !== texteATrous.split("{}").length - 1 && ( // Si ce n'est pas le dernier fragment
                    <React.Fragment>
                      {selectedAnswers.length > 0 &&
                        selectedAnswers.map((i) => {
                          return (
                            <div>
                              <button
                                key={i}
                                className="rounded-2xl border-2 border-b-4 p-2 text-gray-700"
                                onClick={() => {
                                  setSelectedAnswers((selectedAnswers) => {
                                    return selectedAnswers.filter(
                                      (x) => x !== i
                                    );
                                  });
                                }}
                              >
                                {answerTiles[i]}
                              </button>
                            </div>
                          );
                        })}
                      {selectedAnswers.length === 0 && (
                        <div>
                          <button
                            className="rounded-2xl border-2 border-b-4 border-gray-200 bg-gray-200 p-2 text-gray-200"
                            disabled
                          >
                            ?
                          </button>
                        </div>
                      )}
                    </React.Fragment>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-1">
            {" "}
            {/* Pour l'affichage des propositions*/}
            {answerTiles.map((answerTile, i) => {
              return (
                <button
                  key={i}
                  className={
                    selectedAnswers.includes(i)
                      ? "rounded-2xl border-2 border-b-4 border-gray-200 bg-gray-200 p-2 text-gray-200"
                      : "rounded-2xl border-2 border-b-4 border-gray-200 p-2 text-gray-700"
                  }
                  disabled={selectedAnswers.includes(i)}
                  onClick={() =>
                    setSelectedAnswers((selectedAnswers) => {
                      if (selectedAnswers.includes(i)) {
                        return selectedAnswers;
                      }
                      return [...selectedAnswers, i];
                    })
                  }
                >
                  {answerTile}
                </button>
              );
            })}
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer={correctAnswer.map((i) => answerTiles[i]).join(" ")}
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={selectedAnswers.length > 0}
        onCheckAnswer={onCheckAnswer}
        onFinish={onFinish}
        onSkip={onSkip}
      />

      <QuitMessage
        quitMessageShown={quitMessageShown}
        setQuitMessageShown={setQuitMessageShown}
      />
    </div>
  );
}

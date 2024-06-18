"use client";

import React, { useRef, useState } from "react";

import LessonComplete from "../components/LessonComplete";
import LessonCheckup from "../components/LessonCheckup";

import ProblemSelect1Ofn from "../components/ProblemSelect1Ofn";
import ProblemTexteATrou from "../components/ProblemTexteATrou";
import ProblemQOuverte from "../components/ProblemQOuverte";

const lessonProblem1 = {
  type: "SELECT_1_OF_N",
  question: `Question n°1 : Quel est le mot qui correspond à l'image ?`,
  answers: [
    { name: "Je suis la réponse A" },
    { name: "Je suis la réponse B" },
    { name: "Je suis la réponse C" },
    { name: "Je suis la réponse D" },
  ],
  correctAnswer: 0, // la bonne réponse est à l'index 0
};

const lessonProblem2 = {
  /* type: "SELECT_1_OF_N",
  question: `Question n°2 : Which one of these is "the apple"?`,
  answers: [
    { name: "Je suis la réponse D" },
    { name: "Je suis la réponse E" },
    { name: "Je suis la réponse F" },
  ],
  correctAnswer: 0, // la bonne réponse est à l'index 0 */
  type: "TEXTE_A_TROU",
  question: "Remplir la formule suivante",
  texteATrous: "PV = {}",
  answerTiles: ["drt", "vrt", "vtt", "pushAAAAnnnnHHH", "nRT", "ntm"],
  correctAnswer: [4],
};

const lessonProblem3 = {
  /* type: "SELECT_1_OF_N",
  question: `Question n°3 : Which one of these is "the apple"?`,
  answers: [
    { name: "Je suis la réponse G" }, 
    { name: "Je suis la réponse H" }
  ],
  correctAnswer: 0, // la bonne réponse est à l'index 0 */
  type: "TEXTE_A_TROU",
  question: "Remplir ",
  texteATrous: "{} = 2x + {}",
  answerTiles: ["x", "-x", "a", "b", "c", "d"],
  correctAnswer: [0, 1],
};

const lessonProblem4 = {
  /* type: "SELECT_1_OF_N",
  question: `Question n°3 : Which one of these is "the apple"?`,
  answers: [
    { name: "Je suis la réponse G" }, 
    { name: "Je suis la réponse H" }
  ],
  correctAnswer: 0, // la bonne réponse est à l'index 0 */
  type: "Q_OUVERTE",
  question: "Combien font 1 + 1 ?",
  correctAnswer: "2",
};

const numbersEqual = (a, b) => {
  return a.length === b.length && a.every((_, i) => a[i] === b[i]);
};

const lessonProblems = [
  lessonProblem4,
  lessonProblem1,
  lessonProblem2,
  lessonProblem3,
];

export default function Test() {
  const [lessonProblem, setLessonProblem] = useState(0);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
  const [quitMessageShown, setQuitMessageShown] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [questionResults, setQuestionResults] = useState([]);
  const [reviewLessonShown, setReviewLessonShown] = useState(false);
  const [isStartingLesson, setIsStartingLesson] = useState(true);

  const startTime = useRef(Date.now());
  const endTime = useRef(startTime.current + 1000 * 60 * lessonProblem.length); // temps de 1 minute pour répondre

  const problem = lessonProblems[lessonProblem]; // problem = lessonProblems[0](=lessonProblem1) ou lessonProblem1

  const totalCorrectAnswersNeeded = lessonProblems.length;

  const { correctAnswer } = problem;
  const isAnswerCorrect = Array.isArray(correctAnswer)
    ? numbersEqual(selectedAnswers, correctAnswer)
    : selectedAnswer === correctAnswer;

  const onCheckAnswer = () => {
    setCorrectAnswerShown(true);
    if (isAnswerCorrect) {
      setCorrectAnswerCount((x) => x + 1);
    } else {
      setIncorrectAnswerCount((x) => x + 1);
    }
    setQuestionResults((questionResults) => [
      ...questionResults,
      {
        question: problem.question,
        yourResponse:
          problem.type === "Q_OUVERTE"
            ? selectedAnswers
            : problem.type === "SELECT_1_OF_N"
            ? problem.answers[selectedAnswer ?? 0]?.name ?? ""
            : selectedAnswers.map((i) => problem.answerTiles[i]).join(" "),
        correctResponse:
          problem.type === "Q_OUVERTE"
            ? problem.correctAnswer
            : problem.type === "SELECT_1_OF_N"
            ? problem.answers[problem.correctAnswer].name
            : problem.correctAnswer
                .map((i) => problem.answerTiles[i])
                .join(" "),
      },
    ]);
  };

  const onFinish = () => {
    // Fonction appelé lorsqu'on clique sur le bouton "Continuer" à la fin d'un bonne/mauvaise réponse
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setCorrectAnswerShown(false);
    setLessonProblem((x) => (x + 1) % lessonProblems.length); // passe à la question suivante
    endTime.current = Date.now(); // met à jour le temps de fin
  };

  const onSkip = () => {
    // Fonction appelé lorsqu'on clique sur le bouton "Sauter" pour passer à la question suivante
    setSelectedAnswer(null); //
    setCorrectAnswerShown(true);
  };

  //const unitNumber = Number(router.query["fast-forward"]);
  const unitNumber = 4;

  /* if (hearts !== null && hearts < 0 && !correctAnswerShown) {
    return (
      <LessonFastForwardEndFail
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  } */

  /* if (
    hearts !== null &&
    hearts >= 0 &&
    !correctAnswerShown &&
    correctAnswerCount >= totalCorrectAnswersNeeded
  ) {
    return (
      <LessonFastForwardEndPass
        unitNumber={unitNumber}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }  */

  /* if (hearts !== null && isStartingLesson) {
    return (
      <LessonFastForwardStart
        unitNumber={unitNumber}
        setIsStartingLesson={setIsStartingLesson}
      />
    );
  } */

  // Si on a répondu à toutes les questions et qu'on a des erreurs et qu'on a pas encore affiché le message de fin de leçon
  if (
    incorrectAnswerCount > 0 &&
    totalCorrectAnswersNeeded == incorrectAnswerCount + correctAnswerCount &&
    !correctAnswerShown
  ) {
    <LessonCheckup
      correctAnswerCount={correctAnswerCount}
      totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
      startTime={startTime}
      endTime={endTime}
      reviewLessonShown={reviewLessonShown}
      setReviewLessonShown={setReviewLessonShown}
      questionResults={questionResults}
    />;
  }
  // Si on a répondu à toutes les questions correctement et qu'on a pas encore affiché le message de fin de leçon
  else if (
    correctAnswerCount >= totalCorrectAnswersNeeded &&
    !correctAnswerShown
  ) {
    return (
      <LessonComplete
        correctAnswerCount={correctAnswerCount}
        incorrectAnswerCount={incorrectAnswerCount}
        startTime={startTime}
        endTime={endTime}
        reviewLessonShown={reviewLessonShown}
        setReviewLessonShown={setReviewLessonShown}
        questionResults={questionResults}
      />
    );
  }

  switch (problem.type) {
    case "SELECT_1_OF_N": {
      return (
        <ProblemSelect1Ofn
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          incorrectAnswerCount={incorrectAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          startTime={startTime}
          endTime={endTime}
        />
      );
    }

    case "TEXTE_A_TROU": {
      return (
        <ProblemTexteATrou
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          startTime={startTime}
          endTime={endTime}
        />
      );
    }

    case "Q_OUVERTE": {
      return (
        <ProblemQOuverte
          problem={problem}
          correctAnswerCount={correctAnswerCount}
          totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
          selectedAnswers={selectedAnswers}
          setSelectedAnswers={setSelectedAnswers}
          quitMessageShown={quitMessageShown}
          correctAnswerShown={correctAnswerShown}
          setQuitMessageShown={setQuitMessageShown}
          isAnswerCorrect={isAnswerCorrect}
          onCheckAnswer={onCheckAnswer}
          onFinish={onFinish}
          onSkip={onSkip}
          startTime={startTime}
          endTime={endTime}
        />
      );
    }
  }
}

"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";

import LessonComplete from "../components/LessonComplete";
import LessonCheckup from "../components/LessonCheckup";
import LessonFastForwardEndFail from "../components/LessonFastForwardEndFail";
import LessonFastForwardEndPass from "../components/LessonFastForwardEndPass";
import LessonFastForwardStart from "../components/LessonFastForwardStart";

import ProblemSelect1Of3 from "../components/ProblemSelect1Of3";
import AppleSvg from "../components/icons/AppleSvg";

import CoinStackSvg from "../components/icons/CoinStackSvg";
import HomeIcon from "../components/icons/HomeSvg";

const lessonProblem1 = {
  type: "SELECT_1_OF_3",
  question: `Question n°1 : Quel est le mot qui correspond à l'image ?`,
  answers: [
    { icon: <AppleSvg />, name: "A" },
    { icon: <AppleSvg />, name: "B" },
    { icon: <AppleSvg />, name: "C" },
  ],
  correctAnswer: 0, // la bonne réponse est à l'index 0
};

const lessonProblem2 = {
  type: "SELECT_1_OF_3",
  question: `Question n°2 : Which one of these is "the apple"?`,
  answers: [
    { icon: <AppleSvg />, name: "D" },
    { icon: <AppleSvg />, name: "E" },
    { icon: <AppleSvg />, name: "F" },
  ],
  correctAnswer: 0, // la bonne réponse est à l'index 0
};

const lessonProblem3 = {
  type: "SELECT_1_OF_3",
  question: `Question n°3 : Which one of these is "the apple"?`,
  answers: [
    { icon: <AppleSvg />, name: "G" },
    { icon: <AppleSvg />, name: "H" },
    { icon: <AppleSvg />, name: "I" },
  ],
  correctAnswer: 0, // la bonne réponse est à l'index 0
};

const numbersEqual = (a, b) => {
  return a.length === b.length && a.every((_, i) => a[i] === b[i]);
};

const lessonProblems = [lessonProblem1, lessonProblem2, lessonProblem3];

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

  const problem = lessonProblems[lessonProblem] ?? lessonProblem1; // problem = lessonProblems[0](=lessonProblem1) ou lessonProblem1

  const totalCorrectAnswersNeeded = lessonProblems.length;

  const { correctAnswer } = problem;
  const isAnswerCorrect = Array.isArray(correctAnswer)
    ? numbersEqual(selectedAnswers, correctAnswer)
    : selectedAnswer === correctAnswer;

  const onCheckAnswer = () => {
    setCorrectAnswerShown(true);
    if (isAnswerCorrect) {
      setCorrectAnswerCount((x) => x + 1); // bonne réponse +1
    } else {
      setIncorrectAnswerCount((x) => x + 1); // mauvaise réponse +1
    }
    setQuestionResults((questionResults) => [ // ajoute les réponses et les résultats à questionResults
      ...questionResults,
      {
        question: problem.question,
        yourResponse:
          problem.type === "SELECT_1_OF_3"
            ? problem.answers[selectedAnswer ?? 0]?.name ?? ""
            : selectedAnswers.map((i) => problem.answerTiles[i]).join(" "),
        correctResponse:
          problem.type === "SELECT_1_OF_3"
            ? problem.answers[problem.correctAnswer].name
            : problem.correctAnswer
                .map((i) => problem.answerTiles[i])
                .join(" "),
      },
    ]);
  };

  const onFinish = () => { // Fonction appelé lorsqu'on clique sur le bouton "Continuer" à la fin d'un bonne/mauvaise réponse
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
  if (incorrectAnswerCount > 0 && (totalCorrectAnswersNeeded == (incorrectAnswerCount+correctAnswerCount)) && !correctAnswerShown) {
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
  else if (correctAnswerCount >= totalCorrectAnswersNeeded && !correctAnswerShown) {
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
    case "SELECT_1_OF_3": {
      return (
        <ProblemSelect1Of3
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
  }
}

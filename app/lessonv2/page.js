'use client'
import { useState, useRef } from "react";

import ProgressBar from "./ProgressBar";
import BottomBar from "./BottomBar";

import QCMQuestion from "./QCMQuestion";
import FillInTheBlanksQuestion from "./FillInTheBlanksQuestion";
import TimedQuestion from "./TimedQuestion";

const questions = [
    {
        type: "QCM",
        question: "Quelle est la capitale de la France ?",
        answers: ["Paris", "Londres", "Madrid", "Berlin"],
        correctAnswer: "Paris",
        duration: 35,
    },
    {
        type: "TIMED",
        question: "Quel est le rôle de la mitochondrie ?", 
        aiPromptSolution: "Les mitochondries sont des organites intracellulaires dont la fonction principale est de fournir aux cellules l'énergie dont elles ont besoin pour assurer leur survie et les fonctions qu'elles sont censées accomplir",
        duration: 40,
    },
    // {
    //     type: "QCM",
    //     question: "Quelle est la capitale de l'Espagne ?",
    //     answers: ["Paris", "Londres", "Madrid", "Berlin"],
    //     correctAnswer: "Madrid",
    //     duration: 35,
    // },

    // {
    //     type: "QCM",
    //     question: "Quelle est la capitale de l'Allemagne ?",
    //     answers: ["Paris", "Londres", "Madrid", "Berlin"],
    //     correctAnswer: "Berlin",
    //     duration: 35,
    // },
    {
        type: "FILL_IN_THE_BLANKS",
        question: "Remplir la formule suivante",
        textWithHoles: "Le {} est un animal très {}.",
        propositions: ["chien", "mignon", "fourchette"],
        correctAnswer: ["chien", "mignon"],
        duration: 30,
    },
    {
        type: "FILL_IN_THE_BLANKS",
        question: "Remplir la formule suivante",
        textWithHoles: "Le {} est un animal très {}.",
        propositions: ["chien", "mignon", "fourchette"],
        correctAnswer: ["chien", "mignon"],
        duration: 30,
    },
    {
        type: "FILL_IN_THE_BLANKS",
        question: "Remplir la formule suivante",
        textWithHoles: "Le {} est un animal très {}.",
        propositions: ["chien", "mignon", "fourchette"],
        correctAnswer: ["chien", "mignon"],
        duration: 30,
    },
    {
        type: "FILL_IN_THE_BLANKS",
        question: "Remplir la formule suivante",
        textWithHoles: "Le {} est un animal très {}.",
        propositions: ["chien", "mignon", "fourchette"],
        correctAnswer: ["chien", "mignon"],
        duration: 30,
    },
    {
        type: "FILL_IN_THE_BLANKS",
        question: "Remplir la formule suivante",
        textWithHoles: "Le {} est un animal très {}.",
        propositions: ["chien", "mignon", "fourchette"],
        correctAnswer: ["chien", "mignon"],
        duration: 30,
    },
    {
        type: "TIMED",
        question: "Quelle est la capitale de l'Espagne ?",
        aiPromptSolution: "Madrid",
        duration: 25,
    },
];

const questionsTypes = {
    QCM: QCMQuestion,
    TIMED: TimedQuestion,
    FILL_IN_THE_BLANKS: FillInTheBlanksQuestion,
}


export default function LessonPage() {

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle
    const [correctAnswerCount, setCorrectAnswerCount] = useState(0); // Nombre de réponses correctes
    const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0); // Nombre de réponses incorrectes
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // Afficher la réponse correcte
    const [showQuitConfirmation, setShowQuitConfirmation] = useState(false); // Afficher la confirmation avant de quitter
    const [reviewLessonShown, setReviewLessonShown] = useState(false); // Afficher la révision de la leçon
    const [showConfirmButton, setShowConfirmButton] = useState(false); // Afficher ou griser le bouton de confirmation
    
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // La réponse est-elle correcte ?

    const currentQuestion = questions[currentQuestionIndex];
    const currentQuestionRef = useRef();
    const CurrentQuestionComponent = questionsTypes[currentQuestion.type]
    
    return (
        <div className="flex min-h-screen flex-col items-center gap-5 px-4 py-5 sm:px-0 sm:py-0">

            <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
                <ProgressBar
                    currentQuestionIndex={currentQuestionIndex}
                    totalCorrectAnswersNeeded={questions.length}
                    setQuitMessageShown={setShowQuitConfirmation}
                />
            </div>
            
            <CurrentQuestionComponent
                ref={currentQuestionRef}
                currentQuestion={currentQuestion}
                setShowConfirmButton={setShowConfirmButton}
            />
            

            <BottomBar
                showConfirmButton={showConfirmButton}
                isAnswerCorrect={isAnswerCorrect}
                showCorrectAnswer={showCorrectAnswer}
                checkAnswer={(skip = false) => {
                    const { isCorrect, correction } = currentQuestionRef.current.checkAnswer()
                    setIsAnswerCorrect(isCorrect);
                    
                    if (isCorrect && !skip) setCorrectAnswerCount((prev) => prev + 1);
                    else setIncorrectAnswerCount((prev) => prev + 1);

                    setShowCorrectAnswer(true);
                    setShowConfirmButton(false);

                    return correction;
                }}
                showNextQuestion={() => {
                    setShowCorrectAnswer(false);
                    currentQuestionRef.current.reset();
                    setCurrentQuestionIndex((prev) => prev + 1);
                }}
            />

        </div>
    );

}
'use client'
import { useState, useRef } from "react";
import useSWR from "swr";

import ProgressBar from "./ProgressBar";
import BottomBar from "./BottomBar";
import LessonCompleteBottomBar from "./LessonCompleteBottomBar";
import LessonComplete from "./LessonComplete";
import ReviewLesson from "./ReviewLesson";

import QCMQuestion from "./QCMQuestion";
import FillInTheBlanksQuestion from "./FillInTheBlanksQuestion";
import TimedQuestion from "./TimedQuestion";

const questionsTypes = {
    QCM: QCMQuestion,
    TIMED: TimedQuestion,
    FILL_IN_THE_BLANKS: FillInTheBlanksQuestion,
}

const fetcher = async url => {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch', res)
    const data = await res.json()
    return data
}

export default function LessonPage({ params }) {

    const { id, checkPointId } = params;
    
    const { data: questions, error, isLoading } = useSWR(`/${params.locale}/api/courses/checkpoints/${checkPointId}/selectQuestions`,
        fetcher,
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    );

    const [correctAnswerCount, setCorrectAnswerCount] = useState(0); // Nombre de réponses correctes
    const [incorrectAnswerCount, setIncorrectAnswerCount] = useState(0); // Nombre de réponses incorrectes
    const [showCorrectAnswer, setShowCorrectAnswer] = useState(false); // Afficher la réponse correcte
    const [showQuitConfirmation, setShowQuitConfirmation] = useState(false); // Afficher la confirmation avant de quitter
    const [reviewLessonShown, setReviewLessonShown] = useState(false); // Afficher la révision de la leçon
    const [showConfirmButton, setShowConfirmButton] = useState(false); // Afficher ou griser le bouton de confirmation

    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); // La réponse est-elle correcte ?

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index de la question actuelle

    const [progressIndex, setProgressIndex] = useState(0); // Index de progression
    const startTime = useRef(Date.now());

    const currentQuestionRef = useRef();
    const BottomBarRef = useRef();

    const results = useRef([]); // Résultats des questions: { question: string, isCorrect: boolean, userAnswer: string, correctAnswer: string }[]
    const [exerciseEnded, setExerciseEnded] = useState(false); // L'exercice est-il terminé ?

    // if (error) return (<div>Failed to load</div>);
    // if (isLoading) return (<div>Loading...</div>);

    const currentQuestion = questions ? questions[currentQuestionIndex] : null;
    const CurrentQuestionComponent = currentQuestion ? questionsTypes[currentQuestion.type] : null

    if (exerciseEnded) {
        return (
            <div className="flex min-h-screen flex-col items-center gap-5 px-4 py-5 sm:px-0 sm:py-0">
                <LessonComplete
                    correctAnswerCount={correctAnswerCount}
                    incorrectAnswerCount={incorrectAnswerCount}
                    startTime={startTime.current}
                />
                <LessonCompleteBottomBar
                    setDisplayReview={setReviewLessonShown}
                    id={id}
                />
                <ReviewLesson
                    reviewLessonShown={reviewLessonShown}
                    setReviewLessonShown={setReviewLessonShown}
                    questionResults={results.current}
                />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center gap-5 px-4 py-5 sm:px-0 sm:py-0">

            <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
                <ProgressBar
                    currentQuestionIndex={progressIndex}
                    totalCorrectAnswersNeeded={questions?.length || 100}
                    stopTimer={showCorrectAnswer}
                    setQuitMessageShown={setShowQuitConfirmation}
                    timerDuration={currentQuestion?.duration}
                    onTimerEnd={async () => {
                        await BottomBarRef.current.skipQuestion()
                    }}
                    courseId={id}
                />
            </div>

            {
                !isLoading && !error && questions ? (
                    <CurrentQuestionComponent
                        ref={currentQuestionRef}
                        currentQuestion={currentQuestion}
                        setShowConfirmButton={setShowConfirmButton}
                    />
                )
                    : (
                        <section className="flex max-w-2xl grow flex-col gap-5 sm:items-center sm:justify-center sm:gap-24 sm:px-5 sm:pb-40">
                            <h1 className="self-start text-2xl sm:text-3xl">
                                {error ? "Failed to load" : "Loading..."}
                            </h1>
                        </section>
                    )
            }


            <BottomBar
                ref={BottomBarRef}
                disableAllButtons={isLoading || error}
                showConfirmButton={showConfirmButton}
                isAnswerCorrect={isAnswerCorrect}
                showCorrectAnswer={showCorrectAnswer}
                checkAnswer={async (skip = false) => {
                    const { isCorrect, correction, userAnswer } = await currentQuestionRef.current.checkAnswer()
                    setIsAnswerCorrect(isCorrect);

                    if (isCorrect && !skip) setCorrectAnswerCount((prev) => prev + 1);
                    else setIncorrectAnswerCount((prev) => prev + 1);

                    setShowCorrectAnswer(true);
                    setShowConfirmButton(false);
                    setProgressIndex((prev) => prev + 1);

                    results.current.push({
                        question: currentQuestion.question,
                        isCorrect: isCorrect,
                        userAnswer: userAnswer,
                        correctAnswer: correction,
                    });

                    return correction;
                }}
                showNextQuestion={() => {
                    setShowCorrectAnswer(false);
                    
                    if (currentQuestionIndex === questions.length - 1) {
                        setExerciseEnded(true);

                        fetch(`/${params.locale}/api/courses/checkpoints/${checkPointId}/endQuizz`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                score: correctAnswerCount * 5,
                            }),
                        });

                        return;
                    }

                    currentQuestionRef.current.reset(questions[currentQuestionIndex + 1]);
                    setCurrentQuestionIndex((prev) => prev + 1);
                }}
            />

        </div>
    );

}
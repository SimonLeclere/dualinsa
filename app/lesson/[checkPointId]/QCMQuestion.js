import { useState, useImperativeHandle, forwardRef } from 'react';

const QCMQuestion = forwardRef(function QCMQuestion({ currentQuestion, setShowConfirmButton }, ref) {

    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [locked, setLocked] = useState(false);

    useImperativeHandle(ref, () => ({

        async checkAnswer() {
            setLocked(true);
            
            return {
                isCorrect: selectedAnswer === currentQuestion.correctAnswer,
                correction: currentQuestion.correctAnswer,
                userAnswer: selectedAnswer,
            }
        },

        reset() {
            setLocked(false);
            setSelectedAnswer(null);
        }

    }));

    return (
        <section className="flex max-w-2xl grow flex-col gap-5 sm:items-center sm:justify-center sm:gap-24 sm:px-5 sm:pb-40">
            
            <h1 className="self-start text-2xl font-bold sm:text-3xl">
                {currentQuestion.question}
            </h1>

            <div
                className="grid grid-cols-1 gap-2 sm:gap-4 sm:grid-cols-2"
                role="radiogroup"
            >
                {currentQuestion.answers.map((answer, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                answer === selectedAnswer
                                    ? "cursor-pointer rounded-xl text-xl border-2 border-b-4 border-blue-300 content-center py-10 w-full sm:w-80 bg-blue-100 text-blue-400"
                                    : "cursor-pointer rounded-xl text-xl border-2 border-b-4 border-gray-200 content-center py-10 w-full sm:w-80 hover:bg-gray-100"
                            }
                            role="radio"
                            aria-checked={answer === selectedAnswer}
                            tabIndex={0}
                            onClick={() => {
                                if (locked) return;
                                setSelectedAnswer(answer)
                                setShowConfirmButton(true)
                            }}
                        >
                            <h2 className="text-center">{answer}</h2>
                        </div>
                    );
                })}
            </div>
        </section>
    );
});

export default QCMQuestion;
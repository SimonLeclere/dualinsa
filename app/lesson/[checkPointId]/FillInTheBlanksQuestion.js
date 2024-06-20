import { useState, useImperativeHandle, forwardRef, Fragment } from 'react';

const FillInTheBlanksQuestion = forwardRef(function FillInTheBlanksQuestion({ currentQuestion, setShowConfirmButton }, ref) {

    // selectedAnswers is an array of strings|null with the same length as the number of holes in the text
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(currentQuestion.textWithHoles.split("{}").length - 1).fill(null));
    const [locked, setLocked] = useState(false);

    useImperativeHandle(ref, () => ({

        async checkAnswer() {
            setLocked(true);
            return {
                isCorrect: selectedAnswers.join() === currentQuestion.correctAnswer.join(),
                correction: currentQuestion.textWithHoles.split("{}").map((text, i) => {
                    return text + (i < currentQuestion.textWithHoles.split("{}").length - 1 ? currentQuestion.correctAnswer[i] : "");
                }).join(""),
                userAnswer: currentQuestion.textWithHoles.split("{}").map((text, i) => {
                    return text + (i < currentQuestion.textWithHoles.split("{}").length - 1 ? selectedAnswers[i] : "");
                }).join(""),
            };
        },

        reset() {
            setLocked(false);
            setSelectedAnswers(new Array(currentQuestion.textWithHoles.split("{}").length - 1).fill(null));
        }

    }));

    const updateConfirmButton = (selectedAnswers) => {
        setShowConfirmButton(!selectedAnswers.includes(null));
    };

    return (
        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24 pb-20">
            <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
                {currentQuestion.question}
            </h1>

            <div className="w-full">
                <div className="flex min-h-[60px] flex-wrap gap-1 border-b-2 border-t-2 border-gray-200 py-1">
                    <div className="flex items-center align-middle gap-2 px-2 pb-1">
                        {
                            currentQuestion.textWithHoles.split("{}").map((text, i) => {
                                return (
                                    <Fragment key={i}>
                                        {text}
                                        {i < currentQuestion.textWithHoles.split("{}").length - 1 && (

                                            selectedAnswers[i] ? (
                                                <button
                                                    key={i}
                                                    className="rounded-xl border-2 shadow-[0_2px_0_0_#e5e7eb] px-1 text-gray-700"
                                                    onClick={() => {
                                                        if (locked) return;
                                                        setSelectedAnswers((selectedAnswers) => {
                                                            const result = selectedAnswers.map((answer, index) => index === i ? null : answer);
                                                            updateConfirmButton(result);
                                                            return result;
                                                        });
                                                    }}
                                                >
                                                    {selectedAnswers[i]}
                                                </button>

                                            ) : (
                                                <button
                                                    key={i}
                                                    className="rounded-xl border-2 border-b-4 border-gray-200 bg-gray-200 px-2 py-3 text-gray-200"
                                                    disabled
                                                />
                                            )


                                        )}
                                    </Fragment>
                                );
                            })
                        }
                    </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center gap-1">
                {
                currentQuestion.propositions.map((answerTile, i) => {
                    return (
                        <button
                            key={i}
                            className={
                                selectedAnswers.includes(answerTile)
                                    ? "rounded-2xl border-2 border-b-4 border-gray-200 bg-gray-200 p-2 text-gray-200"
                                    : "rounded-2xl border-2 border-b-4 border-gray-200 p-2 text-gray-700"
                            }
                            disabled={selectedAnswers.includes(answerTile)}
                            onClick={() => {
                                setSelectedAnswers((selectedAnswers) => {
                                    // Find the first null in the selectedAnswers array
                                    const firstNullIndex = selectedAnswers.indexOf(null);
                                    if (firstNullIndex === -1) {
                                        // swap with the last element
                                        selectedAnswers[selectedAnswers.length - 1] = answerTile;
                                    }

                                    const result =  selectedAnswers.map((answer, index) => index === firstNullIndex ? answerTile : answer);
                                    updateConfirmButton(result);
                                    
                                    return result;
                                })
                            }}
                        >
                            {answerTile}
                        </button>
                    );
                })}
            </div>
        </section>
    );
});

export default FillInTheBlanksQuestion;
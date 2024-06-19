import { useState, useImperativeHandle, forwardRef } from 'react';

const TimedQuestion = forwardRef(function TimedQuestion({ currentQuestion, setShowConfirmButton }, ref) {

    const [userAnswer, setUserAnswer] = useState(null);
    const [locked, setLocked] = useState(false);

    useImperativeHandle(ref, () => ({

        async checkAnswer() {
            setLocked(true);
            return {
                isCorrect: true,
                correction: ""
            }
        },

        reset() {
            setLocked(false);
            setUserAnswer(null);
        }
    }));

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
        setShowConfirmButton(e.target.value.length > 0);
    };

    return (
        <section className="flex max-w-2xl grow flex-col gap-5 sm:items-center sm:justify-center sm:gap-24 sm:px-5 sm:pb-40">

            <h1 className="self-start text-2xl font-bold sm:text-3xl">
                {currentQuestion.question}
            </h1>

            <div className="flex items-center gap-2 px-2">
                <textarea
                    className="rounded-xl border-2 border-gray-200 p-4 w-full"
                    placeholder="Saisissez votre réponse ici..."
                    value={userAnswer}
                    onChange={handleInputChange}
                    rows={4}
                    cols={50}
                />
            </div>
        </section>
    );
});

export default TimedQuestion;
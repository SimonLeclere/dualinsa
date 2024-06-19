import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import QuitMessage from "./QuitMessage";
import CheckAnswer from "./CheckAnswer";

// Composant pour les questions ouvertes
export default function ProblemOpenQuestion({
  problem,
  correctAnswerCount,
  incorrectAnswerCount,
  totalCorrectAnswersNeeded,
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
  const { question, correctAnswer } = problem;
  const [userAnswer, setUserAnswer] = useState(""); // État pour stocker la réponse de l'utilisateur

  // Gestion de la saisie de l'utilisateur
  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  // Soumettre la réponse
  const handleSubmit = () => {
    // Logique de validation ou de traitement de la réponse
    // Vous pouvez appeler la fonction `onCheckAnswer` ou une logique similaire ici
    console.log("User answer:", userAnswer);
    // Par exemple, appeler la fonction onCheckAnswer(userAnswer);
  };

  return (
    <div className="flex min-h-screen flex-col gap-5 px-4 py-5 sm:px-0 sm:py-0">
      <div className="flex grow flex-col items-center gap-5">
        <div className="w-full max-w-5xl sm:mt-8 sm:px-5">
          <ProgressBar
            correctAnswerCount={correctAnswerCount}
            incorrectAnswerCount={incorrectAnswerCount}
            totalCorrectAnswersNeeded={totalCorrectAnswersNeeded}
            setQuitMessageShown={setQuitMessageShown}
            startTime={startTime}
            endTime={endTime}
          />
        </div>
        <section className="flex max-w-2xl grow flex-col gap-5 self-center sm:items-center sm:justify-center sm:gap-24 sm:px-5">
          <h1 className="self-start text-2xl font-bold sm:text-3xl">
            {question}
          </h1>

          <div className="flex items-center gap-2 px-2">
            <textarea
              className="rounded-xl border-2 border-gray-200 p-4 w-full"
              placeholder="Saisissez votre réponse ici..."
              value={userAnswer}
              onChange={handleInputChange}
              rows={4} // Nombre de lignes pour le textarea
              cols={50} // Nombre de colonnes pour le textarea
            />
          </div>
        </section>
      </div>

      <CheckAnswer
        correctAnswer={correctAnswer}
        correctAnswerShown={correctAnswerShown}
        isAnswerCorrect={isAnswerCorrect}
        isAnswerSelected={userAnswer.trim()} // Vérifie si l'utilisateur a saisi une réponse
        onCheckAnswer={onCheckAnswer} // Vous pouvez implémenter cette fonction pour valider la réponse
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

import React from "react";

const getMessageAndStyle = (percentage) => {
  if (percentage >= 75) {
    return {
      message: "Incroyable",
      bgColor: "bg-green-400",
      textColor: "text-green-400",
      borderColor: "border-green-400",
      textColorWhite: "text-white",
    };
  } else if (percentage >= 50) {
    return {
      message: "Bien",
      bgColor: "bg-yellow-400",
      textColor: "text-yellow-400",
      borderColor: "border-yellow-400",
      textColorWhite: "text-white",
    };
  } else if (percentage >= 25) {
    return {
      message: "Peut mieux faire",
      bgColor: "bg-orange-400",
      textColor: "text-orange-400",
      borderColor: "border-orange-400",
      textColorWhite: "text-white",
    };
  } else {
    return {
      message: "Boff",
      bgColor: "bg-red-400",
      textColor: "text-red-400",
      borderColor: "border-red-400",
      textColorWhite: "text-white",
    };
  }
};

export default function PerformanceDisplay({
  correctAnswerCount,
  incorrectAnswerCount,
}) {
  const totalAnswers = correctAnswerCount + incorrectAnswerCount;
  const percentage =
    totalAnswers === 0
      ? 0
      : Math.round((correctAnswerCount / totalAnswers) * 100);

  const { message, bgColor, textColor, borderColor, textColorWhite } =
    getMessageAndStyle(percentage);

  return (
    <div className={`min-w-[110px] rounded-xl border-2 ${borderColor} ${bgColor}`}>
      <h2 className={`py-1 text-center ${textColorWhite}`}>{message}</h2>
      <div className={`flex justify-center rounded-xl bg-white py-4 ${textColor}`}>
        {percentage}%
      </div>
    </div>
  );
}

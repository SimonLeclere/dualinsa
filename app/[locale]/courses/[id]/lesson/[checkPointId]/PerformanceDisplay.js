import React from "react";
import { useTranslations } from "next-intl";

const getMessageAndStyle = (percentage) => {
  if (percentage === 100) {
    return {
      messageSuffix: 100,
      bgColor: "bg-green-400",
      textColor: "text-green-400",
      borderColor: "border-green-400",
      textColorWhite: "text-white",
    };
  } else if (percentage >= 75) {
    return {
      messageSuffix: 75,
      bgColor: "bg-green-400",
      textColor: "text-green-400",
      borderColor: "border-green-400",
      textColorWhite: "text-white",
    };
  } else if (percentage >= 50) {
    return {
      messageSuffix: 50,
      bgColor: "bg-yellow-400",
      textColor: "text-yellow-400",
      borderColor: "border-yellow-400",
      textColorWhite: "text-white",
    };
  } else if (percentage >= 25) {
    return {
      messageSuffix: 25,
      bgColor: "bg-orange-400",
      textColor: "text-orange-400",
      borderColor: "border-orange-400",
      textColorWhite: "text-white",
    };
  } else {
    return {
      messageSuffix: 0,
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

  const t = useTranslations("Lesson.PerformanceDisplay");

  const totalAnswers = correctAnswerCount + incorrectAnswerCount;
  const percentage =
    totalAnswers === 0
      ? 0
      : correctAnswerCount / totalAnswers;

  const { messageSuffix, bgColor, textColor, borderColor, textColorWhite } =
    getMessageAndStyle(percentage);

  return (
    <div className={`min-w-[110px] rounded-xl border-2 ${borderColor} ${bgColor}`}>
      <h2 className={`py-1 text-center ${textColorWhite}`}>{t(`message-${messageSuffix}`)}</h2>
      <div className={`flex justify-center rounded-xl bg-white py-4 ${textColor}`}>
        {t('percentage', { value: percentage })}
      </div>
    </div>
  );
}

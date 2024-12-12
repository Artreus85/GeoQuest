"use client";

import React from "react";
import Image from "next/image";

interface QuizQuestionProps {
  imageSrc: string;
  question: string;
  options: string[];
  onOptionSelect: (selectedOption: string) => void;
  selectedAnswer: string | null;
  isAnswerSelected: boolean;
  showResult: boolean;
  correctAnswer: string;
}

const GameQuestion: React.FC<QuizQuestionProps> = ({
  imageSrc,
  question,
  options,
  onOptionSelect,
  selectedAnswer,
  isAnswerSelected,
  showResult,
  correctAnswer
}) => {
  return (
    <div className="flex flex-col text-black items-center bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{question}</h2>

      <div className="relative w-full h-52 mb-4">
        <Image
          src={imageSrc}
          alt="Quiz image"
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="w-full">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-2 px-4 mb-2 text-left border border-gray-300 rounded hover:bg-gray-100 transition ${
              selectedAnswer === option
                ? selectedAnswer === option
                  ? "bg-blue-200"
                  : "bg-red-200"
                  : ""
            }`}
            onClick={() => onOptionSelect(option)}
            disabled={isAnswerSelected} // Блокираме възможността за промяна след избор
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameQuestion;

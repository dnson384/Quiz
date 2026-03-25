import { NewQuestion } from "@/domain/entities/PracticeTest";
import React from "react";

interface Data {
  question: NewQuestion;
  questionIndex: number;
  handleQuestionChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    questionIndex: number,
    optionIndex: number | null,
    questionType: string | null,
  ) => void;
}

export default function TrueFalse({
  question,
  questionIndex,
  handleQuestionChange,
}: Data) {
  return (
    <>
      {/* Question options */}
      <div className="mt-3 flex flex-col gap-2">
        {question.options.map((option, optionIndex) => {
          return (
            <div key={option.tempId} className="flex items-center gap-3">
              <label className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
                <input
                  type="radio"
                  data-section="options"
                  tabIndex={-1}
                  id={`isCorrect-${option.tempId}-${optionIndex}`}
                  name={`isCorrect-${questionIndex}`}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  checked={option.isCorrect}
                  onChange={(e) =>
                    handleQuestionChange(
                      e,
                      questionIndex,
                      optionIndex,
                      question.questionBase.type,
                    )
                  }
                />
              </label>

              <label
                className="w-full"
                htmlFor={`isCorrect-${option.tempId}-${optionIndex}`}
              >
                {option.text}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
}

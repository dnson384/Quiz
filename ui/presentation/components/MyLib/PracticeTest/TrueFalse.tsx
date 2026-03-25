import { UpdateQuestion } from "@/domain/entities/PracticeTest";
import React from "react";

interface Data {
  question: UpdateQuestion;
  questionIndex: number;
  handleQuestionChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    questionIndex: number,
    questionType: string,
    optionIndex: number | null,
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
          const keyId = option.id ? option.id : option.tempId;
          return (
            <div key={keyId} className="flex items-center gap-3">
              <label className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer">
                <input
                  type="radio"
                  data-section="options"
                  tabIndex={-1}
                  id={`isCorrect-${keyId}-${optionIndex}`}
                  name={`isCorrect-${questionIndex}`}
                  defaultChecked={option.isCorrect}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  onChange={(e) =>
                    handleQuestionChange(
                      e,
                      questionIndex,
                      "TRUE_FALSE",
                      optionIndex,
                    )
                  }
                />
              </label>

              <label
                className="w-full"
                htmlFor={`isCorrect-${keyId}-${optionIndex}`}
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

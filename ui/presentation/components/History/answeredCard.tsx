"use client";
import { QuestionOption } from "@/domain/entities/PracticeTest";

interface Data {
  questionIndex: number;
  questionText: string;
  questionType: string;
  selectedId: string[];
  answerOptions: QuestionOption[];
}

export default function AnsweredCard({
  questionIndex,
  questionText,
  questionType,
  selectedId,
  answerOptions,
}: Data) {
  return (
    <div className="flex items-start">
      <p className="min-w-10 text-lg">{questionIndex + 1}.</p>
      <div>
        <p className="mb-1 text-lg">{questionText}</p>
        <div className="flex flex-col gap-1">
          {answerOptions.map((option) => {
            const isSelected = selectedId.includes(option.id);

            let labelClasses = "text-lg w-full";
            if (option.isCorrect) {
              labelClasses += " text-green-700 font-bold";
            } else if (isSelected) {
              labelClasses += " text-red-700";
            }

            return (
              <div key={option.id} className="flex items-center gap-4">
                <input
                  type={
                    questionType === "MULTIPLE_CHOICE" ? "checkbox" : "radio"
                  }
                  className="accent-indigo-700 w-4 h-4"
                  checked={isSelected}
                  disabled
                  readOnly
                />
                <label className={labelClasses}>{option.text}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

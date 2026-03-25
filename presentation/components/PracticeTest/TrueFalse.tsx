import {
  AnswerQuestionData,
  QuestionOption,
} from "@/domain/entities/PracticeTest";

interface Data {
  options: QuestionOption[];
  questionIndex: number;
  answeredQuestions: AnswerQuestionData;
  handleOptionSelected: (
    questionIndex: number,
    questionType: string,
    optionId: string,
  ) => void;
}

export default function TrueFalse({
  options,
  questionIndex,
  answeredQuestions,
  handleOptionSelected,
}: Data) {
  const currentQuestion = answeredQuestions[questionIndex];
  return (
    <>
      <div className="mt-3 flex flex-col gap-2">
        {options.map((option) => {
          return (
            <div key={option.id} className="flex items-center gap-3">
              <input
                type="radio"
                id={`option-${questionIndex}-${option.id}`}
                className="w-4 h-4 accent-indigo-500 cursor-pointer"
                checked={
                  currentQuestion
                    ? currentQuestion.optionId.includes(option.id)
                    : false
                }
                onChange={() =>
                  handleOptionSelected(questionIndex, "TRUE_FALSE", option.id)
                }
              />
              <label
                className="w-full"
                htmlFor={`option-${questionIndex}-${option.id}`}
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

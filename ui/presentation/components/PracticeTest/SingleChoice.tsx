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

export default function SingleChoice({
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
            <div key={option.id}>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  id={`option-${questionIndex}-${option.id}`}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer"
                  checked={
                    currentQuestion
                      ? currentQuestion.optionId.includes(option.id)
                      : false
                  }
                  onChange={() =>
                    handleOptionSelected(
                      questionIndex,
                      "SINGLE_CHOICE",
                      option.id,
                    )
                  }
                />
                <label
                  className="w-full"
                  htmlFor={`option-${questionIndex}-${option.id}`}
                >
                  {option.text}
                </label>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

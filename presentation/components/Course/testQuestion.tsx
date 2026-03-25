import { Term } from "@/domain/entities/Course";

interface LearnQuestionParams {
  questionIndex: number;
  currentQuestionOptions: Term[];
  correctAnswer: Term;
  selectedOption: string | null;
  questionsCount: number;
  handleOptionSelected: (
    questionIndex: number,
    option_id: string,
    correct_id: string,
  ) => void;
}

export default function TestQuestion({
  questionIndex,
  currentQuestionOptions,
  correctAnswer,
  selectedOption,
  questionsCount,
  handleOptionSelected,
}: LearnQuestionParams) {
  return (
    <section className="lg:w-5xl lg:mx-auto mx-5 lg:px-7 py-5 lg:border border-gray-300 rounded-lg">
      {/* Term */}
      <div className="mb-16">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold text-gray-500 mb-6">Định nghĩa</h4>
          <h3 className="text-sm text-gray-500">
            {questionIndex + 1}/{questionsCount}
          </h3>
        </div>
        <p className="text-xl font-semibold">{correctAnswer.term}</p>
      </div>

      {/* Options */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 mb-5">
          Chọn đáp án đúng
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 select-none">
          {currentQuestionOptions &&
            currentQuestionOptions.map((option) => (
              <div
                key={option.id}
                onClick={() =>
                  handleOptionSelected(
                    questionIndex,
                    option.id!,
                    correctAnswer.id!,
                  )
                }
                className={`flex items-center border rounded-md cursor-pointer mb-3 transition-all duration-200  ${
                  selectedOption === option.id
                    ? "border-indigo-500 ring-2 ring-indigo-500 bg-indigo-50"
                    : "border-gray-200"
                } `}
              >
                <div className="flex items-center gap-4 px-4 py-3 w-full">
                  <p className="text-gray-700 font-medium">
                    {option.definition}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

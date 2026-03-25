import { Term } from "@/domain/entities/Course";

interface LearnQuestionParams {
  questionIndex: number;
  currentQuestionOptions: Term[];
  correctAnswer: Term;
  selectedOption: string | null;
}

export default function TestQuestionResult({
  questionIndex,
  currentQuestionOptions,
  correctAnswer,
  selectedOption,
}: LearnQuestionParams) {
  return (
    <section className="w-5xl mx-auto px-7 py-5 border border-gray-300 rounded-lg">
      {/* Term */}
      <div className="mb-16">
        <div className="flex justify-between">
          <h4 className="text-sm font-bold text-gray-500 mb-6">Định nghĩa</h4>
          <h3 className="text-sm text-gray-500">{questionIndex + 1}/20</h3>
        </div>
        <p className="text-xl font-semibold">{correctAnswer.term}</p>
      </div>

      {/* Options */}
      <div>
        <h4 className="text-sm font-bold text-gray-500 mb-5">
          Chọn đáp án đúng
        </h4>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 select-none">
          {currentQuestionOptions &&
            currentQuestionOptions.map((option) => {
              const isCorrect = option.id === correctAnswer.id;
              const hasAnswer = selectedOption === option.id;

              let classStyle = "border-gray-200";
              if (isCorrect) {
                classStyle = "border-teal-500 ring-2 ring-teal-500 bg-teal-50";
              } else if (!isCorrect && hasAnswer) {
                classStyle = "border-red-400 ring-2 ring-red-400 bg-red-50";
              }
              return (
                <div
                  key={option.id}
                  className={`flex items-center border rounded-md cursor-pointer mb-3 transition-all duration-200 ${classStyle} `}
                >
                  <div className="flex items-center gap-4 px-4 py-3 w-full">
                    <p className="text-gray-700 font-medium">
                      {option.definition}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}

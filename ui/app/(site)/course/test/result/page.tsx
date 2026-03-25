"use client";
import { useTestResult } from "@/presentation/store/courseTest.store";
import useCourseTest from "@/presentation/hooks/Course/useCourseTest";

import TestQuestionResult from "@/presentation/components/Course/TestQuestionResult";
import LearnMethodDropdown from "@/presentation/components/Layout/LearnMethodDropdown";
import TestScoreChart from "@/presentation/components/Common/TestScoreChart";

export default function TestResult() {
  const testResult = useTestResult((state) => state.testResult);
  const {
    score,
    baseInfo,
    questions,
    shuffleQuestionsOptions,
    selectedOptions,
  } = testResult;
  const { handleClose, handleSidebarClick } = useCourseTest();

  return (
    <>
      {baseInfo && (
        <>
          <header className="py-3 px-5 relative h-18">
            <LearnMethodDropdown />
            <div className="h-full flex justify-center items-center">
              <p className="font-semibold text-lg capitalize">
                {baseInfo.name}
              </p>
            </div>
            <div
              className="absolute right-5 top-3 p-2 rounded-full hover:bg-gray-200"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="cursor-pointer"
              >
                <path
                  fill="currentColor"
                  d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
                />
              </svg>
            </div>
          </header>

          <section className="flex justify-center mb-10">
            <TestScoreChart score={score} total={questions.length} />
          </section>

          <section className="flex flex-col gap-5 relative">
            {baseInfo && questions && shuffleQuestionsOptions && (
              <>
                {questions.map((question, index) => {
                  const currentQuestionOptions = shuffleQuestionsOptions[index];
                  return (
                    <div
                      key={question.question.id}
                      id={`question-${index}`}
                      className="scroll-mt-4"
                    >
                      <TestQuestionResult
                        questionIndex={index}
                        correctAnswer={question.question}
                        currentQuestionOptions={currentQuestionOptions}
                        selectedOption={
                          selectedOptions[index]?.optionId || null
                        }
                      />
                    </div>
                  );
                })}
                <aside className="fixed inset-0 top-18 left-5 w-fit">
                  <div className="h-fit grid grid-cols-4 gap-2 select-none cursor-pointer">
                    {questions.map((question, index) => {
                      let isCorrect = false;
                      if (selectedOptions[index]) {
                        const currentOption = selectedOptions[index];
                        isCorrect =
                          currentOption.correctId === currentOption.optionId;
                      }
                      return (
                        <div
                          key={question.question.id}
                          className={`w-8 h-8 text-sm p-2 text-white ${
                            isCorrect ? "bg-teal-500" : "bg-red-400"
                          } rounded-full flex justify-center items-center`}
                          onClick={() => handleSidebarClick(index)}
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    className="mt-3 w-full px-3 py-2 bg-indigo-50 font-medium p-2 rounded-full cursor-pointer hover:bg-indigo-500 hover:text-white"
                    onClick={handleClose}
                  >
                    Thoát
                  </button>
                </aside>

                {/* Submit Btn */}
                <div className="my-5 flex justify-center">
                  <button
                    className="px-5 py-3 rounded-full bg-indigo-500 text-white font-bold cursor-pointer hover:bg-indigo-600"
                    onClick={handleClose}
                  >
                    Thoát
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </>
  );
}

"use client";
import { usePracticeTestResult } from "@/presentation/store/practiceTest.store";

import useTakePracticeTest from "@/presentation/hooks/PracticeTest/useTakePracticeTest";

import TestScoreChart from "@/presentation/components/Common/TestScoreChart";
import PracticeTestAnswerResult from "@/presentation/components/PracticeTest/PracticeTestResult";

export default function PracticeTestResult() {
  const practiceTestResult = usePracticeTestResult(
    (state) => state.practiceTestResult,
  );
  const { score, baseInfo, shuffleQuestions, selectedOptions } =
    practiceTestResult;

  const { handleClose, handleSidebarClick } = useTakePracticeTest();
  return (
    <>
      {baseInfo && (
        <>
          <header className="py-3 px-5 relative h-18">
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
            <TestScoreChart score={score} total={shuffleQuestions.length} />
          </section>

          <section className="mt-15 py-10 w-4xl mx-auto flex flex-col gap-4">
            {baseInfo && shuffleQuestions && shuffleQuestions && (
              <>
                {shuffleQuestions.map((question, index) => {
                  return (
                    <div
                      key={question.question.id}
                      id={`question-${index}`}
                      className=""
                    >
                      <PracticeTestAnswerResult
                        questionIndex={index}
                        questionText={question.question.text}
                        selectedId={selectedOptions[index]?.id || ""}
                        answerOptions={question.options}
                      />
                    </div>
                  );
                })}
                <aside className="fixed inset-0 top-18 left-5 w-fit h-fit">
                  <div className="grid grid-cols-4 gap-2 select-none cursor-pointer">
                    {shuffleQuestions.map((question, index) => {
                      return (
                        <div
                          key={question.question.id}
                          className={`w-8 h-8 text-sm p-2 text-white ${
                            selectedOptions[index]?.isCorrect
                              ? "bg-teal-500"
                              : "bg-red-400"
                          } rounded-full flex justify-center items-center`}
                          onClick={() => handleSidebarClick(index)}
                        >
                          {index + 1}
                        </div>
                      );
                    })}
                  </div>
                  <button
                    className="mt-3 py-2 px-3 w-full font-medium bg-indigo-50 rounded-full cursor-pointer hover:bg-indigo-500 hover:text-white"
                    onClick={handleClose}
                  >
                    Thoát
                  </button>
                </aside>

                {/* Submit Btn */}
                <div className="mt-5 flex justify-center">
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

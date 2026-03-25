"use client";
import LearnMethodDropdown from "@/presentation/components/Layout/LearnMethodDropdown";
import QuestionProgressBar from "@/presentation/components/Course/QuestionProgress";

import useCourseLearn from "@/presentation/hooks/Course/useCourseLearn";

export default function CourseDetailLearn() {
  const {
    baseInfo,
    shuffledQuestions,
    currentIndex,
    currentQuestionOptions,
    selectedOptionId,
    showRetryPrompt,
    notification,
    handleClose,
    handlePromptOption,
    handleOptionSelected,
  } = useCourseLearn();

  const icon = {
    correct: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 15 15"
      >
        <path
          fill="#14B8A6"
          fillRule="evenodd"
          d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0m7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768z"
          clipRule="evenodd"
        />
      </svg>
    ),
    incorrect: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 32 32"
      >
        <path
          fill="#F87171"
          d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m5.4 21L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"
        />
      </svg>
    ),
    all_correct: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 15 15"
      >
        <path
          fill="#6366F1"
          fillRule="evenodd"
          d="M0 7.5a7.5 7.5 0 1 1 15 0a7.5 7.5 0 0 1-15 0m7.072 3.21l4.318-5.398l-.78-.624l-3.682 4.601L4.32 7.116l-.64.768z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <>
      {/* Noti - Done - All Correct */}
      {notification && (
        <div className="fixed inset-0 z-10 flex justify-center">
          <div className="mt-3 h-fit bg-indigo-50 shadow-lg px-5 py-2 rounded-xl flex items-center gap-3">
            {icon.all_correct}
            <p className="font-medium text-indigo-700">{notification}</p>
          </div>
        </div>
      )}

      <header className="py-3 px-5 relative h-18">
        <LearnMethodDropdown />
        <div className="h-full flex justify-center items-center">
          <p className="font-semibold text-lg capitalize">{baseInfo?.name}</p>
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

      {baseInfo && shuffledQuestions && (
        <>
          {/* Review unknown words */}
          {showRetryPrompt && (
            <div className="fixed inset-0 z-10 flex justify-center bg-black/50">
              <div className="mt-3 h-fit bg-white shadow-lg px-10 py-7 rounded-xl flex flex-col gap-5">
                <p className="font-semibold">
                  Bạn đã hoàn thành bài học!
                  <br />
                  Bạn có muốn ôn lại những từ chưa thuộc không?
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    className="w-25 py-1 font-semibold text-white bg-indigo-500 rounded-full cursor-pointer hover:bg-indigo-700"
                    onClick={() => handlePromptOption(true)}
                  >
                    Đồng ý
                  </button>
                  <button
                    className="w-25 py-1 font-semibold text-indigo-500  border border-indigo-500 ring-1 ring-indigo-500 rounded-full cursor-pointer hover:bg-indigo-100"
                    onClick={() => handlePromptOption(false)}
                  >
                    Không
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Learn status */}
          <QuestionProgressBar
            currentQuestionIndex={currentIndex}
            num_of_terms={shuffledQuestions.length}
          />

          {/* Question */}
          <section className="lg:w-5xl lg:mx-auto mx-5 lg:px-7 py-5 lg:border border-gray-300 rounded-lg">
            {/* Term */}
            <div className="mb-16">
              <h4 className="text-sm font-bold text-gray-500 mb-6">
                Định nghĩa
              </h4>
              <p className="text-xl font-semibold">
                {shuffledQuestions[currentIndex].question.term}
              </p>
            </div>

            {/* Options */}
            <div>
              <h4 className="text-sm font-bold text-gray-500 mb-5">
                Chọn đáp án đúng
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-3 select-none">
                {currentQuestionOptions.map((option, index) => {
                  const correctAnwser =
                    shuffledQuestions[currentIndex].question.id;
                  const hasAnswered = selectedOptionId !== null;
                  const isChosen = selectedOptionId === option.id;
                  const isTargetAnswer = option.id === correctAnwser;

                  let containerStyle = "border-gray-200 hover:bg-gray-200";
                  let circleBg = "bg-gray-200";
                  let content = (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  );

                  if (hasAnswered) {
                    if (isTargetAnswer) {
                      containerStyle =
                        "border-teal-500 bg-teal-50 ring-1 ring-teal-500";
                      circleBg = "bg-transparent";
                      content = icon.correct;
                    } else if (isChosen) {
                      containerStyle =
                        "border-red-400 bg-red-50 ring-1 ring-red-400";
                      circleBg = "bg-transparent";
                      content = icon.incorrect;
                    }
                  }

                  return (
                    <div
                      key={option.id}
                      onClick={() =>
                        handleOptionSelected(option.id!, correctAnwser!)
                      }
                      className={`flex items-center border rounded-md cursor-pointer mb-3 transition-all duration-200 ${containerStyle} ${
                        hasAnswered ? "pointer-events-none" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4 px-4 py-3 w-full">
                        <div
                          className={`w-6 h-6 shrink-0 rounded-full flex justify-center items-center ${circleBg}`}
                        >
                          {content}
                        </div>

                        <p className="text-gray-700">{option.definition}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

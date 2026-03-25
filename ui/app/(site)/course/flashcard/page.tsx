"use client";
import Flashcard from "@/presentation/components/Course/Flashcard";
import LearnMethodDropdown from "@/presentation/components/Layout/LearnMethodDropdown";

import useFlashcard from "@/presentation/hooks/Course/useCourseFlashcard";
import { isLatinText } from "@/presentation/utils/textFormatter.util";

export default function CourseDetailFlashCard() {
  const {
    baseInfo,
    currentTermData,
    totalTerms,
    currentTermDisplay,
    canBack,
    canForward,
    rotateX,
    isResetting,
    direction,
    notification,
    handleFlashcardClick,
    handleNavigation,
    handleClose,
  } = useFlashcard();

  return (
    <>
      {notification && (
        <div className="fixed inset-0 z-10 flex justify-center">
          <div className="mt-3 h-fit bg-indigo-50 shadow-lg px-5 py-2 rounded-xl flex items-center gap-3">
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
            <p className="font-medium text-indigo-700">{notification}</p>
          </div>
        </div>
      )}
      {baseInfo && (
        <>
          <header className="py-3 px-5 h-18 relative">
            <LearnMethodDropdown />
            <div className="h-full flex justify-center items-center ">
              <p className="font-bold text-lg">{baseInfo.name}</p>
            </div>
            <div
              className="absolute right-3 top-3 p-2 rounded-full hover:bg-gray-200"
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

          {/* Flashcard */}
          <div className="mx-auto w-md sm:w-[70%] h-max z-0">
            <section className="flex flex-col gap-5">
              {/* Flashcard Demo */}
              {currentTermData ? (
                <Flashcard
                  term={currentTermData.term}
                  definition={currentTermData.definition}
                  currentTermDisplay={currentTermDisplay}
                  num_of_terms={totalTerms}
                  rotateX={rotateX}
                  canBack={canBack}
                  canForward={canForward}
                  isResetting={isResetting}
                  direction={direction}
                  handleFlashcardClick={handleFlashcardClick}
                  handleNavigation={handleNavigation}
                  isLatinText={isLatinText}
                />
              ) : (
                <div className="h-[450px] w-full"></div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}

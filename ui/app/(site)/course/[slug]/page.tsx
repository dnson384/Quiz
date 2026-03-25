"use client";
import { useEffect } from "react";
import Image from "next/image";

import Header from "@/presentation/components/Layout/Header";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import Flashcard from "@/presentation/components/Course/Flashcard";
import TermCard from "@/presentation/components/Course/TermCard";

import useCourseDetail from "@/presentation/hooks/Course/useCourseDetail";
import useFlashcard from "@/presentation/hooks/Course/useCourseFlashcard";
import { isLatinText } from "@/presentation/utils/textFormatter.util";

export default function CourseDetail() {
  const { error, courseDetail, handleLearnOptionClick } = useCourseDetail();
  const baseInfo = courseDetail?.baseInfo;
  const terms = courseDetail?.terms;

  const {
    currentIndex,
    currentTermDisplay,
    totalTerms,
    rotateX,
    canBack,
    canForward,
    isResetting,
    direction,
    handleFlashcardClick,
    handleNavigation,
  } = useFlashcard();

  return (
    <>
      <Header />

      <div className="flex mt-15 mb-5">
        <SideMenu />
        {error && (
          <div className="fixed inset-0 h-fit flex justify-center top-20">
            <div className="fixed z-10 h-fit inset-0 flex justify-center top-15">
              <div className="flex items-center gap-2 bg-red-100 w-fit h-fit p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#f67c6f"
                    fillRule="evenodd"
                    d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
                  />
                </svg>
                <p className=" text-red-400 select-none">{error}</p>
              </div>
            </div>
          </div>
        )}
        {baseInfo && (
          <main className="mx-auto my-3 w-md sm:w-xl md:w-2xl lg:w-3xl px-5 sm:p-0">
            {/* Thông tin chung */}
            <section className="flex flex-col gap-5">
              {/* Tên học phần */}
              <article className="flex items-center justify-between">
                <h2 className="text-3xl font-bold">{baseInfo.name}</h2>
              </article>

              {/* Các tính năng học */}
              <article className="grid grid-cols-3 gap-3">
                {/* Flashcard */}
                <div
                  className="bg-white shadow-sm flex gap-2 items-center justify-center py-3 rounded-lg cursor-pointer select-none hover:shadow-md hover:bg-white hover:shadow-indigo-400"
                  onClick={() =>
                    handleLearnOptionClick("flashcard", baseInfo.id)
                  }
                >
                  <svg
                    width="30"
                    height="24"
                    viewBox="0 0 30 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden sm:block"
                  >
                    <rect
                      x="6.3158"
                      y="6.3158"
                      width="23.6842"
                      height="16.9173"
                      rx="3"
                      fill="#7DD3FC"
                    />
                    <rect
                      width="23.6842"
                      height="16.9173"
                      rx="3"
                      fill="#6366F1"
                    />
                  </svg>
                  <h3 className="font-semibold">Thẻ ghi nhớ</h3>
                </div>
                {/* Học */}
                <div
                  className="bg-white shadow-sm flex gap-2 items-center justify-center py-3 rounded-lg cursor-pointer select-none hover:shadow-md hover:bg-white hover:shadow-indigo-400"
                  onClick={() => handleLearnOptionClick("learn", baseInfo.id)}
                >
                  <svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden sm:block"
                  >
                    <path
                      d="M9.91156 4.7301C8.71986 4.99874 7.5635 5.67481 6.36176 6.52502C5.33523 7.25132 4.51881 8.22528 3.97992 9.36975C3.44077 10.5149 3.19151 11.806 3.2641 13.1393C3.33681 14.4735 3.72993 15.8104 4.42133 17.0338C5.11286 18.2574 6.07883 19.3262 7.23773 20.1461C8.39646 20.9658 9.70781 21.509 11.0571 21.736C12.4058 21.9628 13.749 21.8661 14.976 21.4684C17.1035 20.7786 18.4214 19.9863 19.8188 19.0934L21.434 21.6207C19.9511 22.5683 18.3845 23.517 15.9018 24.3219C14.198 24.8743 12.3657 24.9975 10.56 24.694C8.75447 24.3903 7.02194 23.668 5.50433 22.5944C3.98676 21.5207 2.71974 20.1208 1.80902 18.5094C0.8984 16.898 0.366766 15.1143 0.268005 13.3033C0.169269 11.4914 0.506839 9.70294 1.26508 8.09241C2.02369 6.48115 3.17734 5.10242 4.62836 4.07581C5.9042 3.17317 7.45931 2.2073 9.2514 1.80334L9.91156 4.7301Z"
                      fill="#6366F1"
                    />
                    <path
                      d="M18.4626 20.3956C18.4627 21.3115 19.205 22.0546 20.1218 22.0547C21.0387 22.0547 21.7818 21.3116 21.7819 20.3956C21.7819 19.4794 21.0388 18.7364 20.1218 18.7364C19.2049 18.7366 18.4626 19.4795 18.4626 20.3956Z"
                      fill="white"
                      stroke="#6366F1"
                      strokeWidth="2.8"
                    />
                    <path
                      d="M7.24292 3.05957C7.24307 3.97547 7.98534 4.71857 8.9021 4.71875C9.81902 4.71875 10.5621 3.97558 10.5623 3.05957C10.5623 2.14343 9.81911 1.40039 8.9021 1.40039C7.98525 1.40057 7.24292 2.14355 7.24292 3.05957Z"
                      fill="white"
                      stroke="#6366F1"
                      strokeWidth="2.8"
                    />
                    <ellipse
                      cx="2.03953"
                      cy="2.03994"
                      rx="2.03953"
                      ry="2.03994"
                      transform="matrix(0 1 1 -4.37026e-08 12.9823 0)"
                      fill="#7DD3FC"
                    />
                    <ellipse
                      cx="2.03953"
                      cy="2.03994"
                      rx="2.03953"
                      ry="2.03994"
                      transform="matrix(0 1 1 -4.37026e-08 18.0822 3.0593)"
                      fill="#7DD3FC"
                    />
                    <ellipse
                      cx="2.03953"
                      cy="2.03994"
                      rx="2.03953"
                      ry="2.03994"
                      transform="matrix(0 1 1 -4.37026e-08 21.142 8.15811)"
                      fill="#7DD3FC"
                    />
                    <ellipse
                      cx="2.03953"
                      cy="2.03994"
                      rx="2.03953"
                      ry="2.03994"
                      transform="matrix(0 1 1 -4.37026e-08 21.142 13.257)"
                      fill="#7DD3FC"
                    />
                  </svg>
                  <h3 className=" font-semibold">Học</h3>
                </div>
                {/* Kiểm tra */}
                <div
                  className="bg-white shadow-sm flex gap-2 items-center justify-center py-3 rounded-lg cursor-pointer select-none hover:shadow-md hover:bg-white hover:shadow-indigo-400"
                  onClick={() => handleLearnOptionClick("test", baseInfo.id)}
                >
                  <svg
                    width="20"
                    height="25"
                    viewBox="0 0 30 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hidden sm:block"
                  >
                    <path
                      d="M14.1044 11.7628L12.1174 16.1133H16.0913L14.1044 11.7628Z"
                      fill="#7DD3FC"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30 8.8623L21.1691 0H8.8058C7.86896 0 6.97049 0.339529 6.30804 0.943894C5.6456 1.54826 5.27344 2.36795 5.27344 3.22266V29.0039C5.27344 29.8586 5.6456 30.6783 6.30804 31.2827C6.97049 31.887 7.86896 32.2266 8.8058 32.2266H26.4676C27.4045 32.2266 28.3029 31.887 28.9654 31.2827C29.6278 30.6783 30 29.8586 30 29.0039V8.8623Z"
                      fill="#7DD3FC"
                    />
                    <path
                      d="M9.10715 16.2628L7.05804 20.6133H11.1563L9.10715 16.2628Z"
                      fill="#6366F1"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M25.5 13.3623L16.3929 4.5H3.64286C2.67671 4.5 1.75014 4.83953 1.06697 5.44389C0.3838 6.04826 0 6.86795 0 7.72266V33.5039C0 34.3586 0.3838 35.1783 1.06697 35.7827C1.75014 36.387 2.67671 36.7266 3.64286 36.7266H21.8571C22.8233 36.7266 23.7499 36.387 24.433 35.7827C25.1162 35.1783 25.5 34.3586 25.5 33.5039V13.3623Z"
                      fill="#6366F1"
                    />
                    <rect
                      x="5"
                      y="20"
                      width="15"
                      height="3"
                      rx="1.5"
                      fill="white"
                    />
                    <rect
                      x="5"
                      y="25"
                      width="10"
                      height="3"
                      rx="1.5"
                      fill="white"
                    />
                  </svg>
                  <h3 className=" font-semibold">Kiểm tra</h3>
                </div>
              </article>

              {/* Flashcard Demo */}
              {terms && terms.length > 0 ? (
                <Flashcard
                  term={terms[currentIndex].term}
                  definition={terms[currentIndex].definition}
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

            {/* Author Info */}
            <section className="flex gap-3 select-none">
              {/* Avatar */}
              <div className="w-fit h-fit rounded-full overflow-hidden">
                <Image
                  src={`/api/images${baseInfo.authorAvatar}`}
                  alt={"author avatar"}
                  width={48}
                  height={48}
                  className="w-12 h-12 object-cover"
                />
              </div>

              {/* Author name */}
              <div className="flex flex-col justify-around">
                <p className="text-xs">Tạo bởi</p>
                <p className="font-bold leading-none">{baseInfo.authorName}</p>
              </div>
            </section>

            {/* Terms */}
            <section className="mt-10">
              <h3 className="text-xl font-bold mb-5">
                Thuật ngữ trong học phần này ({totalTerms})
              </h3>
              <article className="p-5 bg-indigo-50 rounded-2xl flex flex-col gap-2">
                {terms &&
                  terms.length > 0 &&
                  terms.map((term) => (
                    <TermCard
                      key={term.id}
                      term={term.term}
                      definition={term.definition}
                    />
                  ))}
              </article>
            </section>
          </main>
        )}
      </div>
    </>
  );
}

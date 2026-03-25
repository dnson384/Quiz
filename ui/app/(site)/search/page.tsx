"use client";
import Header from "@/presentation/components/Layout/Header";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import useSearch from "@/presentation/hooks/Search/useSearch";
import AllResult from "../../../presentation/components/Search/AllResult";
import CourseResult from "../../../presentation/components/Search/CoureResult";
import PracticeTestResult from "../../../presentation/components/Search/PracticeTestResult";

export default function Search() {
  const {
    keyword,
    type,
    isLoading,
    courses,
    practiceTests,
    notification,
    HandlerShowResult,
    handleLoadMoreResults,
    handleViewAllResult,
  } = useSearch();

  return (
    <>
      <Header />
      <div className="flex">
        <SideMenu />

        {isLoading ? (
          <div className="fixed inset-0 z-[-1] flex items-center justify-center">
            <div className="loader"></div>
          </div>
        ) : (
          <section className="mx-auto mt-[74px] flex flex-col gap-8 px-5 sm:p-0">
            <>
              <h2 className="text-2xl font-bold">Kết quả cho "{keyword}"</h2>
              <div className="relative w-full border-b border-gray-300">
                <div className="flex gap-6">
                  <h3
                    id="all"
                    className={`${
                      type === "all"
                        ? "border-b-2 border-indigo-500"
                        : "text-gray-500"
                    } text-sm font-bold pb-2 cursor-pointer`}
                    onClick={(e) => HandlerShowResult(e, type)}
                  >
                    Tẩt cả kết quả
                  </h3>
                  <h3
                    id="courses"
                    className={`${
                      type === "courses"
                        ? "border-b-2 border-indigo-500"
                        : "text-gray-500"
                    } text-sm font-bold pb-2 cursor-pointer`}
                    onClick={(e) => HandlerShowResult(e, type)}
                  >
                    Học phần
                  </h3>
                  <h3
                    id="practice_tests"
                    className={`${
                      type === "practice_tests"
                        ? "border-b-2 border-indigo-500"
                        : "text-gray-500"
                    } text-sm font-bold pb-2 cursor-pointer`}
                    onClick={(e) => HandlerShowResult(e, type)}
                  >
                    Bài kiểm tra thử
                  </h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
                  <div className="md:w-60 lg:w-xs"></div>
                  <div className="md:w-60 lg:w-xs"></div>
                  <div className="md:w-60 lg:w-xs"></div>
                </div>
              </div>

              {/* Show all */}
              {type === "all" && (
                <AllResult
                  courses={courses}
                  practiceTests={practiceTests}
                  handleViewAllResult={handleViewAllResult}
                />
              )}

              {/* Courses */}
              {type === "courses" && (
                <CourseResult
                  courses={courses}
                  handleLoadMoreResults={handleLoadMoreResults}
                  notification={notification}
                />
              )}

              {/* Practice Test */}
              {type === "practice_tests" && (
                <PracticeTestResult
                  practiceTests={practiceTests}
                  handleLoadMoreResults={handleLoadMoreResults}
                  notification={notification}
                />
              )}
            </>
          </section>
        )}
      </div>
    </>
  );
}

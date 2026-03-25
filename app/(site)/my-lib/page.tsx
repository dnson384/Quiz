"use client";
import Header from "@/presentation/components/Layout/Header";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import useMyLib from "@/presentation/hooks/MyLib/useMylib";
import CourseCard from "@/presentation/components/MyLib/Course/CourseCard";
import PracticeTestCard from "@/presentation/components/MyLib/PracticeTest/PracticeTestCard";
export default function MyPracticeTest() {
  const {
    courses,
    practiceTests,
    type,
    role,
    handleChangeType,
    handleCreateCourseClick,
    handleSearchClick,
    handleCardClick,
  } = useMyLib();
  return (
    <>
      <Header />
      <div className="flex">
        <SideMenu />

        <section className="w-md md:w-2xl lg:w-6xl mx-auto mt-[74px]">
          <nav className="flex flex-col gap-8 mb-5">
            <h1 className="text-3xl font-bold">Thư viện của bạn</h1>
            <div className="flex gap-6">
              <h3
                id="courses"
                className={`${
                  type === "courses"
                    ? "border-b-2 border-indigo-500"
                    : "text-gray-500"
                }  text-sm font-bold pb-2 cursor-pointer`}
                onClick={(e) => handleChangeType(e)}
              >
                Học phần
              </h3>
              <h3
                id="practice_tests"
                className={`${
                  type === "practice_tests"
                    ? "border-b-2 border-indigo-500"
                    : "text-gray-500"
                }  text-sm font-bold pb-2 cursor-pointer`}
                onClick={(e) => handleChangeType(e)}
              >
                Bài kiểm tra thử
              </h3>
              <h3
                id="textbooks"
                className={`${
                  type === "textbooks"
                    ? "border-b-2 border-indigo-500"
                    : "text-gray-500"
                }  text-sm font-bold pb-2 cursor-pointer`}
                onClick={(e) => handleChangeType(e)}
              >
                Sách giáo khoa
              </h3>
            </div>
          </nav>

          {type === "courses" && (
            <>
              {courses.length > 0 ? (
                <section className="flex flex-col gap-3">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      courseId={course.id}
                      courseName={course.name}
                      termCount={course.termCount}
                      handleCardClick={handleCardClick}
                    />
                  ))}
                </section>
              ) : (
                <section className="p-20 flex flex-col gap-3 justify-center items-center">
                  <h1 className="font-semibold text-3xl">
                    Bạn chưa có học phần nào
                  </h1>
                  <button
                    className="bg-indigo-500 text-white font-semibold px-5 py-3 rounded-full cursor-pointer hover:bg-indigo-700"
                    onClick={handleCreateCourseClick}
                  >
                    Tạo học phần cho riêng bạn
                  </button>
                </section>
              )}
            </>
          )}

          {type === "practice_tests" && (
            <>
              {practiceTests.length > 0 ? (
                <section className="flex flex-col gap-3">
                  {practiceTests.map((practiceTest) => (
                    <PracticeTestCard
                      key={practiceTest.id}
                      practiceTestId={practiceTest.id}
                      practiceTestName={practiceTest.name}
                      handleCardClick={handleCardClick}
                    />
                  ))}
                </section>
              ) : (
                <>
                  {role === "TEACHER" ? (
                    <section className="p-20 flex flex-col gap-3 justify-center items-center">
                      <h1 className="font-semibold text-3xl">
                        Bạn chưa có bài kiểm tra thử nào
                      </h1>
                      <button className="bg-indigo-500 text-white font-semibold px-5 py-3 rounded-full cursor-pointer hover:bg-indigo-700">
                        Tạo bài kiểm tra thử
                      </button>
                    </section>
                  ) : (
                    <section className="p-20 flex flex-col gap-3 justify-center items-center">
                      <h1 className="font-semibold text-3xl">
                        Tìm và làm các bài kiểm tra thử
                      </h1>
                      <button
                        className="bg-indigo-500 text-white font-semibold px-5 py-3 rounded-full cursor-pointer hover:bg-indigo-700"
                        onClick={handleSearchClick}
                      >
                        Tìm kiếm bài kiểm tra thử
                      </button>
                    </section>
                  )}
                </>
              )}
            </>
          )}
        </section>
      </div>
    </>
  );
}

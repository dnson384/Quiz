"use client";
import Header from "@/presentation/components/Layout/Header";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import useDashboard from "@/presentation/hooks/Dashboard/useDashboard";
import CourseCard from "@/presentation/components/Course/CourseCard";
import PracticeTestCard from "@/presentation/components/PracticeTest/PracticeTestCard";

export default function Dashboard() {
  const { courseSample, practiceTestSample, role } = useDashboard();

  return (
    <>
      {role !== "ADMIN" && (
        <>
          <Header />
          <div className="flex">
            <SideMenu />

            <section className="mt-[74px] mx-auto flex flex-col gap-8 px-5 sm:p-0">
              {courseSample.length > 0 && (
                <div>
                  <h3 className="font-bold mb-5">Học phần đề xuất</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
                    {courseSample.map((course) => (
                      <CourseCard
                        key={course.id}
                        courseId={course.id}
                        courseName={course.name}
                        termCount={course.termCount}
                        authorAvatarURL={course.authorAvatar}
                        authorName={course.authorName}
                        authorRole={course.authorRole}
                      />
                    ))}
                  </div>
                </div>
              )}

              {practiceTestSample.length > 0 && (
                <div className="mx-auto">
                  <h3 className="font-bold mb-5">Bài kiểm tra thử đề xuất</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
                    {practiceTestSample.map((test) => (
                      <PracticeTestCard
                        key={test.id}
                        practiceTestId={test.id}
                        practiceTestName={test.name}
                        authorAvatar={test.authorAvatar}
                        authorName={test.authorName}
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}

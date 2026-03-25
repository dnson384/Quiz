"use client";
import { Course } from "@/domain/entities/Course";
import CourseCard from "@/presentation/components/Course/CourseCard";

interface CourseData {
  courses: Course[];
  handleLoadMoreResults: () => void;
  notification: string | null;
}

export default function CourseResult({
  courses,
  handleLoadMoreResults,
  notification,
}: CourseData) {
  return (
    <>
      {/* Học phần */}
      {courses && (
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                courseId={course.id}
                courseName={course.name}
                authorAvatarURL={course.authorAvatar}
                authorName={course.authorName}
                authorRole={course.authorRole}
                termCount={course.termCount}
              />
            ))}
          </div>
          <div className="flex justify-center mt-6 mb-8">
            {notification ? (
              <p className="font-medium">{notification}</p>
            ) : (
              courses.length >= 12 && (
                <button
                  className="font-medium bg-indigo-50 w-fit py-3 px-6 rounded-xl cursor-pointer hover:bg-indigo-500 hover:text-white"
                  onClick={handleLoadMoreResults}
                >
                  Tải thêm
                </button>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}

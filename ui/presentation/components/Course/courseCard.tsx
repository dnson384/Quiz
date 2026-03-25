"use client";
import Image from "next/image";
import okAvatar from "../../../public/avatar_icon/ok.jpg";
import useCourseCard from "../../hooks/Course/useCourseCard";

interface CourseData {
  courseId: string;
  courseName: string;
  termCount: number;
  authorAvatarURL: string;
  authorName: string;
  authorRole: string;
}

export default function CourseCard({
  courseId,
  courseName,
  termCount,
  authorAvatarURL,
  authorName,
  authorRole,
}: CourseData) {
  const { handleCardClick } = useCourseCard();

  let role = authorRole;
  switch (authorName) {
    case "ADMIN":
      role = "Quản trị viên";
      break;
    case "STUDENT":
      role = "Học sinh / Sinh viên";
      break;
    case "TEACHER":
      role = "Giáo viên";
      break;
  }

  return (
    <main
      className="border border-gray-300 p-5 rounded-xl md:w-60 lg:w-xs cursor-pointer hover:shadow-md shadow-indigo-300"
      onClick={() => handleCardClick(courseId, courseName)}
    >
      {/* Thông tin học phân */}
      <div className="flex flex-col gap-3 mb-8">
        {/* Tên học phần */}
        <h2 className="font-bold hover:text-indigo-700">{courseName}</h2>

        {/* Tổng số thuật ngữ */}
        <div className="w-fit flex gap-2 items-center py-1 px-2 rounded-full bg-indigo-50">
          <p className="text-xs text-gray-700 font-bold">
            {termCount} thuật ngữ
          </p>
        </div>
      </div>

      {/* Tác giả */}
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Avatar */}
        <div className="flex items-center gap-2">
          <Image
            src={`/api/images${authorAvatarURL}` || okAvatar}
            alt="avatar"
            width={24}
            height={24}
            className="w-6 h-6 rounded-full"
          ></Image>
          {/* Username */}
          <p className="text-gray-700 font-bold">{authorName}</p>
        </div>

        {/* Role */}
        <div className="w-fit flex gap-2 items-center py-1 px-2 rounded-full bg-indigo-50">
          <p className="text-xs text-gray-700 font-bold">{role}</p>
        </div>
      </div>
    </main>
  );
}

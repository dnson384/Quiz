"use client";
import Image from "next/image";
import okAvatar from "../../../public/avatar_icon/ok.jpg";
import usePracticeTestCard from "@/presentation/hooks/PracticeTest/usePracticeTestCard";

interface PracticeTestData {
  practiceTestId: string;
  practiceTestName: string;
  authorAvatar: string;
  authorName: string;
}

export default function PracticeTestCard({
  practiceTestId,
  practiceTestName,
  authorAvatar,
  authorName,
}: PracticeTestData) {
  const { handleCardClick } = usePracticeTestCard();

  return (
    <main
      className="flex flex-col justify-between border border-gray-300 p-5 rounded-xl md:w-60 lg:w-xs cursor-pointer hover:shadow-md shadow-indigo-300"
      onClick={() => handleCardClick(practiceTestId, practiceTestName)}
    >
      <div className="flex flex-col gap-3 mb-8">
        {/* Tên bài test */}
        <h2 className="font-bold hover:text-indigo-700">{practiceTestName}</h2>
      </div>

      {/* Tác giả */}
      <div className="flex gap-2">
        {/* Avatar */}
        <Image
          src={authorAvatar ? `/api/images${authorAvatar}` : okAvatar}
          alt="avatar"
          width={24}
          height={24}
          className="w-6 h-6 rounded-full"
        ></Image>
        {/* Username */}
        <p className="text-gray-700 font-bold">{authorName}</p>
      </div>
    </main>
  );
}

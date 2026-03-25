"use client";
import Image from "next/image";
import { PracticeTest } from "@/domain/entities/PracticeTest";
import { Result } from "@/domain/entities/Result";
import { useRef } from "react";

interface Data {
  result: Result;
  baseInfo: PracticeTest;
  handleResultCardClick: (rid: string, id: string) => void;
}

export default function ResultCard({
  result,
  baseInfo,
  handleResultCardClick,
}: Data) {
  return (
    <div
      className="border border-gray-300 px-5 py-3 rounded-md flex justify-between items-center cursor-pointer hover:shadow-md hover:shadow-indigo-300"
      onClick={() => handleResultCardClick(result.id, baseInfo.id)}
    >
      <div>
        <h4 className="font-semibold mb-2 hover:text-indigo-700">
          {baseInfo.name}
        </h4>
        <div className="flex gap-2 items-center">
          <Image
            src={`/api/images${baseInfo.authorAvatar}`}
            alt={baseInfo.authorName}
            width={24}
            height={24}
            className="rounded-full w-6 h-6"
          ></Image>
          <p>{baseInfo.authorName}</p>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p>Điểm</p>
        <p className="text-lg font-bold text-indigo-700">
          {result.score} / {result.questionsCount}
        </p>
      </div>
    </div>
  );
}

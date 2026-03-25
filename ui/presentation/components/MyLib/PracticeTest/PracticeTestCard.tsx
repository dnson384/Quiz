"use client";
interface PracticeTestData {
  practiceTestId: string;
  practiceTestName: string;
  handleCardClick: (type: string, practiceTestId: string) => void;
}

export default function PracticeTestCard({
  practiceTestId,
  practiceTestName,
  handleCardClick,
}: PracticeTestData) {
  return (
    <main
      className="border border-gray-300 px-5 py-3 rounded-md w-full cursor-pointer hover:shadow-md shadow-indigo-300"
      onClick={() => handleCardClick("practice-test", practiceTestId)}
    >
      {/* Thông tin học phân */}
      <div className="flex flex-col gap-1">
        {/* Tên học phần */}
        <h2 className="font-bold hover:text-indigo-700">{practiceTestName}</h2>
      </div>
    </main>
  );
}

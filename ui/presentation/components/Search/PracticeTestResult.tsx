"use client";
import { PracticeTest } from "@/domain/entities/PracticeTest";
import PracticeTestCard from "@/presentation/components/PracticeTest/PracticeTestCard";

interface PracticeTestData {
  practiceTests: PracticeTest[];
  handleLoadMoreResults: () => void;
  notification: string | null;
}

export default function PracticeTestResult({
  practiceTests,
  handleLoadMoreResults,
  notification,
}: PracticeTestData) {
  return (
    <>
      {practiceTests && (
        <div>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6">
            {practiceTests.map((practiceTest) => {
              return (
                <PracticeTestCard
                  key={practiceTest.id}
                  practiceTestId={practiceTest.id}
                  practiceTestName={practiceTest.name}
                  authorAvatar={practiceTest.authorAvatar}
                  authorName={practiceTest.authorName}
                />
              );
            })}
          </div>
          <div className="flex justify-center mt-8">
            {notification ? (
              <p className="font-medium">{notification}</p>
            ) : (
              practiceTests.length > 12 && (
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

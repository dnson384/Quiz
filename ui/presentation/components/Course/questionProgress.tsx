interface CourseData {
  course_id: string;
  course_name: string;
  author_avatar_url: string;
  author_username: string;
  author_role: string;
  num_of_terms: number;
}

interface QuestionProgressBarData {
  currentQuestionIndex: number;
  num_of_terms: number;
}

export default function QuestionProgressBar({
  currentQuestionIndex,
  num_of_terms,
}: QuestionProgressBarData) {
  const totalSteps = Math.max(1, num_of_terms - 1);
  let percentage = Math.min(
    100,
    Math.max(0, (currentQuestionIndex / totalSteps) * 100)
  );

  if (num_of_terms === 1) {
    percentage = 100;
  }

  return (
    <section className="w-full py-8 px-4">
      {/* Container giới hạn độ rộng tối đa, căn giữa */}
      <div className="w-full max-w-5xl mx-auto">
        <div className="relative flex items-center w-full h-12">
          <div className="absolute top-1/2 left-0 w-full h-3 -translate-y-1/2 rounded-full bg-slate-200"></div>

          <div
            className="absolute top-1/2 left-0 h-3 -translate-y-1/2 rounded-l-full bg-teal-700 transition-all duration-300 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>

          <div
            className={`absolute top-1/2 z-5 transition-all duration-300 ease-out`}
            style={{
              left: `${percentage}%`,
              transform: `translate(-${percentage}%, -50%)`,
            }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-700 text-white font-bold shadow-md">
              {currentQuestionIndex + 1}
            </div>
          </div>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-slate-600 font-bold shadow-sm ">
              {num_of_terms}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

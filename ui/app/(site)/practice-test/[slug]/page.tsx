"use client";
import Image from "next/image";
import okAvatar from "../../../../public/avatar_icon/ok.jpg";

import Header from "@/presentation/components/Layout/Header";
import SideMenu from "@/presentation/components/Layout/SideMenu";

import usePracticeTestDetail from "@/presentation/hooks/PracticeTest/usePracticeTestDetail";

export default function PracticeTestDetail() {
  const {
    error,
    baseInfo,
    questions,
    handleFormSubmit,
    handleFormInputChange,
  } = usePracticeTestDetail();

  return (
    <>
      <Header />
      <div className="flex">
        <SideMenu />
        {error && (
          <div className="fixed inset-0 h-fit flex justify-center top-20">
            <div className="fixed z-10 h-fit inset-0 flex justify-center top-15">
              <div className="flex items-center gap-2 bg-red-100 w-fit h-fit p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#f67c6f"
                    fillRule="evenodd"
                    d="M256 42.667c117.803 0 213.334 95.53 213.334 213.333S373.803 469.334 256 469.334S42.667 373.803 42.667 256S138.197 42.667 256 42.667m48.918 134.25L256 225.836l-48.917-48.917l-30.165 30.165L225.835 256l-48.917 48.918l30.165 30.165L256 286.166l48.918 48.917l30.165-30.165L286.166 256l48.917-48.917z"
                  />
                </svg>
                <p className=" text-red-400 select-none">{error}</p>
              </div>
            </div>
          </div>
        )}
        {baseInfo && questions && (
          <main className="mx-auto mb-5 mt-[74px]">
            <section className="w-3xl flex flex-col gap-5">
              <div>
                <h2 className="text-3xl font-bold mb-3">{baseInfo?.name}</h2>
                <div className="flex items-center gap-2">
                  <Image
                    src={`/api/images${baseInfo?.authorAvatar}` || okAvatar}
                    alt={baseInfo?.authorName || "user avatar"}
                    width={36}
                    height={36}
                    className="w-6 h-6 rounded-full"
                  ></Image>
                  <p className="text-gray-700 font-semibold">
                    {baseInfo?.authorName}
                  </p>
                </div>
              </div>

              {/* Question Demo */}
              <div>
                <p className="font-semibold mb-3">Câu hỏi ví dụ</p>
                <div>
                  {questions.slice(0, 10).map((question, index) => (
                    <div key={question.question.id} className="flex">
                      <p className="w-10">{index + 1}.</p>
                      <div>
                        <p>{question.question.text}</p>
                        <div>
                          {question.options.map((option) => (
                            <div
                              key={option.id}
                              className="flex items-center gap-3"
                            >
                              <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                              <p>{option.text}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="fixed top-40 right-60 px-5 py-7 w-fit h-fit rounded-xl bg-white flex flex-col gap-3">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-semibold text-sm text-gray-700"
                      htmlFor="num_of_ques"
                    >
                      Câu hỏi (tối đa {questions.length})
                    </label>
                    <input
                      id="num_of_ques"
                      name="num_of_ques"
                      type="number"
                      className="text-sm w-55 border border-gray-400 rounded-md px-2 py-1 focus:outline-indigo-400"
                      defaultValue={
                        questions.length > 20 ? "20" : questions.length
                      }
                      onChange={(e) => handleFormInputChange(e)}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label
                      className="font-semibold text-sm text-gray-700"
                      htmlFor="timer"
                    >
                      Hẹn giờ (phút)
                    </label>
                    <input
                      id="timer"
                      name="timer"
                      type="number"
                      className="text-sm w-55 border border-gray-400 rounded-md px-2 py-1 focus:outline-indigo-400"
                      defaultValue="30"
                      onChange={(e) => handleFormInputChange(e)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-full mt-3 bg-indigo-500 text-white font-semibold cursor-pointer hover:bg-indigo-700"
                  >
                    Bắt đầu làm bài
                  </button>
                </form>
              </aside>
            </section>
          </main>
        )}
      </div>
    </>
  );
}

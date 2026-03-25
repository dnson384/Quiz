"use client";
import Header from "@/presentation/components/Layout/Header";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import useCreateCoures from "@/presentation/hooks/CreateCourse/useCreateCourse";
export default function CreateCourse() {
  const {
    termCount,
    isSubmitted,
    error,
    termData,
    baseInfo,
    handleAddCartClick,
    handleDeleteCard,
    handleTermChange,
    handleBaseInfoChange,
    handleCreateClick,
  } = useCreateCoures();
  const terms = Array.from({ length: termCount }, (_, i) => i);
  const titleMissing = baseInfo?.name.length === 0;
  const anyMissing =
    termData.length === 0
      ? true
      : termData.some((curTerm) => {
          const termValue = curTerm.term;
          const definitionValue = curTerm.definition;
          if (!termValue || !definitionValue) return true;

          if (definitionValue.length > 0 && termValue.length === 0) return true;

          if (definitionValue.length === 0 && termValue.length > 0) return true;
        });
  const isFormValid = !titleMissing && !anyMissing;

  return (
    <>
      <Header />

      <main className="flex">
        <SideMenu />
        {error && (
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
        )}
        <section className="mt-[74px] w-md sm:w-xl md:w-2xl lg:w-4xl mx-auto">
          <div className="sticky top-0 py-4 bg-[#F8F8FF]">
            <div className="w-full class flex justify-between items-center">
              <h1 className="font-bold text-2xl">Tạo một học phần mới </h1>
              <button
                className={`bg-indigo-500 text-white font-semibold w-20 py-2 rounded-full ${
                  termData
                    ? "cursor-pointer hover:bg-indigo-700"
                    : "pointer-events-none"
                }`}
                onClick={() => handleCreateClick(isFormValid)}
              >
                Tạo
              </button>
            </div>
          </div>

          {/* Thông tin chung */}
          <form className="">
            <div className="mb-5">
              <h3>Tiêu đề</h3>
              <input
                type="text"
                placeholder="Nhập tiêu đề"
                className={`w-full bg-indigo-50 px-4 py-2 border ${
                  baseInfo?.name.length === 0 && isSubmitted
                    ? "border-red-500 bg-red-50 focus:outline-red-500"
                    : "border-gray-200"
                } focus:outline-1 focus:outline-indigo-500 rounded-md`}
                value={baseInfo?.name || ""}
                onChange={(e) => handleBaseInfoChange(e)}
              />
              {baseInfo?.name.length === 0 && isSubmitted && (
                <p className="text-red-500 text-xs">Vui lòng nhập tiêu đề</p>
              )}
            </div>
          </form>

          {/* Thuật ngữ -Định nghĩa */}
          <form>
            <div className="flex flex-col gap-3">
              {terms.map((index) => {
                const termValue = termData[index]?.term || "";
                const definitionValue = termData[index]?.definition || "";

                const isMissingTerm =
                  (definitionValue.length > 0 && termValue.length === 0) ||
                  termData.length === 0;

                const isMissingDefinition =
                  (definitionValue.length === 0 && termValue.length > 0) ||
                  termData.length === 0;
                return (
                  <div
                    key={index}
                    className="px-6 py-4 bg-white rounded-2xl shadow-sm"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-semibold text-gray-500">{index + 1}</p>
                      <div
                        className={`p-1.5 bg-gray-50 rounded-full ${
                          termCount > 2
                            ? "hover:bg-gray-300 cursor-pointer"
                            : ""
                        }`}
                        onClick={() => handleDeleteCard(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                            <path
                              fill={termCount > 2 ? "#374151" : "#9CA3AF"}
                              d="M14.28 2a2 2 0 0 1 1.897 1.368L16.72 5H20a1 1 0 1 1 0 2h-1v12a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4a1 1 0 0 1 0-2h3.28l.543-1.632A2 2 0 0 1 9.721 2zM17 7H7v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1zm-2.72-3H9.72l-.333 1h5.226z"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                      <div>
                        <input
                          type="text"
                          name="term"
                          className={`w-full bg-indigo-50 px-4 py-2 border ${
                            isMissingTerm && isSubmitted
                              ? "border-red-500 bg-red-50 focus:outline-red-500"
                              : "border-gray-200"
                          } focus:outline-1 focus:outline-indigo-500 rounded-md`}
                          value={termValue}
                          onChange={(e) => handleTermChange(e, index)}
                        />
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-500">
                            Thuật ngữ
                          </p>
                          {isMissingTerm && isSubmitted && (
                            <span className="text-red-500 text-xs">
                              Vui lòng nhập thuật ngữ này
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          name="definition"
                          className={`w-full bg-indigo-50 px-4 py-2 border ${
                            isMissingDefinition && isSubmitted
                              ? "border-red-500 bg-red-50 focus:outline-red-500"
                              : "border-gray-200"
                          } focus:outline-1 focus:outline-indigo-500 rounded-md`}
                          value={definitionValue}
                          onChange={(e) => handleTermChange(e, index)}
                        />
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-gray-500">
                            Định nghĩa
                          </p>
                          {isMissingDefinition && isSubmitted && (
                            <span className="text-red-500 text-xs">
                              Vui lòng nhập định nghĩa này
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                className="my-5 w-fit mx-auto px-5 py-3 bg-gray-200 font-semibold rounded-full cursor-pointer hover:bg-gray-300"
                onClick={(e) => handleAddCartClick(e)}
              >
                Thêm thẻ
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

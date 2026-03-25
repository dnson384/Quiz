"use client";
import { useAuthContext } from "@/presentation/context/auth.context";
import { useMenuContext } from "@/presentation/context/menu.context";

import useSideMenu from "@/presentation/hooks/Layout/useSideMenu";
import { useShowFullMenu } from "@/presentation/store/dashboard.store";

export default function SideMenu() {
  const { showMenu } = useMenuContext();
  const { isMobile, selectedPage, handleMenuItem } = useSideMenu();
  const showFullMenu = useShowFullMenu((state) => state.showFullMenu);

  const { user } = useAuthContext();
  const role = user?.role;

  return (
    <main className={`relative ${showMenu ? "" : "hidden"}`}>
      {user && (
        <section
          className={`fixed top-[74px] z-10 ${showMenu && isMobile ? "inset-0 backdrop-blur bg-white/50 lg:backdrop-blur-0 lg:bg-transparent" : ""}`}
        >
          {role !== "ADMIN" ? (
            <div
              className={`relative mt-3 transition-all duration-1000 ease-in-out ${
                showFullMenu ? "w-50" : "w-fit"
              } overflow-hidden`}
            >
              <div className="sticky px-3">
                {/* Dashboard - Lib */}
                <div className="flex flex-col gap-2 mb-3">
                  {/* Dashboard */}
                  <div
                    id="dashboard"
                    className={`px-3 py-2 rounded-md flex items-center ${
                      showFullMenu ? "gap-2" : "justify-center"
                    } ${
                      selectedPage === "dashboard"
                        ? "bg-indigo-100"
                        : "bg-transparent hover:bg-gray-100"
                    } select-none cursor-pointer`}
                    onClick={handleMenuItem}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill={`${
                          selectedPage === "dashboard" ? "#6366F1" : "#374151"
                        }`}
                        d="M6 19h3v-5q0-.425.288-.712T10 13h4q.425 0 .713.288T15 14v5h3v-9l-6-4.5L6 10zm-2 0v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21h-4q-.425 0-.712-.288T13 20v-5h-2v5q0 .425-.288.713T10 21H6q-.825 0-1.412-.587T4 19m8-6.75"
                      />
                    </svg>
                    <h3
                      className={`${
                        selectedPage === "dashboard"
                          ? "text-indigo-500"
                          : "text-gray-700"
                      } text-sm font-bold transition-opacity duration-1000 whitespace-nowrap ${
                        showFullMenu
                          ? "opacity-100"
                          : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      Trang chủ
                    </h3>
                  </div>

                  {/* Lib */}
                  <div
                    id="my-lib"
                    className={`px-3 py-2 rounded-md flex items-center ${
                      showFullMenu ? "gap-2" : "justify-center"
                    } ${
                      selectedPage === "my-lib"
                        ? "bg-indigo-100"
                        : "bg-transparent hover:bg-gray-100"
                    } select-none cursor-pointer`}
                    onClick={handleMenuItem}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        stroke={`${
                          selectedPage === "my-lib" ? "#6366F1" : "#374151"
                        }`}
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          d="M2 19V7.549c0-1.444 0-2.166.243-2.733a3 3 0 0 1 1.573-1.573C4.383 3 5.098 3 6.55 3h.494a2 2 0 0 1 1.557.745L10.418 6m0 0H16c1.4 0 2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C20 7.9 20 8.6 20 10v1m-9.582-5H7"
                        />
                        <path d="m3.158 15.514l.298-.742c.734-1.827 1.101-2.74 1.866-3.256S7.076 11 9.052 11h8.06c2.688 0 4.033 0 4.63.879c.598.879.098 2.121-.9 4.607l-.298.742c-.734 1.827-1.101 2.74-1.866 3.256s-1.754.516-3.73.516h-8.06c-2.688 0-4.033 0-4.63-.879c-.598-.878-.098-2.121.9-4.607Z" />
                      </g>
                    </svg>
                    <h3
                      className={`${
                        selectedPage === "my-lib"
                          ? "text-indigo-500"
                          : "text-gray-700"
                      } text-sm font-bold transition-opacity duration-1000 whitespace-nowrap ${
                        showFullMenu
                          ? "opacity-100"
                          : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      Thư viện của bạn
                    </h3>
                  </div>

                  {/* Lib */}
                  <div
                    id="history"
                    className={`px-3 py-2 rounded-md flex items-center ${
                      showFullMenu ? "gap-2" : "justify-center"
                    } ${
                      selectedPage === "history"
                        ? "bg-indigo-100"
                        : "bg-transparent hover:bg-gray-100"
                    } select-none cursor-pointer`}
                    onClick={handleMenuItem}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill={`${
                          selectedPage === "history" ? "#6366F1" : "#374151"
                        }`}
                        d="M12 21q-3.15 0-5.575-1.912T3.275 14.2q-.1-.375.15-.687t.675-.363q.4-.05.725.15t.45.6q.6 2.25 2.475 3.675T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H8q.425 0 .713.288T9 9t-.288.713T8 10H4q-.425 0-.712-.288T3 9V5q0-.425.288-.712T4 4t.713.288T5 5v1.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m1-9.4l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7t.713.288T13 8z"
                      />
                    </svg>
                    <h3
                      className={`${
                        selectedPage === "history"
                          ? "text-indigo-500"
                          : "text-gray-700"
                      } text-sm font-bold transition-opacity duration-1000 whitespace-nowrap ${
                        showFullMenu
                          ? "opacity-100"
                          : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      Lịch sử kiểm tra
                    </h3>
                  </div>
                </div>
                <hr className="border-gray-300" />

                {/* Bắt đầu */}
                <div
                  className={`mt-3 flex flex-col ${showFullMenu && "gap-3"} mb-3`}
                >
                  <h2
                    className={`font-bold px-3 transition-opacity duration-1000 ease-in-out ${
                      showFullMenu
                        ? "opacity-100"
                        : "opacity-0 w-0 h-0 overflow-hidden"
                    }`}
                  >
                    Bắt đầu từ đây
                  </h2>
                  <div
                    id="create-course"
                    className={`px-3 py-2 rounded-md flex items-center ${
                      showFullMenu ? "gap-2" : "justify-center"
                    } ${
                      selectedPage === "create_flashcard"
                        ? "bg-indigo-100"
                        : "bg-transparent hover:bg-gray-100"
                    } select-none cursor-pointer`}
                    onClick={handleMenuItem}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill={`${
                          selectedPage === "create_flashcard"
                            ? "#6366F1"
                            : "#374151"
                        }`}
                        fillRule="evenodd"
                        d="M3 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3.25a.75.75 0 0 0 0-1.5H3a.5.5 0 0 1-.5-.5V3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v5.25a.75.75 0 0 0 1.5 0V4.364l2.19 1.14a.25.25 0 0 1 .107.338l-1.072 2.062a.75.75 0 0 0 1.33.692l1.073-2.062a1.75 1.75 0 0 0-.745-2.36l-2.912-1.516A2 2 0 0 0 9 1zm6 12a.75.75 0 0 1 .75-.75h1.5v-1.5a.75.75 0 0 1 1.5 0v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5A.75.75 0 0 1 9 13"
                        clipRule="evenodd"
                      />
                    </svg>

                    <h3
                      className={`${
                        selectedPage === "create_flashcard"
                          ? "text-indigo-500"
                          : "text-gray-700"
                      } text-sm font-bold transition-opacity duration-1000 whitespace-nowrap ${
                        showFullMenu
                          ? "opacity-100"
                          : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      Tạo thẻ ghi nhớ
                    </h3>
                  </div>
                  {role === "TEACHER" && (
                    <div
                      id="create-practice-test"
                      className={`px-3 py-2 rounded-md flex items-center ${
                        showFullMenu ? "gap-2" : "justify-center"
                      } ${
                        selectedPage === "create_practice_test"
                          ? "bg-indigo-100"
                          : "bg-transparent hover:bg-gray-100"
                      } select-none cursor-pointer`}
                      onClick={handleMenuItem}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke={`${
                            selectedPage === "create_practice_test"
                              ? "#6366F1"
                              : "#374151"
                          }`}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m18.942 15.05l.626 2.44a2 2 0 0 1-1.44 2.434L7.433 22.67a2 2 0 0 1-2.435-1.44L1.22 6.51a2 2 0 0 1 1.44-2.434L13.354 1.33a2 2 0 0 1 2.215.912m3.371 9.11V3.543m-3.905 3.904h7.81"
                        />
                      </svg>

                      <h3
                        className={`${
                          selectedPage === "create_practice_test"
                            ? "text-indigo-500"
                            : "text-gray-700"
                        } text-sm font-bold transition-opacity duration-1000 whitespace-nowrap ${
                          showFullMenu
                            ? "opacity-100"
                            : "opacity-0 w-0 overflow-hidden"
                        }`}
                      >
                        Tạo bài kiểm tra
                      </h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`relative mt-3 transition-all duration-1000 ease-in-out ${
                showFullMenu ? "w-50" : "w-fit"
              } overflow-hidden`}
            >
              <div className="sticky px-3">
                <div className="flex flex-col gap-2 mb-3">
                  <div
                    id="admin"
                    className={`px-3 py-2 rounded-md flex items-center ${
                      showFullMenu ? "gap-2" : "justify-center"
                    } ${
                      selectedPage === "admin"
                        ? "bg-indigo-100"
                        : "bg-transparent hover:bg-gray-100"
                    } select-none cursor-pointer`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill={selectedPage === "admin" ? "#6366F1" : "#374151"}
                        d="M2 18v-.8q0-.85.425-1.562T3.6 14.55q1.425-.725 2.963-1.15t3.137-.425q.35 0 .55.313t.075.662q-.15.525-.225 1.05t-.075 1.075q0 .725.15 1.4T10.6 18.8q.2.425-.037.813T9.9 20H4q-.825 0-1.412-.587T2 18m15 0q.825 0 1.413-.587T19 16t-.587-1.412T17 14t-1.412.588T15 16t.588 1.413T17 18m-7-6q-1.65 0-2.825-1.175T6 8t1.175-2.825T10 4t2.825 1.175T14 8t-1.175 2.825T10 12m5.85 8.2l-.15-.7q-.3-.125-.562-.262T14.6 18.9l-.725.225q-.325.1-.637-.025t-.488-.4l-.2-.35q-.175-.3-.125-.65t.325-.575l.55-.475q-.05-.35-.05-.65t.05-.65l-.55-.475q-.275-.225-.325-.563t.125-.637l.225-.375q.175-.275.475-.4t.625-.025l.725.225q.275-.2.538-.338t.562-.262l.15-.725q.075-.35.338-.562T16.8 11h.4q.35 0 .613.225t.337.575l.15.7q.3.125.562.275t.538.375l.675-.225q.35-.125.675 0t.5.425l.2.35q.175.3.125.65t-.325.575l-.55.475q.05.3.05.625t-.05.625l.55.475q.275.225.325.563t-.125.637l-.225.375q-.175.275-.475.4t-.625.025L19.4 18.9q-.275.2-.538.337t-.562.263l-.15.725q-.075.35-.337.563T17.2 21h-.4q-.35 0-.612-.225t-.338-.575"
                      />
                    </svg>
                    <h3
                      className={`${
                        selectedPage === "admin"
                          ? "text-indigo-500"
                          : "text-gray-700"
                      } text-sm font-bold transition-opacity duration-1000 whitespace-nowrap ${
                        showFullMenu
                          ? "opacity-100"
                          : "opacity-0 w-0 overflow-hidden"
                      }`}
                    >
                      Quản lý tài khoản
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </main>
  );
}

"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import learn_default_page from "../../public/default_page/learn_default_page.png";
import flashcard_default_page from "../../public/default_page/flashcard_default_page.png";
import test_default_page from "../../public/default_page/test_default_page.png";
import card_matching_default_page from "../../public/default_page/card_matching_default_page.png";
import teacher_default_page from "../../public/default_page/teacher_default_page.png";

import { useAuthStore, useRoleStore } from "@/presentation/store/auth.store";

export default function Home() {
  const router = useRouter();
  const setAuthMethod = useAuthStore((state) => state.setAuthMethod);
  const setRole = useRoleStore((state) => state.setRole);

  const authNavigator = (method: string) => {
    setAuthMethod(method);
    setRole(null);
    router.push("/auth");
  };

  const authTeacherNavigator = () => {
    setAuthMethod("register");
    setRole("teacher");
    router.push("/auth");
  };

  return (
    <main className="bg-gray-100">
      {/* Nav bar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white">
        {/* Menu */}
        <div id="menu" className="flex items-center gap-10">
          <h1 className="text-3xl font-bold text-indigo-500 cursor-pointer select-none">
            Quizz
          </h1>
        </div>

        {/* Đăng ký, đăng nhập */}
        <div className="flex gap-3">
          <button
            className="w-[120px] py-1.5 px-3 border-2 border-indigo-500 rounded-full cursor-pointer text-indigo-500 font-bold"
            onClick={() => authNavigator("register")}
          >
            Đăng ký
          </button>
          <button
            className="w-[120px] py-1.5 px-3 border-2 bg-indigo-500 border-indigo-500 rounded-full cursor-pointer text-white font-bold hover:bg-indigo-700"
            onClick={() => authNavigator("login")}
          >
            Đăng nhập
          </button>
        </div>
      </nav>

      {/* Slogan */}
      <div className="pt-20 flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col items-center gap-3">
          <h1 className="w-2xl text-4xl font-bold text-center">
            Bạn muốn học như thế nào?
          </h1>
          <p className="text-center text-xl w-2xl">
            Nắm vững kiến thức đang học với thẻ ghi nhớ tương tác, bài kiểm tra
            thử và hoạt động học tập của Quizlet.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          <button
            className="bg-indigo-500 text-white font-bold py-3 px-5 rounded-full cursor-pointer hover:bg-indigo-700"
            onClick={() => authNavigator("register")}
          >
            Đăng ký miễn phí
          </button>
          <button
            className="text-indigo-500 font-bold border-indigo-500 cursor-pointer hover:text-indigo-700"
            onClick={() => authTeacherNavigator()}
          >
            Tôi là giáo viên
          </button>
        </div>
      </div>

      {/* Main features */}
      <div
        id="main_features_container"
        className="mt-15 grid grid-cols-4 gap-8 mx-auto w-7xl"
      >
        <div
          className="pt-5 rounded-3xl bg-sky-300 transform transition duration-700 hover:scale-110 cursor-pointer"
          onClick={() => authNavigator("login")}
        >
          <h1 className="text-2xl font-bold text-center text-black">Học</h1>
          <Image
            src={learn_default_page}
            alt="learn"
            className="rounded-e-3xl"
          ></Image>
        </div>
        <div
          className="pt-5 rounded-3xl bg-indigo-600 transform transition duration-700 hover:scale-110 cursor-pointer"
          onClick={() => authNavigator("login")}
        >
          <h1 className="text-2xl font-bold text-center text-white">
            Thẻ ghi nhớ
          </h1>
          <Image
            src={flashcard_default_page}
            alt="learn"
            className="rounded-e-3xl overflow-hidden"
          ></Image>
        </div>
        <div
          className="pt-5 rounded-3xl bg-amber-300 transform transition duration-700 hover:scale-110 cursor-pointer"
          onClick={() => authNavigator("login")}
        >
          <h1 className="text-2xl font-bold text-center text-black">
            Kiểm tra
          </h1>
          <Image
            src={test_default_page}
            alt="learn"
            className="rounded-e-3xl"
          ></Image>
        </div>
        <div
          className="pt-5 rounded-3xl bg-rose-300 transform transition duration-700 hover:scale-110 cursor-pointer"
          onClick={() => authNavigator("login")}
        >
          <h1 className="text-2xl font-bold text-center text-black">
            Ghép thẻ
          </h1>
          <Image
            src={card_matching_default_page}
            alt="learn"
            className="rounded-e-3xl"
          ></Image>
        </div>
      </div>

      {/* Teacher Intro */}
      <div className="mt-15 bg-indigo-100 py-10">
        <div className="grid grid-cols-2 w-7xl mx-auto">
          <div className="flex flex-col gap-10 justify-center">
            <div>
              <h2 className="text-2xl font-semibold">GIÁO VIÊN</h2>
              <h2 className="text-3xl font-bold">
                Truyền năng lượng cho học sinh của bạn
              </h2>
            </div>
            <p className="text-xl">
              Giúp mọi học viên tự tin học bất cứ điều gì. Với các học phần miễn
              phí, chế độ học và trò chơi trong lớp như Quizlet Live, bạn có thể
              ngay lập tức tạo ra một lớp học gắn kết hơn.
            </p>
            <div className="flex flex-col gap-5 w-fit items-start">
              <button
                className="bg-indigo-500 text-white font-bold py-4 px-6 rounded-full cursor-pointer hover:bg-indigo-700"
                onClick={() => authTeacherNavigator()}
              >
                Đăng ký với tư cách giáo viên
              </button>
              <h3 className="text-indigo-500 text-xl font-bold cursor-pointer hover:text-indigo-700">
                Xem cách giáo viên sử dụng Quiz
              </h3>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <Image
              src={teacher_default_page}
              alt="teacher default page"
              className="w-lg"
            ></Image>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-10 pb-10 bg-white">
        <div className="w-7xl grid grid-cols-4 mx-auto">
          {/* About */}
          <div>
            <h3 className="font-bold mb-3">Giới thiệu</h3>
            <div className="flex flex-col gap-2">
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Giới thiệu về Quiz
              </p>
            </div>
          </div>

          {/* For student */}
          <div>
            <h3 className="font-bold mb-3">Dành cho học sinh</h3>
            <div className="flex flex-col gap-2">
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Thẻ ghi nhớ
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Học
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Kiểm tra
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Học nhóm
              </p>
            </div>
          </div>

          {/* For teacher */}
          <div>
            <h3 className="font-bold mb-3">Dành cho giáo viên</h3>
            <div className="flex flex-col gap-2">
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Live
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Blog
              </p>
            </div>
          </div>

          {/* Resource */}
          <div>
            <h3 className="font-bold mb-3">Tài nguyên</h3>
            <div className="flex flex-col gap-2">
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Trung tâm hỗ trợ
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Đăng ký
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Quy định danh dự
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Điều khoản
              </p>
              <p className="font-medium cursor-pointer hover:text-indigo-700">
                Quyền riêng tư
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

"use client";
import Image from "next/image";
import Header from "@/presentation/components/Layout/Header";
import HeaderAdmin from "@/presentation/components/Layout/Admin/HeaderAdmin";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import usePersonal from "@/presentation/hooks/Personal/usePersonal";

export default function Personal() {
  const { user, newAvatar, handleEditClick } = usePersonal();

  return (
    <>
      {user && (
        <>
          {user.role === "ADMIN" ? <HeaderAdmin /> : <Header />}
          <div className="flex">
            <SideMenu />
            <section className="mt-[74px] w-6xl mx-auto flex flex-col gap-2">
              <div className="mb-5 flex items-center justify-between">
                <h3 className="text-2xl font-bold">Thông tin cá nhân</h3>
                <button
                  className="bg-indigo-500 text-white font-bold py-2 px-5 rounded-full cursor-pointer hover:bg-indigo-700"
                  onClick={handleEditClick}
                >
                  Sửa
                </button>
              </div>

              {/* Ảnh đại diện */}
              <div className="px-6 py-4 border border-gray-300 rounded-xl">
                <div className="flex gap-10 items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Ảnh hồ sơ</h4>
                    <Image
                      src={`/api/images${user.avatarUrl}`}
                      alt={`avatar-${user.name}`}
                      width={100}
                      height={100}
                      className="w-[100px] h-[100px] rounded-full object-cover"
                    ></Image>
                  </div>
                </div>
              </div>

              {/* Tên người dùng */}
              <div className="flex justify-between items-center px-6 py-4 border border-gray-300 rounded-xl">
                <div>
                  <h4 className="text-lg font-semibold">Tên người dùng</h4>
                  <p>{user.name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex justify-between items-center px-6 py-4 border border-gray-300 rounded-xl">
                <div>
                  <h4 className="text-lg font-semibold">Email</h4>
                  <p>{user.email}</p>
                </div>
              </div>

              {/* Vai trò */}
              <div className="flex justify-between items-center px-6 py-4 border border-gray-300 rounded-xl">
                <div>
                  <h4 className="text-lg font-semibold">Loại tài khoản</h4>
                  <p>{user.role}</p>
                </div>
              </div>

              {/* Đổi mật khẩu */}
              {user.loginMethod === "EMAIL" ? (
                <button className="flex justify-between items-center px-6 py-4 border border-gray-300 rounded-xl cursor-pointer">
                  <h4 className="text-lg font-semibold">Đổi mật khẩu</h4>
                </button>
              ) : (
                <></>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}

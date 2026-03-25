"use client";
import HeaderAdmin from "@/presentation/components/Layout/Admin/HeaderAdmin";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import useDashboardAdmin from "@/presentation/hooks/Dashboard/useDashboardAdmin";

export default function DashboardAdmin() {
  const { user, users, grantAdminRole, lockOrUnlockUser } = useDashboardAdmin();
  return (
    <>
      {user?.role === "ADMIN" && (
        <>
          <HeaderAdmin />
          <div className="flex">
            <SideMenu />

            <section className="mx-auto mt-3 flex flex-col gap-8">
              {users && (
                <>
                  <h3 className="text-2xl font-bold">Tài khoản người dùng</h3>
                  <div className="w-6xl mx-auto flex flex-col gap-2">
                    {users.map((user) => {
                      const isActived = user.isActived;

                      return (
                        <div key={user.id} className="w-full">
                          <div className="px-6 py-4 border border-gray-300 rounded-xl">
                            {/* Email */}
                            <div className="flex items-center justify-between">
                              <h4 className="text-lg font-semibold">
                                {user.email}
                              </h4>
                              <div className="flex gap-2">
                                {/* Lock & unlock */}
                                {isActived !== undefined && (
                                  <button
                                    className="font-semibold bg-indigo-100 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white"
                                    onClick={() =>
                                      lockOrUnlockUser(user.id, isActived)
                                    }
                                  >
                                    {isActived
                                      ? "Khoá tài khoản"
                                      : "Mở khoá tài khoản"}
                                  </button>
                                )}

                                {/* admin */}
                                <button
                                  className="font-semibold bg-indigo-100 px-4 py-2 rounded-md cursor-pointer hover:bg-indigo-500 hover:text-white"
                                  onClick={() => grantAdminRole(user.id)}
                                >
                                  Cấp quyền Admin
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </section>
          </div>
        </>
      )}
    </>
  );
}

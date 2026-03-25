"use client";
import Header from "@/presentation/components/Layout/Header";
import SideMenu from "@/presentation/components/Layout/SideMenu";
import ResultCard from "@/presentation/components/History/ResultCard";
import useAllHistories from "@/presentation/hooks/History/useAllHistories";

export default function AllHistories() {
  const { user, histories, handleResultCardClick } = useAllHistories();
  return (
    <>
      {user && (
        <>
          <Header />
          <main className="flex">
            <SideMenu />

            {histories ? (
              <section className="mt-[74px] w-6xl mx-auto mb-8">
                <h2 className="text-3xl font-bold mb-8">
                  Lịch sử làm bài kiểm tra
                </h2>
                <div className="flex flex-col gap-3">
                  {histories.map((history) => (
                    <ResultCard
                      key={history.result.id}
                      result={history.result}
                      baseInfo={history.baseInfo}
                      handleResultCardClick={handleResultCardClick}
                    />
                  ))}
                </div>
              </section>
            ) : (
              <></>
            )}
          </main>
        </>
      )}
    </>
  );
}

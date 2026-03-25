import { useRouter } from "next/navigation";

export default function usePracticeTestCard() {
  const router = useRouter();

  const handleCardClick = (practiceTestId: string, practiceTestName: string) => {
    const courseNameArr = practiceTestName.replace(/[^a-zA-z0-1\s]/g, "").split(" ");

    // Tạo slug URL
    let slugArr: Array<any> = [];
    courseNameArr.forEach((word: string) => {
      if (word) {
        slugArr.push(word);
      }
    });
    const slug = slugArr.join("-");

    // Điều hướng sang xem chi tiết học phần
    const newPathname = `practice-test/${slug}?uuid=${practiceTestId}`;
    router.push(newPathname);
  };

  return { handleCardClick };
}

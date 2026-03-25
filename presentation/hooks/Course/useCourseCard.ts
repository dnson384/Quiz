import { useRouter } from "next/navigation";
import { generateSlug } from "@/presentation/utils/textFormatter.util";

export default function useCourseCard() {
  const router = useRouter();

  const handleCardClick = (courseId: string, courseName: string) => {
    const slug = generateSlug(courseName);
    router.push(`course/${slug}?uuid=${courseId}`);
  };

  return { handleCardClick };
}

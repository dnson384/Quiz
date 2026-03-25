import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourseDetail } from "@/presentation/services/course.service";
import { CourseDetail } from "@/domain/entities/Course";
import { isAxiosError } from "axios";

export default function useCourseDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [courseDetail, setCourseDetail] = useState<CourseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const courseId = searchParams.get("uuid");
  useEffect(() => {
    (async () => {
      if (!courseId) {
        return;
      }

      try {
        const response = await getCourseDetail(courseId);
        setCourseDetail(response);
      } catch (err) {
        if (isAxiosError(err)) {
          setError(err.response?.data.detail);
        }
      }
    })();
  }, [courseId]);

  const handleLearnOptionClick = (learnOption: string, course_id: string) => {
    const newURL = `/course/${learnOption}?uuid=${course_id}`;
    router.push(newURL);
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => {
        clearTimeout(timer);
        router.replace("/dashboard");
      };
    }
  }, [error]);

  return {
    error,
    courseDetail,
    handleLearnOptionClick,
  };
}

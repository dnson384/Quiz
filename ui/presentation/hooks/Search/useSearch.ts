import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

import { search } from "@/presentation/services/search.service";
import { Course } from "@/domain/entities/Course";
import { PracticeTest } from "@/domain/entities/PracticeTest";

export default function useSearch() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const keyword = searchParams.get("keyword");
  const type = searchParams.get("type");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [courses, setCourses] = useState<Course[]>([]);
  const [practiceTests, setPracticeTests] = useState<PracticeTest[]>([]);
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    setNotification(null);
    setPracticeTests([]);
    setCourses([]);

    if (!keyword || !type) return;

    let isMounted = true;

    const fetchSearchResult = async () => {
      try {
        let cursor_id = null;
        const result = await search(keyword, type, cursor_id);
        if (result) setIsLoading(false);

        if (isMounted) {
          setCourses(result.courses);
          setPracticeTests(result.practiceTests);
        }
      } catch (err) {
        console.error("Lỗi khi tìm kiếm:", err);
      }
    };
    fetchSearchResult();

    return () => {
      isMounted = false;
    };
  }, [keyword, type]);

  const HandlerShowResult = (
    event: React.MouseEvent<HTMLHeadingElement>,
    type: string | null,
  ) => {
    const target = event.target as HTMLElement;
    const newType = target.id;
    if (type === newType) return;

    const newUrl = `${pathname}?keyword=${keyword}&type=${newType}`;
    router.push(newUrl);
  };

  const handleLoadMoreResults = async () => {
    if (!keyword || !type) return;

    let cursor_id = null;
    switch (type) {
      case "courses":
        cursor_id = courses.length > 0 ? courses[courses.length - 1].id : null;
        break;
      case "practice_tests":
        cursor_id =
          practiceTests.length > 0
            ? practiceTests[practiceTests.length - 1].id
            : null;
        break;
    }

    try {
      const response = await search(keyword, type, cursor_id);

      if (
        (response.courses.length == 0 && type === "courses") ||
        (response.practiceTests.length == 0 && type === "practice_tests")
      ) {
        setNotification("Bạn đã xem hết tất cả kết quả.");
        return;
      }

      setCourses((prev) => [...prev, ...response.courses]);
      setPracticeTests((prev) => [...prev, ...response.practiceTests]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewAllResult = (type: string) => {
    setPracticeTests([]);
    setCourses([]);
    const newUrl = `${pathname}?keyword=${keyword}&type=${type}`;
    router.push(newUrl);
  };

  return {
    keyword,
    type,
    isLoading,
    courses,
    practiceTests,
    notification,
    HandlerShowResult,
    handleLoadMoreResults,
    handleViewAllResult,
  };
}

import { Course } from "@/domain/entities/Course";
import { PracticeTest } from "@/domain/entities/PracticeTest";
import { useAuthContext } from "@/presentation/context/auth.context";
import { getUserCoures } from "@/presentation/services/course.service";
import { getUserPracticeTest } from "@/presentation/services/practice_test.service";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function useMyLib() {
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useAuthContext();
  const role = user?.role;

  const [courses, setCourse] = useState<Course[]>([]);
  const [practiceTests, setPracticeTest] = useState<PracticeTest[]>([]);
  const [type, setType] = useState<string>("courses");

  const handleChangeType = (event: React.MouseEvent<HTMLHeadingElement>) => {
    const target = event.target as HTMLElement;
    setType(target.id);
  };

  const handleCreateCourseClick = () => {
    router.push("/create-course");
  };

  const handleSearchClick = () => {
    document.getElementById("search-bar")?.focus();
  };

  const handleCardClick = (type: string, id: string) => {
    router.push(`${pathname}/${type}?${type}-id=${id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const course = await getUserCoures();
      if (course.length > 0) {
        setCourse(course);
      }
      const practiceTest = await getUserPracticeTest();
      if (practiceTest.length > 0) {
        setPracticeTest(practiceTest);
      }
    };
    fetchData();
  }, [user]);
  return {
    courses,
    practiceTests,
    type,
    role,
    handleChangeType,
    handleCreateCourseClick,
    handleSearchClick,
    handleCardClick,
  };
}

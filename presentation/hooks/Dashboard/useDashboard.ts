import { useEffect, useState } from "react";

import { getRandomCourse } from "@/presentation/services/course.service";
import { getRandomPracticeTest } from "@/presentation/services/practice_test.service";
import { useAuthContext } from "@/presentation/context/auth.context";
import { useRouter } from "next/navigation";

export default function useDashboard() {
  const router = useRouter();

  const { user } = useAuthContext();
  const role = user?.role;

  useEffect(() => {
    if (user?.role === "ADMIN") {
      router.replace("/admin");
    }
  }, [user, router]);

  const [courseSample, setCourseSample] = useState<Array<any>>([]);
  const [practiceTestSample, setPracticeTestSample] = useState<Array<any>>([]);

  useEffect(() => {
    const getCourses = async () => {
      const coursesSampleData = await getRandomCourse();
      if (coursesSampleData) {
        setCourseSample(coursesSampleData);
      }
    };

    const getPracticeTest = async () => {
      const practiceTestSampleData = await getRandomPracticeTest();
      if (practiceTestSampleData) {
        setPracticeTestSample(practiceTestSampleData);
      }
    };
    getCourses();
    getPracticeTest();
  }, []);

  return { courseSample, practiceTestSample, role };
}

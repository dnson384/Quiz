import { Term } from "@/domain/entities/Course";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import useCourseDetail from "./useCourseDetail";
import { shuffleArray } from "@/presentation/utils/arrayHelpers.util";
import { generateSlug } from "@/presentation/utils/textFormatter.util";

export default function useFlashcard() {
  const { courseDetail } = useCourseDetail();

  const [shuffledTerms, setShuffledTerms] = useState<Term[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [rotateX, setRotateX] = useState<number>(0);
  const [isResetting, setIsResetting] = useState<boolean>(false);
  const [direction, setDirection] = useState<number>(0);
  const [notification, setNotification] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  const baseInfo = courseDetail?.baseInfo;
  const totalTerms = shuffledTerms.length;
  const currentTermDisplay = currentIndex + 1;

  const canBack = currentIndex > 0;
  const canForward = currentIndex < totalTerms - 1;

  useEffect(() => {
    if (courseDetail?.terms) {
      setShuffledTerms(shuffleArray(courseDetail.terms));
    }
  }, [courseDetail]);

  const handleFlashcardClick = () => {
    if (!isResetting) {
      setRotateX((prev) => prev + 180);
    }
  };

  const handleNavigation = useCallback(
    (dir: "back" | "forward") => {
      if (dir === "back" && canBack) {
        setDirection(-1);
        setCurrentIndex((prev) => prev - 1);
      } else if (dir === "forward") {
        if (currentIndex === totalTerms - 1) {
          setNotification("Chúc mừng! Bạn đã hoàn thành bộ thẻ.");
          return;
        }
        setDirection(1);
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [canBack, currentIndex, totalTerms],
  );

  const handleClose = () => {
    if (!baseInfo) return;

    const courseId = searchParams.get("uuid");
    const slug = generateSlug(baseInfo.name);

    router.push(`/course/${slug}?uuid=${courseId}`);
  };

  // Reset trạng thái lật thẻ khi chuyển câu
  useEffect(() => {
    setIsResetting(true);
    setRotateX(0);

    const timer = setTimeout(() => {
      setIsResetting(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Xử lý thông báo hoàn thành & tự động thoát
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
        handleClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [notification]);

  return {
    // Data
    baseInfo,
    currentIndex,
    currentTermData: shuffledTerms[currentIndex],
    totalTerms,
    currentTermDisplay,

    // UI State
    canBack,
    canForward,
    rotateX,
    isResetting,
    direction,
    notification,

    // Actions
    handleFlashcardClick,
    handleNavigation,
    handleClose,
  };
}

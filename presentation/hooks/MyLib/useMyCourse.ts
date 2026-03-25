"use client";
import { nanoid } from "nanoid";
import {
  Course,
  CourseDetail,
  UpdateBaseInfo,
  UpdateCourse,
  UpdateTerm,
} from "@/domain/entities/Course";
import { useAuthContext } from "@/presentation/context/auth.context";
import {
  getUserCoures,
  getCourseDetail,
  updateCourse,
  deleteCourse,
} from "@/presentation/services/course.service";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function useMyCourse() {
  const { user } = useAuthContext();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Raw data
  const [baseInfo, setBaseInfo] = useState<Course>();
  const [terms, setTerms] = useState<UpdateTerm[]>([]);

  // Changed data
  const [changedName, setChangedName] = useState<UpdateBaseInfo>();
  const [changedTerms, setChangedTerms] = useState<UpdateTerm[]>([]);

  // Delete Data
  const [deletedTerms, setDeletedTerms] = useState<string[]>([]);

  // UI
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Card Behavior
  const handleDeleteCard = (index: number) => {
    setTerms((prev) => {
      const newTerms = [...prev];
      newTerms.splice(index, 1);
      return newTerms;
    });

    const id = terms[index].id;
    if (id !== null) {
      setDeletedTerms((prev) => [...prev, id]);
    }
  };

  const handleAddCard = () => {
    setTerms((prev) => {
      const newTerms = [...prev];
      newTerms.push({ id: null, tempId: nanoid(), term: "", definition: "" });
      return newTerms;
    });
  };

  // Input Change
  const handleBaseInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);

    const target = event.target;
    const { name, value } = target;
    setChangedName((prev) => ({ ...prev, [name]: value }));
  };

  const handleTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setIsSubmitted(false);

    const target = event.target;
    const { name, value } = target;

    setChangedTerms((prev) => {
      const newChangedTerms = [...prev];
      const currentTerm = terms[index];
      if (!currentTerm) return prev;

      let currentIndex = newChangedTerms.findIndex((changedTerm) => {
        if (currentTerm.id) {
          return changedTerm.id === currentTerm.id;
        } else {
          return changedTerm.tempId === currentTerm.tempId;
        }
      });

      if (currentIndex < 0) {
        newChangedTerms.push({
          id: currentTerm.id,
          tempId: currentTerm.id ? undefined : currentTerm.tempId,
          term: terms[index].term,
          definition: terms[index].definition,
        });
        currentIndex = newChangedTerms.length - 1;
      }

      newChangedTerms[currentIndex] = {
        ...newChangedTerms[currentIndex],
        [name]: value,
      };
      return newChangedTerms;
    });
  };

  // Save
  const handleSaveChange = async (valid: boolean) => {
    setIsSubmitted(true);
    if (valid && baseInfo?.id) {
      const updateCourseData: UpdateCourse = {
        ...(changedName && { course: changedName }),
        details: changedTerms,
      };
      if (await updateCourse(baseInfo.id, updateCourseData, deletedTerms)) {
        window.location.reload();
      }
    }
  };

  // Delete
  const handleDeleteCourse = async () => {
    if (confirm("Xác nhận xoá học phần")) {
      const id = baseInfo?.id;
      if (!id) return;
      if (await deleteCourse(id)) {
        router.replace("/my-lib");
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCourseData = async () => {
      const courseId = searchParams.get("course-id");
      if (!courseId) return;

      const userCourses = await getUserCoures();
      if (!userCourses.some((course) => course.id === courseId)) {
        router.push("/dashboard");
        return;
      }

      const response: CourseDetail = await getCourseDetail(courseId);
      if (response) {
        setBaseInfo(response.baseInfo);
        setTerms(response.terms);
        setIsLoading(false);
      }
    };

    fetchCourseData();
  }, [user]);

  return {
    // Data
    baseInfo,
    terms,
    changedName,
    changedTerms,
    // UI
    isLoading,
    isSubmitted,
    // Card Behavior
    handleDeleteCard,
    handleAddCard,
    // Input Change
    handleBaseInfoChange,
    handleTermChange,
    // Save
    handleSaveChange,
    handleDeleteCourse,
  };
}

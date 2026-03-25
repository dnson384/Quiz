"use client";
import React, { useState, useEffect } from "react";
import { NewTerm, NewBaseInfo, NewCourse } from "@/domain/entities/Course";
import { createNewCoures } from "@/presentation/services/course.service";
import { useRouter } from "next/navigation";

export default function useCreateCoures() {
  const router = useRouter();

  const [termCount, setTermCount] = useState<number>(2);
  const [baseInfo, setBaseInfo] = useState<NewBaseInfo>({ name: "" });
  const [termData, setTermData] = useState<NewTerm[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddCartClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    setTermCount((prev) => prev + 1);
  };

  const handleDeleteCard = (index: number) => {
    setIsSubmitted(false);
    if (termCount > 2 && termData.length > 2) {
      setTermCount((prev) => prev - 1);
      setTermData((prev) => {
        const newData = [...prev];
        newData.splice(index, 1);
        return newData;
      });
    }
  };

  const handleBaseInfoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSubmitted(false);
    const { value } = event.target;
    setBaseInfo({ name: value });
  };

  const handleTermChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setIsSubmitted(false);
    const { name, value } = event.target;
    setTermData((prev) => {
      const newData = [...prev];

      while (index >= newData.length)
        newData.push({ term: null, definition: null });

      newData[index] = {
        ...newData[index],
        [name]: value,
      };
      return newData;
    });
  };

  const handleCreateClick = async (valid: boolean) => {
    setIsSubmitted(true);
    if (valid) {
      if (termData.length >= 2) {
        const newCourse: NewCourse = { baseInfo: baseInfo, terms: termData };
        if (await createNewCoures(newCourse)) {
          router.replace("/my-lib");
        } else {
          alert("Lỗi gì đó");
        }
      } else {
        setError("Phải có ít nhất 2 cặp thuật ngữ - định nghĩa");
      }
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return {
    // UI
    termCount,
    isSubmitted,
    error,
    // FieldData
    termData,
    baseInfo,
    // Card
    handleAddCartClick,
    handleDeleteCard,
    // Input
    handleTermChange,
    handleBaseInfoChange,
    // Submit
    handleCreateClick,
  };
}

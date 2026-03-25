import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function useLearnMethod() {
  const [showLearnMethod, setShowLearnMethod] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleChangeLearnMethod = (method: string) => {
    const courseId = searchParams.get("uuid");
    let newURL = `/${pathname.split("/")[1]}/${method}?uuid=${courseId}`;
    if (method === "flashcard") {
      newURL += "&currentTerm=1"
    }
    router.push(newURL);
  };

  useEffect(() => {
    setSelectedMethod((pathname?.split("/")[2] as string) || null);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowLearnMethod(false);
        setIsFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    showLearnMethod,
    isFocus,
    selectedMethod,
    dropdownRef,
    setShowLearnMethod,
    setIsFocus,
    handleChangeLearnMethod,
  };
}

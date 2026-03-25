import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useShowFullMenu } from "@/presentation/store/dashboard.store";
import { useAuthContext } from "@/presentation/context/auth.context";
import { useMenuContext } from "@/presentation/context/menu.context";

export default function useNavigationBar() {
  const pathname = usePathname();
  const router = useRouter();

  const { user } = useAuthContext();

  const [isFocused, setIsFocused] = useState(false);
  const [keyword, setKeyword] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { showMenu, setShowMenu } = useMenuContext();

  const showFullMenu = useShowFullMenu((state) => state.showFullMenu);
  const setShowFullMenu = useShowFullMenu((state) => state.setShowFullMenu);

  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  const handleSearchInputFocus = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (["/dashboard", "/my-lib", "/admin"].includes(pathname)) {
      setShowFullMenu(true);
    } else {
      setShowFullMenu(false);
    }
  }, [pathname]);

  const handleMenuIcon = () => {
    const showFullMenuTemp =
      window.innerWidth >= 1440 && showFullMenu ? true : false;
    setShowFullMenu(!showFullMenuTemp);
    setShowMenu((prev) => {
      if (window.innerWidth < 1440) return !prev;
      return prev;
    });
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setKeyword(event.target.value);
  };

  const handleSubmitSearchForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (keyword && keyword.trim().length > 0) {
      router.push(`/search?keyword=${keyword}&type=all`);
    }

    setKeyword(null);
    inputRef.current?.blur();
    setIsFocused(false);
  };

  const handleLogoClick = () => {
    if (pathname.toString().includes("dashboard")) return;
    router.push("/dashboard");
  };

  const handleUserAvatarClick = () => {
    setShowUserMenu((prev) => !prev);
  };

  const handlePersonalInformationClick = () => {
    router.push("/personal");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!showUserMenu) return;

      const target = event.target as Node;
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(target) &&
        avatarRef.current &&
        !avatarRef.current.contains(target)
      ) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

  return {
    user,
    isFocused,
    keyword,
    inputRef,
    showUserMenu,
    userMenuRef,
    avatarRef,
    setIsFocused,
    handleMenuIcon,
    handleSearchInputFocus,
    handleSearchInputChange,
    handleSubmitSearchForm,
    handleLogoClick,
    handleUserAvatarClick,
    handlePersonalInformationClick,
  };
}

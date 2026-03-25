"use client";
import useLearnMethod from "@/presentation/hooks/Course/useLearnMethod";

export default function LearnMethodDropdown() {
  const {
    dropdownRef,
    selectedMethod,
    isFocus,
    showLearnMethod,
    setIsFocus,
    setShowLearnMethod,
    handleChangeLearnMethod,
  } = useLearnMethod();

  const learnIcon = [
    {
      label: "flashcard",
      text: "Thẻ ghi nhớ",
      icon: (
        <svg
          width="24"
          height="19"
          viewBox="0 0 30 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="6.3158"
            y="6.3158"
            width="23.6842"
            height="16.9173"
            rx="3"
            fill="#7DD3FC"
          />
          <rect width="23.6842" height="16.9173" rx="3" fill="#6366F1" />
        </svg>
      ),
    },
    {
      label: "learn",
      text: "Học",
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.91156 4.7301C8.71986 4.99874 7.5635 5.67481 6.36176 6.52502C5.33523 7.25132 4.51881 8.22528 3.97992 9.36975C3.44077 10.5149 3.19151 11.806 3.2641 13.1393C3.33681 14.4735 3.72993 15.8104 4.42133 17.0338C5.11286 18.2574 6.07883 19.3262 7.23773 20.1461C8.39646 20.9658 9.70781 21.509 11.0571 21.736C12.4058 21.9628 13.749 21.8661 14.976 21.4684C17.1035 20.7786 18.4214 19.9863 19.8188 19.0934L21.434 21.6207C19.9511 22.5683 18.3845 23.517 15.9018 24.3219C14.198 24.8743 12.3657 24.9975 10.56 24.694C8.75447 24.3903 7.02194 23.668 5.50433 22.5944C3.98676 21.5207 2.71974 20.1208 1.80902 18.5094C0.8984 16.898 0.366766 15.1143 0.268005 13.3033C0.169269 11.4914 0.506839 9.70294 1.26508 8.09241C2.02369 6.48115 3.17734 5.10242 4.62836 4.07581C5.9042 3.17317 7.45931 2.2073 9.2514 1.80334L9.91156 4.7301Z"
            fill="#6366F1"
          />
          <path
            d="M18.4626 20.3956C18.4627 21.3115 19.205 22.0546 20.1218 22.0547C21.0387 22.0547 21.7818 21.3116 21.7819 20.3956C21.7819 19.4794 21.0388 18.7364 20.1218 18.7364C19.2049 18.7366 18.4626 19.4795 18.4626 20.3956Z"
            fill="white"
            stroke="#6366F1"
            strokeWidth="2.8"
          />
          <path
            d="M7.24292 3.05957C7.24307 3.97547 7.98534 4.71857 8.9021 4.71875C9.81902 4.71875 10.5621 3.97558 10.5623 3.05957C10.5623 2.14343 9.81911 1.40039 8.9021 1.40039C7.98525 1.40057 7.24292 2.14355 7.24292 3.05957Z"
            fill="white"
            stroke="#6366F1"
            strokeWidth="2.8"
          />
          <ellipse
            cx="2.03953"
            cy="2.03994"
            rx="2.03953"
            ry="2.03994"
            transform="matrix(0 1 1 -4.37026e-08 12.9823 0)"
            fill="#7DD3FC"
          />
          <ellipse
            cx="2.03953"
            cy="2.03994"
            rx="2.03953"
            ry="2.03994"
            transform="matrix(0 1 1 -4.37026e-08 18.0822 3.0593)"
            fill="#7DD3FC"
          />
          <ellipse
            cx="2.03953"
            cy="2.03994"
            rx="2.03953"
            ry="2.03994"
            transform="matrix(0 1 1 -4.37026e-08 21.142 8.15811)"
            fill="#7DD3FC"
          />
          <ellipse
            cx="2.03953"
            cy="2.03994"
            rx="2.03953"
            ry="2.03994"
            transform="matrix(0 1 1 -4.37026e-08 21.142 13.257)"
            fill="#7DD3FC"
          />
        </svg>
      ),
    },
    {
      label: "test",
      text: "Kiểm tra",
      icon: (
        <svg
          width="18"
          height="22"
          viewBox="0 0 30 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.1044 11.7628L12.1174 16.1133H16.0913L14.1044 11.7628Z"
            fill="#7DD3FC"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M30 8.8623L21.1691 0H8.8058C7.86896 0 6.97049 0.339529 6.30804 0.943894C5.6456 1.54826 5.27344 2.36795 5.27344 3.22266V29.0039C5.27344 29.8586 5.6456 30.6783 6.30804 31.2827C6.97049 31.887 7.86896 32.2266 8.8058 32.2266H26.4676C27.4045 32.2266 28.3029 31.887 28.9654 31.2827C29.6278 30.6783 30 29.8586 30 29.0039V8.8623Z"
            fill="#7DD3FC"
          />
          <path
            d="M9.10715 16.2628L7.05804 20.6133H11.1563L9.10715 16.2628Z"
            fill="#6366F1"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25.5 13.3623L16.3929 4.5H3.64286C2.67671 4.5 1.75014 4.83953 1.06697 5.44389C0.3838 6.04826 0 6.86795 0 7.72266V33.5039C0 34.3586 0.3838 35.1783 1.06697 35.7827C1.75014 36.387 2.67671 36.7266 3.64286 36.7266H21.8571C22.8233 36.7266 23.7499 36.387 24.433 35.7827C25.1162 35.1783 25.5 34.3586 25.5 33.5039V13.3623Z"
            fill="#6366F1"
          />
          <rect x="5" y="20" width="15" height="3" rx="1.5" fill="white" />
          <rect x="5" y="25" width="10" height="3" rx="1.5" fill="white" />
        </svg>
      ),
    },
  ];

  return (
    <div className="sm:w-50 md:w-60 absolute z-20" ref={dropdownRef}>
      <div
        className={`bg-gray-100 w-full px-5 py-3 rounded-lg flex items-center justify-between gap-1 cursor-pointer select-none  ${
          isFocus && showLearnMethod
            ? "ring-2 ring-indigo-200"
            : "hover:bg-gray-200"
        }`}
        onClick={() => {
          setShowLearnMethod(!showLearnMethod);
          setIsFocus(true);
        }}
      >
        <div className="flex gap-2 items-center justify-center  ">
          <div className="w-6 flex justify-center items-center">
            {learnIcon.find((item) => item.label === selectedMethod)?.icon}
          </div>
          <h3 className="hidden sm:block font-semibold">
            {learnIcon.find((item) => item.label === selectedMethod)?.text}
          </h3>
        </div>

        {/* Arrow down */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#000000"
            d="M831.872 340.864L512 652.672L192.128 340.864a30.59 30.59 0 0 0-42.752 0a29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728a30.59 30.59 0 0 0-42.752 0z"
          />
        </svg>
      </div>

      {showLearnMethod && (
        <div className="w-full py-3 mt-2 bg-white rounded-md shadow-[0_0_15px_rgba(0,0,0,0.1)]">
          {learnIcon.map(
            (item) =>
              item.label !== selectedMethod && (
                <div
                  key={item.label}
                  className="w-full px-5 py-3 rounded-lg flex items-center gap-2 cursor-pointer select-none hover:bg-gray-200"
                  onClick={() => handleChangeLearnMethod(item.label)}
                >
                  <div className="w-6 flex justify-center items-center">
                    {item.icon}
                  </div>
                  <h3 className="hidden sm:block font-semibold">{item.text}</h3>
                </div>
              ),
          )}
        </div>
      )}
    </div>
  );
}

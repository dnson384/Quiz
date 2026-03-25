import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface FlashcardData {
  term: string;
  definition: string;
  currentTermDisplay: number;
  num_of_terms: number;

  // useFlashcard
  rotateX: number;
  canBack: boolean;
  canForward: boolean;
  isResetting: boolean;
  direction: number;
  handleFlashcardClick: () => void;
  handleNavigation: (dir: "back" | "forward") => void;
  isLatinText: (word: string) => boolean;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
  }),
};

export default function Flashcard({
  term,
  definition,
  currentTermDisplay,
  num_of_terms,
  rotateX,
  canBack,
  canForward,
  isResetting,
  direction,
  handleFlashcardClick,
  handleNavigation,
  isLatinText,
}: FlashcardData) {
  const termLatin = isLatinText(term);
  const definitionLatin = isLatinText(definition);
  const pathname = usePathname();

  return (
    <section className="flex flex-col gap-3">
      {/* Flashcard */}
      <div
        className={`${
          pathname.includes("/flashcard") ? "h-180" : "h-[450px]"
        } w-full relative group cursor-pointer perspective-[1000px] overflow-visible`}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentTermDisplay}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 500, damping: 40 },
              opacity: { duration: 0.05 },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <div
              className={`relative flex justify-center items-center w-full h-full rounded-xl transition-all ${
                isResetting ? "duration-0" : "duration-200"
              } transform-3d p-3 select-none`}
              style={{ transform: `rotateX(${rotateX}deg)` }}
              onClick={handleFlashcardClick}
            >
              {/* Term */}
              <div className="absolute bg-white inset-0 flex items-center justify-center rounded-xl p-5 text-center shadow-[0_0_20px_rgb(0,0,0,0.1)] backface-hidden">
                <p
                  className={`${
                    termLatin
                      ? "font-semibold text-3xl"
                      : "font-medium text-4xl"
                  } text-gray-800`}
                >
                  {term}
                </p>
              </div>

              {/* Definition */}
              <div className="absolute bg-white inset-0 flex items-center justify-center rounded-xl p-5 text-center shadow-[0_0_20px_rgba(0,0,0,0.1)] backface-hidden transform-[rotateX(180deg)]">
                <p
                  className={`${
                    definitionLatin
                      ? "font-semibold text-3xl"
                      : "font-medium text-4xl"
                  } text-gray-800`}
                >
                  {definition}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-3 select-none">
        {/* Arrow back */}
        <div
          className={`bg-gray-100 px-5 py-3 w-fit rounded-full ${
            !canBack
              ? "pointer-events-none"
              : "cursor-pointer hover:bg-gray-200"
          }`}
          onClick={() => handleNavigation("back")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
          >
            <path
              fill={canBack ? "#000000" : "#9ca3af"}
              fillRule="evenodd"
              d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {pathname !== "/flashcard" && (
          <p className="text-lg font-bold text-gray-500">
            {currentTermDisplay} / {num_of_terms}
          </p>
        )}

        {/* Arrow forward */}
        <div
          className={`bg-gray-100 px-5 py-3 w-fit rounded-full ${
            !canForward
              ? "pointer-events-none"
              : "cursor-pointer hover:bg-gray-200"
          }`}
          onClick={() => handleNavigation("forward")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            className="rotate-180"
          >
            <path
              fill={canForward ? "#000000" : "#9ca3af"}
              fillRule="evenodd"
              d="M10.53 5.47a.75.75 0 0 1 0 1.06l-4.72 4.72H20a.75.75 0 0 1 0 1.5H5.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useError } from "../../utils/hooks";

const Error = () => {
  const error = useError();
  const { error: postError, editModalOpen } = useSelector((state) => state.posts);
  const ref = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();
  const introPages = pathname === "/" || pathname === "/signup" || pathname === "/login";

  useEffect(() => {
    const refCopy = ref.current;
    if (postError === "sizeLimit" && ref.current) return ref.current.classList.add("disappear");
    return () => {
      refCopy?.classList.remove("disappear");
    };
  }, [postError]);

  return (
    <>
      {error && (
        <div
          ref={ref}
          className={`fixed ${
            introPages || editModalOpen ? "top-0" : "top-16"
          } mb-2 h-min inset-x-0 w-full py-4 px-2 bg-black dark:bg-white text-center font-bold text-white dark:text-black text-sm z-50 whitespace-pre`}
        >
          {error}
        </div>
      )}
    </>
  );
};

export default Error;

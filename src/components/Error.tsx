import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useError } from "../utils/hooks";

const Error = () => {
  const error = useError();
  const { error: postError } = useSelector((state) => state.posts);
  const ref = useRef<HTMLDivElement | null>(null);
  const [isSizeLimit, setIsSizeLimit] = useState(false);

  useEffect(() => {
    if (postError === "sizeLimit" && ref.current) return ref.current.classList.add("disappear");
    return () => {
      ref.current?.classList.remove("disappear");
    };
  }, [error]);

  if (!error) {
    return null;
  } else
    return (
      <div
        ref={ref}
        className={`fixed top-16  mb-2 h-min inset-x-0 w-full py-4 px-2 bg-black dark:bg-white text-center font-bold text-white dark:text-black text-sm z-50 whitespace-pre`}
      >
        {error}
      </div>
    );
};

export default Error;

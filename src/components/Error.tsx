import React from "react";
import { useError } from "../utils/hooks";

const Error = () => {
  const error = useError();
  if (!error) return null;
  return (
    <div className="fixed top-16  mb-2 h-min inset-x-0 w-full py-4 px-2 bg-black dark:bg-white text-center font-bold text-white dark:text-black text-sm z-50 whitespace-pre">
      {error}
    </div>
  );
};

export default Error;

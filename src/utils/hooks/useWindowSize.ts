import { useEffect, useState } from "react";

const getWindowSize = () => {
  const { innerHeight: height, innerWidth: width } = window;
  return {
    height,
    width,
  };
};

const useWindowSize = () => {
  const [size, setSize] = useState(getWindowSize());
  const handleWindowSize = () => {
    setSize(getWindowSize());
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSize);
    return () => window.removeEventListener("resize", handleWindowSize);
  }, []);
  return size;
};

export default useWindowSize;

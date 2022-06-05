import { useEffect, useState } from "react";

const useContainerSize = (domElementRef) => {
  const [size, setSize] = useState(null);

  useEffect(() => {
    setSize(`${domElementRef?.current?.getBoundingClientRect().width}px`);
  }, []);

  const resizeDomElement = () => {
    setSize(`${domElementRef?.current?.getBoundingClientRect().width}px`);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeDomElement);
    return () => {
      window.removeEventListener("resize", resizeDomElement);
    };
  }, [domElementRef]);

  return size;
};

export default useContainerSize;

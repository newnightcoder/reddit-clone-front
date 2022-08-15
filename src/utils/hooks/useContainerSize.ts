import { useCallback, useEffect, useState } from "react";

const useContainerSize = (domElementRef: React.MutableRefObject<HTMLDivElement | null>) => {
  const [size, setSize] = useState<string>("");

  useEffect(() => {
    if (domElementRef.current) {
      return setSize(`${domElementRef?.current?.getBoundingClientRect().width}px`);
    }
  }, [domElementRef]);

  const resizeDomElement = useCallback(() => {
    setSize(`${domElementRef?.current?.getBoundingClientRect().width}px`);
  }, [domElementRef, setSize]);

  useEffect(() => {
    window.addEventListener("resize", resizeDomElement);
    return () => {
      window.removeEventListener("resize", resizeDomElement);
    };
  }, [domElementRef, resizeDomElement]);

  return size;
};

export default useContainerSize;

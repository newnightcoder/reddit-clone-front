import { useEffect, useState } from "react";
import useToggle from "./useToggle";

const useToggleTabs = () => {
  const [leftTabOpen, setLeftTabOpen] = useState(true);
  const toggleTabs = useToggle(leftTabOpen, setLeftTabOpen);
  const [isMounted, setisMounted] = useState(true);

  useEffect(() => {
    if (isMounted && !leftTabOpen) {
      toggleTabs();
    }
  }, []);

  useEffect(() => {
    return () => {
      setisMounted(false);
    };
  }, []);

  return { toggleTabs, leftTabOpen };
};

export default useToggleTabs;

import { useState } from "react";
import useToggle from "./useToggle";

const useToggleTabs = () => {
  const [leftTabOpen, setLeftTabOpen] = useState(true);
  const toggleTabs = useToggle(leftTabOpen, setLeftTabOpen);

  return { toggleTabs, leftTabOpen };
};

export default useToggleTabs;

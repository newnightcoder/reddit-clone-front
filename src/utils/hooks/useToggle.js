import { useEffect, useState } from "react";

const useToggle = (state, setState) => {
  const [bool, setBool] = useState(state);

  const toggle = () => {
    return setState(!bool);
  };

  useEffect(() => {
    setBool(state);
  }, [state]);

  return toggle;
};

export default useToggle;

import { useEffect, useState } from "react";

const useToggleBox = (state, setState) => {
  const [bool, setBool] = useState(state);

  const toggle = () => {
    return setState(!bool);
  };

  useEffect(() => {
    setBool(state);
  }, [state]);

  return toggle;
};

export default useToggleBox;

import { useEffect, useState } from "react";

const useToggle = (state: boolean, setState: React.Dispatch<React.SetStateAction<boolean>>) => {
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

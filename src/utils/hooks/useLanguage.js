import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import language from "../../languages";

const useLanguage = () => {
  const lang = useSelector((state) => state.user.language);
  const [userLanguage, setUserLanguage] = useState(language.deutsch);

  useEffect(() => {
    switch (lang) {
      case "en":
        return setUserLanguage(language.english);
      case "fr":
        return setUserLanguage(language.français);
      case "de":
        return setUserLanguage(language.deutsch);
      default:
        return setUserLanguage(language.deutsch);
    }
  }, [lang]);

  return userLanguage;
};

export default useLanguage;

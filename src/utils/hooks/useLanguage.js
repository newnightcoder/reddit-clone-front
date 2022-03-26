import { useState } from "react";
import language from "../../languages/index";

const useLanguage = () => {
  let langInStorage = localStorage.getItem("Lang");
  const [userLang] = useState(langInStorage ? langInStorage : "français");

  // function to return lang data depending on langstr
  const handleLang = (langInStorage) => {
    if (!langInStorage) return language.english;
    if (langInStorage === "français") return language.français;
    if (langInStorage === "english") return language.english;
    if (langInStorage === "deutsch") return language.deutsch;
  };

  const [userLangData, setUserLangData] = useState(() => handleLang(userLang));

  // set lang depending on option = set lang in storage / get that lang / setData to the lang retrieved
  const setLanguage = (lang) => {
    switch (lang) {
      case "français":
        localStorage.setItem("Lang", lang);
        langInStorage = localStorage.getItem("Lang");
        setUserLangData(handleLang(langInStorage));
        break;
      case "english":
        localStorage.setItem("Lang", lang);
        setUserLangData(language.english);
        break;
      case "deutsch":
        localStorage.setItem("Lang", lang);
        setUserLangData(language.deutsch);
        break;
      default:
        localStorage.setItem("Lang", "english");
        setUserLangData(language.english);
        break;
    }
  };

  // useEffect(() => {
  //   setUserLangData(handleLang(langInStorage));
  //   console.log("langdata hook", userLangData);
  // }, [userLangData, langInStorage]);

  return [userLangData, setLanguage];
};

export default useLanguage;

import { useState } from "react";
import language from "../../languages/index";

const useLanguage = () => {
  // 1. get langstr from storage
  let langInStorage = localStorage.getItem("Lang");
  // 2. and initialize langstr from storage or default
  const [userLang] = useState(langInStorage ? langInStorage : "français");

  // 3. function to return lang data depending on langstr
  const handleLang = (langInStorage) => {
    if (!langInStorage) return language.english;
    if (langInStorage === "français") return language.français;
    if (langInStorage === "english") return language.english;
    if (langInStorage === "deutsch") return language.deutsch;
  };

  // 4. lang data initialized from lang str function
  const [userLangData, setUserLangData] = useState(handleLang(userLang));

  // 5. set lang depending on option = set lang in storage / get that lang / setData to the lang retrieved
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
  return [userLangData, setLanguage];
};

export default useLanguage;

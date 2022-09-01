import { useLanguage } from "../../utils/hooks";

const HomeFooter = () => {
  const userLanguage = useLanguage();
  return (
    <ul className="hidden md:flex items-center justify-center text-xs space-x-4 text-gray-500 dark:text-gray-400 capitalize">
      <li className="hover:underline hover:cursor-pointer">{userLanguage.aside.footer.about}</li>
      <li className="hover:underline hover:cursor-pointer">{userLanguage.aside.footer.press}</li>
      <li className="hover:underline hover:cursor-pointer">{userLanguage.aside.footer.terms}</li>
      <li className="hover:underline hover:cursor-pointer">{userLanguage.aside.footer.confidentiality}</li>
      <li className="hover:underline hover:cursor-pointer">&copy;2022 FORUM, Inc.</li>
    </ul>
  );
};

export default HomeFooter;

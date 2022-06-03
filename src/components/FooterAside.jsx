import React from "react";
import { useLanguage } from "../utils/hooks";

const FooterAside = () => {
  const userLanguage = useLanguage();
  const {
    help,
    coin,
    premium,
    gift,
    community,
    re,
    topic,
    career,
    press,
    ads,
    blog,
    conditions,
    content,
    confidentiality,
    moderation,
    rights,
  } = userLanguage.aside.footer;

  return (
    <div className="h-max w-72 flex flex-col space-y-4 text-xs transition-color duration-500 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded p-4 border border-gray-300 dark:border-gray-700">
      <div className="flex justify-between h-max w-full space-x-3">
        <ul className="leading-6">
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{help}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{coin}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{premium}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{gift}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{community}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{re}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{topic}</li>
        </ul>
        <ul className="leading-6">
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{career}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{press}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{ads}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{blog}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{conditions}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">{content} </li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-400">
            {confidentiality}{" "}
          </li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900 dark:hover:text-gray-300">{moderation} </li>
        </ul>
      </div>
      <span className="w-full text-center">Forum Inc © 2022 - {rights}</span>
    </div>
  );
};

export default FooterAside;

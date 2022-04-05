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
    <div className="h-max w-72 flex flex-col space-y-4 text-xs bg-white rounded text-gray-800 p-4 border border-gray-300">
      <div className="flex justify-between h-max w-full space-x-3">
        <ul className="leading-6">
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{help}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{coin}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{premium}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{gift}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{community}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{re}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{topic}</li>
        </ul>
        <ul className="leading-6">
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{career}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{press}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{ads}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{blog}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{conditions}</li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{content} </li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{confidentiality} </li>
          <li className="hover:underline hover:cursor-pointer hover:text-gray-900">{moderation} </li>
        </ul>
      </div>
      <span className="w-full text-center">Forum Inc © 2022 - {rights}</span>
    </div>
  );
};

export default FooterAside;

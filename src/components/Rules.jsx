import React from "react";
import { useLanguage } from "../utils/hooks";

const Rules = () => {
  const userLanguage = useLanguage();
  const { rules, rule_human, rule_irl, rule_source, rule_double, rule_rule, rule_msg_1, rule_msg_2, rule_msg_3, rule_msg_4 } =
    userLanguage.aside.rules;

  return (
    <div className="h-max w-72 flex flex-col rounded transition-color duration-500 text-gray-900 dark:text-gray-100">
      <div className="header h-24 w-full bg-blue-400 rounded-tl rounded-tr relative border-l border-r border-t border-transparent">
        <span className="w-full text-center absolute bottom-0 mb-2 text-white text-lg font-bold">{rules}</span>
      </div>
      <ul className="flex flex-col items-center justify-start px-2 py-2 transition-color duration-500 bg-white dark:bg-gray-900 border-l border-r border-b border-gray-300 dark:border-gray-700 rounded-br rounded-bl">
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-2 border-b border-gray-300 dark:border-gray-500">
          <span>1.</span>
          <p>{rule_human}</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-2 border-b border-gray-300 dark:border-gray-500">
          <span>2.</span>
          <p>{rule_irl}</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-2 border-b border-gray-300 dark:border-gray-500">
          <span>3.</span>
          <p>{rule_source}</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-2 border-b border-gray-300 dark:border-gray-500">
          <span>4.</span>
          <p>{rule_double}</p>
        </li>
        <li className="w-full flex items-start justify-start space-x-1 text-sm font-bold py-2">
          <span>5.</span>
          <p>{rule_rule}</p>
        </li>
      </ul>
      <div className="text-xs transition-color duration-500 bg-gray-200 dark:bg-gray-800 px-1 mt-2">
        {rule_msg_1}&nbsp;
        <span className="text-blue-400 underline hover:cursor-pointer">{rule_msg_2}</span>&nbsp;
        {rule_msg_3}&nbsp;
        <span className="text-blue-400 underline hover:cursor-pointer">{rule_msg_4}</span>.
      </div>
    </div>
  );
};

export default Rules;

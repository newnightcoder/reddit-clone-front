import { formatDistanceToNowStrict } from "date-fns";
import fr from "date-fns/locale/fr";
import React from "react";
import picPlaceholder from "../assets/pic_placeholder.svg";

const Menu = ({ isOpen, userName, userPic, userDate }) => {
  const formatTimestamp = (date) => {
    const convertedDate = {
      year: date.split("-")[0],
      month: date.split("-")[1],
      day: date.split("-")[2],
      minute: date.split("-")[3],
      seconds: date.split("-")[4],
    };

    return formatDistanceToNowStrict(
      new Date(
        convertedDate.year,
        convertedDate.month,
        convertedDate.day,
        convertedDate.minute,
        convertedDate.seconds
      ),
      { addSuffix: false, locale: fr }
    );
  };
  console.log("userdate menu:", userDate);
  return (
    <div
      className="menu-container h-screen w-9/12 py-3 bg-gray-100 flex flex-col items-center justify-center absolute top-0 left-0 z-50 transform -translate-x-full transition transition-transform duration-300"
      style={{ transform: isOpen && "translateX(0)" }}
    >
      <div className="top-section h-2/6 w-full flex flex-col items-center justify-center gap-2 border-b border-gray-300">
        <div className="avatar-container h-2/3 w-full flex items-center justify-center">
          <div
            className="w-40 h-40 rounded-full border border-gray-400"
            style={
              userPic
                ? { background: `url(${userPic}) no-repeat center/cover` }
                : {
                    background: `url(${picPlaceholder}) no-repeat center/cover`,
                  }
            }
          ></div>
        </div>
        <div className="username-member h-max w-full flex flex-col items-center justify-start">
          <span className="text-xl font-bold capitalize">{userName}</span>
          <span className="italic">
            membre depuis {formatTimestamp(userDate)}
          </span>
        </div>
      </div>
      <div className="main-section h-4/6 w-full flex"></div>
    </div>
  );
};

export default Menu;

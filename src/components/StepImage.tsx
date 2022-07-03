import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import React from "react";
import Div100vh from "react-div-100vh";
import { useSelector } from "react-redux";
import { logo, picPlaceholder } from "../assets";
import { history } from "../utils/helpers";
import { useError, useLanguage } from "../utils/hooks";
import ImgUploader from "./ImgUploader";

const StepImage = () => {
  const { picUrl } = useSelector((state) => state.user);
  const userLanguage = useLanguage();
  const error = useError();

  return (
    <Div100vh className="w-screen bg-gray-200 flex flex-col items-center justify-evenly absolute top-0 left-0 translate-x-full">
      <header className="h-1/4 flex flex-col items-center justify-center">
        <h1 className="text-center font-bold text-lg uppercase">
          {userLanguage.signup.stepImage.lastStep}
          <br />
          {userLanguage.signup.stepImage.join}{" "}
        </h1>
        <img src={logo} alt="" />
      </header>
      {error && (
        <span className="whitespace-pre w-full md:w-max h-max py-2 px-3 text-sm md:text-sm text-white transition duration-500 bg-black dark:bg-white dark:text-black text-center rounded">
          {error}
        </span>
      )}
      <div className="h-max w-screen flex flex-col items-center gap-2">
        <div
          className="h-48 w-48 rounded-full border border-blue-400"
          style={{
            background: `url(${picUrl !== null ? picUrl : picPlaceholder}) no-repeat center/cover`,
          }}
        ></div>
        <ImgUploader profile={true} imgType={"pic"} />
      </div>
      <button className="underline font-bold" onClick={() => history.push("/feed")}>
        <span className="flex items-center gap-1">
          {userLanguage.signup.stepImage.later}
          <ChevronDoubleRightIcon className="h-4 w-4 text-black" style={{ transform: "translateY(1px)" }} />
        </span>
      </button>
    </Div100vh>
  );
};

export default StepImage;

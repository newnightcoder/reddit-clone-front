import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import Div100vh from "react-div-100vh";
import { useSelector } from "react-redux";
import { logo } from "../assets";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { history } from "../utils/helpers";
import { useLanguage } from "../utils/hooks";
import ImgUploader from "./ImgUploader";

const StepImage = () => {
  const { id, picUrl } = useSelector((state) => state.user);
  const userLanguage = useLanguage();

  return (
    <Div100vh
      className="w-screen bg-gray-200 flex flex-col items-center justify-evenly absolute top-0 left-0"
      style={{ transform: "translateX(100%)" }}
    >
      <header className="h-1/4 flex flex-col items-center justify-center">
        <h1 className="text-center font-bold text-lg uppercase">
          {userLanguage.signup.stepImage.lastStep}
          <br />
          {userLanguage.signup.stepImage.join}{" "}
        </h1>
        <img src={logo} alt="" />
      </header>
      {/* <span
        className="w-max h-max whitespace-pre py-2 px-3 text-center border border-red-700 rounded"
        style={errorServer === "" ? { visibility: "hidden" } : { visibility: "visible" }}
      >
        {errorServer !== "" && errorServer}
      </span> */}
      <div className="h-max w-screen flex flex-col items-center gap-2">
        <div
          className="h-48 w-48 rounded-full border border-blue-400"
          style={{
            background: `url(${picUrl !== null ? picUrl : picPlaceholder}) no-repeat center/cover`,
          }}
        ></div>
        <ImgUploader profile={true} imgType={"pic"} />
      </div>
      <button
        className="underline font-bold"
        onClick={() => {
          history.push({
            pathname: "/feed",
            state: { isNewUser: true },
          });
        }}
      >
        <span className="flex items-center gap-1">
          {userLanguage.signup.stepImage.later}
          <ChevronDoubleRightIcon className="h-4 w-4 text-black" style={{ transform: "translateY(1px)" }} />
        </span>
      </button>
    </Div100vh>
  );
};

export default StepImage;

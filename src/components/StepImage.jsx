import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logo } from "../assets";
import picPlaceholder from "../assets/pic_placeholder.svg";
import ImgUploader from "./ImgUploader";

const StepImage = () => {
  const { id, picUrl } = useSelector((state) => state.user);
  const history = useHistory();

  return (
    <div
      className="h-screen w-screen bg-gray-200 flex flex-col items-center justify-evenly absolute top-0 left-0"
      style={{ transform: "translateX(100%)" }}
    >
      <header className="h-1/4 flex flex-col items-center justify-center">
        <h1 className="text-center font-bold text-lg">
          DERNIÈRE ÉTAPE AVANT DE <br />
          REJOINDRE LA COMMUNAUTÉ
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
        <ImgUploader profile={true} />
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
          Plus tard, pas maintenant!
          <ChevronDoubleRightIcon className="h-4 w-4 text-black" style={{ transform: "translateY(1px)" }} />
        </span>
      </button>
    </div>
  );
};

export default StepImage;

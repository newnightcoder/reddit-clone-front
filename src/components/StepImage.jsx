import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/logo2.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { API_AUTH } from "./API";

const StepImage = ({ userId }) => {
  const [errorServer, setErrorServer] = useState("");
  const [isImg, setIsImg] = useState(false);
  // const [fileName, setFileName] = useState(null);
  const [blob, setBlob] = useState(null);
  const [blobName, setBlobName] = useState(null);
  const [picUrl, setPicUrl] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();
  const file = useRef(null);

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    console.log("FILE!!!", file.current.files[0]);
    const formData = new FormData();
    formData.append("userBlob", blob);
    formData.append("userId", userId);
    const request = {
      headers: {
        // "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(`${API_AUTH}/userpic`, request);
      const data = await response.json();
      if (response.status !== 200) {
        setError(data.errorMsg);
        return;
      }
      setPicUrl(data.picUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        transform: "translateX(100%)",
        background: `url(${logo}) repeat center/200%`,
      }}
      className="h-screen w-screen bg-red-400 flex flex-col items-center justify-evenly absolute top-0 left-0"
    >
      <h2 className="text-center">
        DERNIÈRE ÉTAPE AVANT DE <br />
        REJOINDRE LA COMMUNAUTÉ!
      </h2>
      <span
        className="w-max h-max whitespace-pre py-2 px-3 text-center border border-red-700 rounded"
        style={
          errorServer === ""
            ? { visibility: "hidden" }
            : { visibility: "visible" }
        }
      >
        {errorServer !== "" && errorServer}
      </span>
      <div className="h-max w-screen">
        <form
          className="flex flex-col items-center justify-center gap-2"
          action=""
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleImgSubmit}
        >
          <span> Choisissez votre image de profil</span>
          <label
            className="w-48 text-center bg-red-500 text-white p-2 rounded"
            htmlFor="file"
          >
            parcourir{" "}
          </label>
          <div
            className="h-40 w-40 rounded-full border border-gray-600"
            style={{
              background: `url(${
                picUrl ? picUrl : picPlaceholder
              }) no-repeat center/cover`,
              objectFit: "cover",
            }}
          >
            {/* <UserCircleIcon className="h-40 w-40 text-gray-500" /> */}
          </div>
          <div className="flex items-center gap-4">
            <input
              className="bg-red-500 text-white p-2 rounded hidden"
              type="file"
              accept="image/x-png,image/jpeg,image/jpg, image/gif"
              id="file"
              ref={file}
              onChange={() => {
                setBlob(file.current.files[0]);
                setBlobName(file.current.files[0].name);
              }}
            />
            <div>
              {blobName !== null ? (
                blobName
              ) : (
                <span className="italic text-xs">
                  Aucune photo choisie pour le moment.
                </span>
              )}
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-4">
            <button
              className="bg-red-500 text-white p-2 border border-red-500 rounded transform translate-y-2 transition transition-opacity duration-1000"
              style={blobName == null ? { opacity: 0 } : { opacity: 1 }}
            >
              voir l'aperçu
            </button>
            <button
              className="w-max flex items-center gap-1 bg-red-500 text-black font-bold border border-black p-2 rounded transform translate-y-2 transition transition-opacity duration-1000"
              style={
                picUrl == null
                  ? { opacity: 0, display: "none" }
                  : { opacity: 1, display: "flex" }
              }
              onClick={() => {
                setTimeout(() => {
                  alert("Super! profil complet!");
                  history.push({
                    pathname: "/feed",
                    state: {
                      new: true,
                      picUrl,
                    },
                  });
                }, 1000);
              }}
            >
              c'est bon!{" "}
              <ChevronDoubleRightIcon
                className="h-4 w-4 text-black font-bold"
                style={{ transform: "translateY(1px)" }}
              />
            </button>
          </div>
        </form>
      </div>

      <button
        className="underline font-bold"
        onClick={() => {
          history.push({
            pathname: "/feed",
            state: { new: true },
          });
        }}
      >
        <span className="flex items-center gap-1">
          plus tard, pas maintenant!{" "}
          <ChevronDoubleRightIcon
            className="h-4 w-4 text-black"
            style={{ transform: "translateY(1px)" }}
          />
        </span>
      </button>
    </div>
  );
};

export default StepImage;

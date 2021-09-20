import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
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
      console.log(data.msg);
      setPicUrl(data.picUrl);
      // setPicUrl(data.picUrl);
      // alert("profil complet!");
      // setTimeout(() => {
      //   history.push({
      //     pathname: "/feed",
      //     state: {
      //       new: true,
      //     },
      //   });
      // }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ transform: "translateX(100%)" }}
      className="h-screen w-screen bg-red-400  flex flex-col items-center justify-evenly absolute top-0 left-0"
    >
      <h2 className="text-center">
        DERNIÈRE ÉTAPE AVANT DE <br />
        REJOINDRE LA COMMUNAUTÉ!
      </h2>
      <span
        className="w-max h-max whitespace-pre py-2 px-3 text-center border border-red-400 rounded"
        style={
          errorServer === ""
            ? { visibility: "hidden" }
            : { visibility: "visible" }
        }
      >
        {errorServer !== "" && errorServer}
      </span>
      <div className="h-1/3 w-screen">
        <form
          className="flex flex-col items-center justify-center gap-2"
          action=""
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleImgSubmit}
        >
          <span> Choisissez votre image de profil</span>
          <div
            className="h-40 w-40 rounded-full border border-black"
            style={{
              background: `url(${picUrl}) no-repeat center/cover`,
              objectFit: "cover",
            }}
          >
            {/* <UserCircleIcon className="h-40 w-40 text-gray-500" /> */}
          </div>
          <div className="flex items-center gap-4">
            <label className="bg-red-500 text-white px-4" htmlFor="file">
              parcourir{" "}
            </label>
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
              {blobName !== null ? blobName : "vous n'avez rien choisi"}
            </div>
          </div>
          <button
            className="bg-red-500 text-white p-2 rounded transform translate-y-2 transition transition-opacity duration-1000"
            style={blobName == null ? { opacity: 0 } : { opacity: 1 }}
          >
            valider
          </button>{" "}
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
        plus tard, pas maintenant!
      </button>
    </div>
  );
};

export default StepImage;

import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { API } from ".";

const StepImage = ({ userId }) => {
  const [errorServer, setErrorServer] = useState("");
  const [isImg, setIsImg] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState("");
  const history = useHistory();
  const file = useRef(null);

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    console.log("FILE!!!", file.current.files[0].name);
    const request = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      method: "POST",
      body: JSON.stringify({ fileName, userId }),
    };

    try {
      const response = await fetch(`${API}/signup/userpic`, request);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        setError(data.errorMsg);
        return;
      }
      alert("profil complet!");
      setTimeout(() => {
        history.push({
          pathname: "/feed",
          state: {
            new: true,
          },
        });
      }, 1200);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ transform: "translateX(100%)" }}
      className="h-screen w-screen bg-red-400  flex flex-col items-center justify-center absolute top-0 left-0"
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
          action=""
          method="POST"
          encType="multipart/form-data"
          name="userpic"
          onSubmit={handleImgSubmit}
          className="flex flex-col items-center justify-center gap-2"
        >
          <span> Choisissez votre image de profil</span>
          <label className="bg-red-500 text-white p-2 rounded" htmlFor="file">
            parcourir{" "}
          </label>
          <input
            type="file"
            id="file"
            className="bg-red-500 text-white p-2 rounded hidden"
            ref={file}
            onChange={() => setFileName(file.current.files[0].name)}
          />
          <div>{fileName !== null && fileName}</div>
          <button
            className="bg-red-500 text-white px-4 transform translate-y-2 transition transition-opacity duration-1000"
            style={fileName == null ? { opacity: 0 } : { opacity: 1 }}
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

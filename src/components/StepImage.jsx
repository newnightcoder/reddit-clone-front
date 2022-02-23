import { ChevronDoubleRightIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import bg from "../assets/logo2.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";
import ImgUploader from "./ImgUploader";

const StepImage = () => {
  // const [errorServer, setErrorServer] = useState("");
  // const [blob, setBlob] = useState(null);
  // const [blobName, setBlobName] = useState(null);
  // const file = useRef(null);
  const { id, picUrl } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  const history = useHistory();

  // const handleImgSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("FILE!!!", file.current.files[0]);
  //   dispatch(saveUserPic(blob, id));
  // };

  return (
    <div
      className="h-screen w-screen bg-red-400 flex flex-col items-center justify-evenly absolute top-0 left-0"
      style={{
        transform: "translateX(100%)",
        background: `linear-gradient(rgba(70,70,70,.45), rgba(70,70,70,.45)), url(${bg}) no-repeat center/cover`,
      }}
    >
      <h2 className="text-center font-bold text-lg">
        DERNIÈRE ÉTAPE AVANT DE <br />
        REJOINDRE LA COMMUNAUTÉ!
      </h2>
      {/* <span
        className="w-max h-max whitespace-pre py-2 px-3 text-center border border-red-700 rounded"
        style={errorServer === "" ? { visibility: "hidden" } : { visibility: "visible" }}
      >
        {errorServer !== "" && errorServer}
      </span> */}
      <div className="h-max w-screen flex flex-col items-center gap-2">
        <div
          className="h-48 w-48 rounded-full border border-gray-600"
          style={{
            background: `url(${picUrl !== null ? picUrl : picPlaceholder}) no-repeat center/cover`,
          }}
        ></div>
        {/* <form
          className="flex flex-col items-center justify-center gap-2"
          action=""
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleImgSubmit}
        >
          <span> Choisissez votre image de profil</span>
          <label
            className="w-48 text-center text-white p-2 rounded shadow-xl"
            style={{ backgroundColor: "#ef5350" }}
            htmlFor="file"
          >
            parcourir{" "}
          </label>

          <div className="flex items-center gap-4">
            <input
              className="text-white p-2 rounded hidden"
              style={{ backgroundColor: "#ef5350" }}
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
              {blobName !== null ? blobName : <span className="italic text-xs">Aucune photo choisie pour le moment.</span>}
            </div>
          </div>
          <div className="w-full flex items-center justify-center gap-4">
            <button
              className="text-white p-2 border border-red-500 rounded transform translate-y-2 transition transition-opacity duration-1000 shadow-xl"
              style={blobName == null ? { opacity: 0 } : { opacity: 1, backgroundColor: "#ef5350" }}
            >
              voir l'aperçu
            </button>
            <button
              className="w-max flex items-center gap-1 text-black font-bold border border-black p-2 rounded transform translate-y-2 transition transition-opacity duration-1000 shadow-xl"
              style={
                picUrl === "" ? { opacity: 0, display: "none" } : { opacity: 1, display: "flex", backgroundColor: "#ef5350" }
              }
              onClick={() => {
                setTimeout(() => {
                  history.push("/feed");
                }, 300);
              }}
            >
              c'est bon!{" "}
              <ChevronDoubleRightIcon className="h-4 w-4 text-black font-bold" style={{ transform: "translateY(1px)" }} />
            </button>
          </div>
        </form> */}
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
          plus tard, pas maintenant!{" "}
          <ChevronDoubleRightIcon className="h-4 w-4 text-black" style={{ transform: "translateY(1px)" }} />
        </span>
      </button>
    </div>
  );
};

export default StepImage;

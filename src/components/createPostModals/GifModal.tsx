import { Grid, SearchBar, SearchContext, SearchContextManager } from "@giphy/react-components";
import { XIcon } from "@heroicons/react/solid";
import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { saveGifUrlAction } from "../../store/actions/posts.action";
import { useLanguage, useWindowSize } from "../../utils/hooks";
import { IGifModalProps } from "../react-app-env";

const GifModal = (props: IGifModalProps) => {
  const { pathname } = useLocation();
  const { editId } = useSelector((state) => state.posts);
  const createPostPage = pathname.includes("create");
  const editPostModal = editId.type === "post";

  if (!(createPostPage || editPostModal)) {
    return null;
  } else
    return (
      <div
        style={{ opacity: props.gifModalOpen ? 1 : 0, zIndex: props.gifModalOpen ? 2000 : -1 }}
        className="fixed w-full md:w-2/3 h-full top-0 inset-0 mx-auto flex flex-col items-center justify-center space-y-2 bg-black text-white transition-opacity duration-300"
      >
        <SearchContextManager
          apiKey={process.env.REACT_APP_GIPHY_API_KEY as string}
          theme={{ mode: "dark", smallSearchbarHeight: 35 }}
        >
          <GiphyPicker {...props} />
        </SearchContextManager>
      </div>
    );
};

const GiphyPicker = (props: IGifModalProps) => {
  const { width } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);
  const pickerDiv = ref.current;
  const { fetchGifs, searchKey } = useContext(SearchContext);
  const dispatch = useDispatch();

  const [size, setSize] = useState<DOMRect | null>(null);
  const userLanguage = useLanguage();

  useEffect(() => {
    if (pickerDiv !== null) return setSize(pickerDiv.getBoundingClientRect());
  }, [width]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col items-center justify-start space-y-2 relative overflow-y-scroll overflow-x-hidden"
    >
      <div className="w-full p-2 sticky top-0 z-10 bg-black flex items-center justify-center space-x-2">
        <SearchBar className="w-full bg-red-500 text-white" placeholder={userLanguage.gifModal.search} />
        <button
          className="text-gray-400 text-sm flex items-center justify-center space-x-1"
          onClick={(e) => props.toggleGifModal(e)}
        >
          <span>{userLanguage.gifModal.cancel}</span> <XIcon className="h-4" />
        </button>
      </div>
      {pickerDiv && (
        <Grid
          key={searchKey}
          columns={3}
          width={pickerDiv.getBoundingClientRect().width - 25}
          fetchGifs={fetchGifs}
          noLink={true}
          hideAttribution={true}
          onGifClick={(gif, e) => {
            dispatch(saveGifUrlAction(gif.images.downsized.url));
            props.deletePreview();
            props.toggleGifModal(e);
          }}
        />
      )}
    </div>
  );
};

export default GifModal;

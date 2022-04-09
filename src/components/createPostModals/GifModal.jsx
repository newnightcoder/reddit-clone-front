import { Grid, SearchBar, SearchContext, SearchContextManager } from "@giphy/react-components";
import { XIcon } from "@heroicons/react/solid";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveGifUrl } from "../../store/actions/posts.action";
import { useWindowSize } from "../../utils/hooks";

const GifModal = ({ gifModalOpen, toggleGifModal }) => {
  return (
    <div
      style={{ opacity: gifModalOpen ? 1 : 0, zIndex: gifModalOpen ? 2000 : -1 }}
      className="fixed w-full md:w-2/3 h-full top-0 inset-0 mx-auto flex flex-col items-center justify-center space-y-2 bg-black text-white transition-opacity duration-300"
    >
      <SearchExperience toggleGifModal={toggleGifModal} />
    </div>
  );
};

const SearchExperience = ({ toggleGifModal }) => (
  <SearchContextManager apiKey={process.env.REACT_APP_GIPHY_API_KEY} theme={{ mode: "dark", smallSearchbarHeight: 35 }}>
    <GiphyPicker toggleGifModal={toggleGifModal} />
  </SearchContextManager>
);

const GiphyPicker = ({ toggleGifModal }) => {
  const { height, width } = useWindowSize();
  const ref = useRef();
  const { fetchGifs, searchKey, isFetching } = useContext(SearchContext);
  const dispatch = useDispatch();
  const [size, setSize] = useState(null);
  const [giphyLoaded, setGiphyLoaded] = useState(false);

  const getPickerSize = useCallback(() => {
    setSize(ref.current.getBoundingClientRect());
  }, [width]);

  useEffect(() => {
    if (!size) return setSize(ref.current.getBoundingClientRect());
  }, [width]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col items-center justify-start space-y-2 relative overflow-y-scroll overflow-x-hidden"
    >
      <div className="w-full p-2 sticky top-0 z-10 bg-black flex items-center justify-center space-x-2">
        <SearchBar className="w-full bg-red-500 text-white" placeholder="Rechercher un gif" />
        <button className="text-gray-400 text-sm flex items-center justify-center space-x-1" onClick={(e) => toggleGifModal(e)}>
          <span>Annuler</span> <XIcon className="h-4" />
        </button>
      </div>
      {size && (
        <Grid
          key={searchKey}
          columns={3}
          width={ref.current.getBoundingClientRect().width - 25}
          fetchGifs={fetchGifs}
          noLink={true}
          hideAttribution={true}
          onGifClick={(gif, e) => {
            dispatch(saveGifUrl(gif.images.downsized.url));
            toggleGifModal(e);
          }}
        />
      )}
    </div>
  );
};

export default GifModal;

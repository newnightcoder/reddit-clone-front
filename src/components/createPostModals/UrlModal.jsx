import { Grid, SearchBar, SearchContext, SearchContextManager } from "@giphy/react-components";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { saveLinkUrl } from "../../store/actions/posts.action";
import { useWindowSize } from "../../utils/hooks";

const SearchExperience = ({ toggleUrlInput }) => (
  <SearchContextManager apiKey={process.env.REACT_APP_GIPHY_API_KEY}>
    <GiphyPicker toggleUrlInput={toggleUrlInput} />
  </SearchContextManager>
);

const GiphyPicker = ({ toggleUrlInput }) => {
  const { height, width } = useWindowSize();
  const ref = useRef();
  const { fetchGifs, searchKey, isFetching } = useContext(SearchContext);
  const dispatch = useDispatch();
  // const ref = useRef();
  const [size, setSize] = useState(null);
  const [giphyLoaded, setGiphyLoaded] = useState(false);

  const getPickerSize = () => {
    return setSize(ref.current.getBoundingClientRect());
  };

  useEffect(() => {
    console.log(ref.current.getBoundingClientRect());
    if (!size) return setSize(ref.current.getBoundingClientRect());
    ref.current.addEventListener("resize", getPickerSize);
    return ref.current.removeEventListener("resize", getPickerSize);
  }, [width]);

  return (
    <div
      ref={ref}
      className="h-full w-full flex flex-col items-center justify-start space-y-2 relative overflow-y-scroll overflow-x-hidden"
    >
      <div className="w-full p-2 sticky top-0 z-10 bg-black">
        <SearchBar className="w-full" placeholder="Rechercher un gif" />
      </div>
      {size && (
        <Grid
          key={searchKey}
          columns={3}
          width={size.width - 25}
          fetchGifs={fetchGifs}
          noLink={true}
          hideAttribution={true}
          onGifClick={(gif, e) => {
            dispatch(saveLinkUrl(gif.images.downsized.url));
            toggleUrlInput(e);
          }}
        />
      )}
    </div>
  );
};

const UrlModal = ({ urlModalOpen, toggleUrlInput }) => {
  return (
    <div
      style={{ opacity: urlModalOpen ? 1 : 0, zIndex: urlModalOpen ? 2000 : -1 }}
      className="fixed w-full md:w-2/3 h-full top-0 inset-0 mx-auto flex flex-col items-center justify-center space-y-2 bg-black text-white transition-opacity duration-300"
    >
      <SearchExperience toggleUrlInput={toggleUrlInput} />
    </div>
  );
};

export default UrlModal;

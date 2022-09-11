import { SearchIcon, XIcon } from "@heroicons/react/solid";
import { useCallback, useEffect, useRef, useState } from "react";
import { Power } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { picPlaceholder } from "../../assets";
import { setSearchQueryAction } from "../../store/actions/user.action";
import { breakpoint } from "../../utils/breakpoints";
import { fromCDN, history } from "../../utils/helpers";
import { useHandleLink, useLanguage, useToggle, useWindowSize } from "../../utils/hooks";

const NavBar = ({ toggleMenu }: { toggleMenu: () => void }) => {
  const { width } = useWindowSize();
  const { isAuthenticated, picUrl, username, id, darkMode } = useSelector((state) => state.user);
  const handleLink = useHandleLink();
  const userLanguage = useLanguage();
  const searchBarRef = useRef<HTMLFormElement | null>(null);
  const searchFilterRef = useRef<HTMLDivElement | null>(null);
  const [searchBarRect, setSearchBarRect] = useState<DOMRect | null>(null);
  const [searchFilterRect, setSearchFilterRect] = useState<DOMRect | null>(null);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);
  const toggleSearchMenu = useToggle(searchMenuOpen, setSearchMenuOpen);
  const [searchFilter, setSearchFilter] = useState<string | null>(null);
  const activeStates = ["user", "post"];
  const [active, setActive] = useState("");
  const searchRef = useRef<HTMLInputElement | null>(null);
  const [isSearchText, setIsSearchText] = useState(false);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const searchPage = pathname === "/search";
  const searchPageMobile = searchPage && width < breakpoint.md;

  useEffect(() => {
    if (searchBarRef.current) {
      setSearchBarRect(searchBarRef?.current?.getBoundingClientRect());
    }
  }, [searchBarRef]);

  useEffect(() => {
    if (searchFilterRef.current) {
      setSearchFilterRect(searchFilterRef?.current?.getBoundingClientRect());
    }
  }, [searchFilterRef, active]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (searchBarRef.current) setSearchBarRect(searchBarRef?.current?.getBoundingClientRect());
    });
    return () => window.removeEventListener("resize", () => setSearchBarRect(searchBarRef!.current!.getBoundingClientRect()));
  }, [searchBarRef]);

  const handleChange = useCallback(() => {
    setIsSearchText(true);
    if (searchRef?.current?.value === "") {
      setIsSearchText(false);
    }
  }, [setIsSearchText, searchRef]);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchRef?.current?.value !== "") {
        dispatch(setSearchQueryAction(searchRef?.current?.value!, searchFilter!));
      } else history.push("/search");
      if (!searchPage) return history.push("/search");
      if (searchMenuOpen) return toggleSearchMenu();
    },
    [searchRef, searchFilter, searchPage, searchMenuOpen, dispatch, toggleSearchMenu]
  );

  return (
    <div className={`h-16 w-full fixed top-0 z-[1000] shadow-md flex items-center justify-start`}>
      <div
        className={`overflow-hidden h-full w-full pr-4 pl-0 md:pl-2 flex items-center justify-between md:justify-evenly space-x-3 md:space-x-2 transition duration-500 dark:text-white bg-gray-100 dark:bg-gray-900 border-b border-transparent dark:border-gray-700`}
      >
        <NavLink
          to="/feed"
          className={`${searchPageMobile ? "w-min ml-4" : "w-36  mr-2"} h-[70%] flex items-center justify-center md:ml-3`}
          style={{
            transform: searchPageMobile ? "translateY(0)" : width < breakpoint.md ? "translateY(-3px)" : "translateY(-5px)",
          }}
        >
          {searchPageMobile ? (
            <svg className="h-5/6" viewBox="0 0 425 489" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M422.42 1.68199C408.838 -11.891 245.511 58.857 168.826 135.548C100.613 203.761 65.231 281.579 81.485 321.245C43.083 374.095 15.727 425.891 0.866028 488.969C42.102 433.52 62.826 380.638 251.486 173.53C239.185 190.115 181.703 256.685 132.465 346.195C174.819 342.503 234.675 309.153 288.553 255.283C365.245 178.591 435.992 15.263 422.42 1.68199Z"
                fill="#60A5FA"
              />
            </svg>
          ) : (
            <svg
              className="h-5/6 md:h-full transition duration-300"
              width="332"
              height="127"
              viewBox="0 0 332 127"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.966 113.75C8.686 113.75 7.758 113.462 7.182 112.886C6.67 112.31 6.414 111.446 6.414 110.294V52.022C6.414 50.806 6.67 49.91 7.182 49.334C7.758 48.758 8.686 48.47 9.966 48.47H49.902C51.182 48.47 52.046 48.726 52.494 49.238C53.006 49.75 53.262 50.614 53.262 51.83V54.422C53.262 55.638 53.006 56.534 52.494 57.11C52.046 57.622 51.182 57.878 49.902 57.878H18.702V76.406H41.358C42.638 76.406 43.534 76.662 44.046 77.174C44.558 77.686 44.814 78.55 44.814 79.766V82.358C44.814 83.574 44.558 84.47 44.046 85.046C43.534 85.558 42.638 85.814 41.358 85.814H18.702V110.294C18.702 111.446 18.414 112.31 17.838 112.886C17.326 113.462 16.398 113.75 15.054 113.75H9.966ZM87.3885 115.19C76.8285 115.19 68.7005 112.214 63.0045 106.262C57.3725 100.31 54.5565 91.926 54.5565 81.11C54.5565 70.294 57.3725 61.91 63.0045 55.958C68.7005 50.006 76.8285 47.03 87.3885 47.03C97.8845 47.03 105.981 50.006 111.677 55.958C117.373 61.91 120.221 70.294 120.221 81.11C120.221 91.926 117.373 100.31 111.677 106.262C105.981 112.214 97.8845 115.19 87.3885 115.19ZM87.3885 106.166C94.1085 106.166 99.2285 104.054 102.749 99.83C106.269 95.542 108.029 89.302 108.029 81.11C108.029 72.918 106.269 66.71 102.749 62.486C99.2285 58.262 94.1085 56.15 87.3885 56.15C80.6685 56.15 75.5165 58.262 71.9325 62.486C68.4125 66.71 66.6525 72.918 66.6525 81.11C66.6525 89.302 68.4125 95.542 71.9325 99.83C75.5165 104.054 80.6685 106.166 87.3885 106.166ZM133.154 113.75C131.874 113.75 130.946 113.462 130.37 112.886C129.858 112.31 129.602 111.446 129.602 110.294V52.022C129.602 50.806 129.858 49.91 130.37 49.334C130.946 48.758 131.874 48.47 133.154 48.47H158.21C165.634 48.47 171.266 50.198 175.106 53.654C179.01 57.11 180.962 62.23 180.962 69.014C180.962 73.494 179.906 77.334 177.794 80.534C175.682 83.67 172.61 86.038 168.578 87.638L179.234 111.254C179.426 111.638 179.522 111.99 179.522 112.31C179.522 113.27 178.946 113.75 177.794 113.75H169.922C169.09 113.75 168.482 113.654 168.098 113.462C167.714 113.206 167.362 112.726 167.042 112.022L157.346 89.27H141.89V110.294C141.89 111.446 141.602 112.31 141.026 112.886C140.514 113.462 139.586 113.75 138.242 113.75H133.154ZM155.714 80.054C160.194 80.054 163.49 79.19 165.602 77.462C167.714 75.734 168.77 72.918 168.77 69.014C168.77 65.174 167.81 62.358 165.89 60.566C163.97 58.774 161.058 57.878 157.154 57.878H141.89V80.054H155.714ZM219.056 115.19C213.296 115.19 208.208 114.23 203.792 112.31C199.376 110.326 195.952 107.478 193.52 103.766C191.088 100.054 189.872 95.702 189.872 90.71V52.022C189.872 50.806 190.128 49.91 190.64 49.334C191.216 48.758 192.144 48.47 193.424 48.47H198.512C199.792 48.47 200.72 48.758 201.296 49.334C201.872 49.91 202.16 50.806 202.16 52.022V90.998C202.16 95.99 203.6 99.766 206.48 102.326C209.424 104.886 213.616 106.166 219.056 106.166C224.432 106.166 228.56 104.886 231.44 102.326C234.384 99.766 235.856 95.99 235.856 90.998V52.022C235.856 50.806 236.144 49.91 236.72 49.334C237.296 48.758 238.224 48.47 239.504 48.47H244.496C246.992 48.47 248.24 49.654 248.24 52.022V90.71C248.24 95.702 246.992 100.054 244.496 103.766C242.064 107.414 238.64 110.23 234.224 112.214C229.808 114.198 224.752 115.19 219.056 115.19ZM262.622 113.75C261.342 113.75 260.414 113.462 259.838 112.886C259.326 112.31 259.07 111.446 259.07 110.294V52.022C259.07 50.806 259.326 49.91 259.838 49.334C260.414 48.758 261.374 48.47 262.718 48.47H267.902C268.926 48.47 269.694 48.598 270.206 48.854C270.782 49.11 271.23 49.622 271.55 50.39L290.942 95.03L310.334 50.39C310.654 49.622 311.07 49.11 311.582 48.854C312.158 48.598 312.958 48.47 313.982 48.47H319.166C320.51 48.47 321.438 48.758 321.95 49.334C322.526 49.91 322.814 50.806 322.814 52.022V110.294C322.814 111.446 322.526 112.31 321.95 112.886C321.438 113.462 320.542 113.75 319.262 113.75H315.038C313.758 113.75 312.83 113.462 312.254 112.886C311.678 112.31 311.39 111.446 311.39 110.294V68.918L294.974 105.494C294.462 106.518 293.95 107.254 293.438 107.702C292.926 108.15 292.094 108.374 290.942 108.374C289.79 108.374 288.926 108.15 288.35 107.702C287.838 107.254 287.358 106.518 286.91 105.494L270.494 68.918V110.294C270.494 111.446 270.206 112.31 269.63 112.886C269.118 113.462 268.19 113.75 266.846 113.75H262.622Z"
                fill={darkMode ? "white" : "black"}
                className="transition-colors duration-300"
              />
              <g clipPath="url(#clip0_147_24)">
                <path
                  d="M264.761 0.956388C263.094 -0.709116 243.053 7.97217 233.643 17.3827C225.273 25.7529 220.931 35.3018 222.925 40.1691C218.213 46.6541 214.856 53.0099 213.033 60.75C218.093 53.946 220.636 47.457 243.786 22.0434C242.276 24.0785 235.223 32.2471 229.181 43.2306C234.378 42.7776 241.723 38.6853 248.334 32.0751C257.745 22.6644 266.426 2.62287 264.761 0.956388Z"
                  fill="#60A5FA"
                />
              </g>
              <defs>
                <clipPath id="clip0_147_24">
                  <rect width="60" height="60" fill="white" transform="translate(209 0.75)" />
                </clipPath>
              </defs>
            </svg>
          )}
        </NavLink>

        <form
          ref={searchBarRef}
          className={`${searchPage || width > breakpoint.md ? "flex" : "hidden"} relative group ${
            searchPageMobile ? "w-full" : "w-2/3"
          } max-w-xl 2xl:max-w-5xl items-center justify-center rounded-l-full`}
          action="post"
          onSubmit={(e) => handleSearchSubmit(e)}
        >
          <div className="input-wrapper relative h-10 w-full rounded-l-full">
            <input
              onClick={toggleSearchMenu}
              style={{ paddingLeft: searchFilterRect ? `calc(${searchFilterRect.width}px + 0.3rem)` : "0.75rem" }}
              className="h-full w-full rounded-l-full outline-none  pr-8 text-black dark:text-gray-100 dark:placeholder-gray-200 
              dark:bg-gray-600 text-sm lg:text-md transition-all duration-300 border border-t border-b border-l  border-gray-400 
              dark:border-gray-700 group-hover:border-gray-400 dark:group-hover:border-gray-400 focus:border-gray-400 dark:focus:border-gray-400"
              type="search"
              placeholder={
                searchPageMobile && searchFilter
                  ? userLanguage.navbar.searchPlaceholderMobile
                  : userLanguage.navbar.searchPlaceholder
              }
              ref={searchRef}
              onChange={handleChange}
              onFocus={() => setIsSearchFocus(true)}
              onBlur={() => setIsSearchFocus(false)}
            />
            <button
              type="button"
              className={`${
                isSearchText ? "flex" : "hidden"
              } items-center justify-center outline-none text-black dark:text-white h-4 absolute right-4 top-5 -translate-y-1/2`}
              onClick={() => {
                if (searchRef.current) {
                  searchRef.current.value = "";
                  setIsSearchText(false);
                }
              }}
            >
              <XIcon className="h-full pointer-events-none" />
            </button>
            {searchFilter && (
              <div
                ref={searchFilterRef}
                style={{ width: searchFilterRect ? `${searchFilterRect.width}}px` : "max-content" }}
                className="h-full w-max px-4 flex items-center justify-center text-sm text-white bg-black dark:bg-blue-400 absolute top-0 left-0 rounded-l-full capitalize"
              >
                {searchFilter}:
              </div>
            )}
          </div>
          <button
            type="submit"
            className={`w-10 h-10 outline-none rounded-r-full bg-black dark:bg-gray-700 flex items-center justify-center transition-colors duration-300 border-t border-b border-r group-hover:border-gray-400 dark:group-hover:border-gray-400 ${
              isSearchFocus ? "border-gray-400" : "border-transparent "
            }`}
          >
            <SearchIcon className="h-5 w-5 text-white pointer-events-none" />
          </button>
          <div
            style={{
              width: searchBarRect && searchPageMobile ? "95%" : searchBarRect ? `calc(${searchBarRect.width}px - 2.5rem)` : "0",
              opacity: searchBarRect ? 1 : 0,
              left: searchBarRect && !searchPageMobile ? `calc(${searchBarRect.x}px + 0.25rem)` : "",
            }}
            className={`${
              searchMenuOpen && searchPageMobile
                ? "h-24 flex flex-col items-center justify-between mx-auto px-2 py-4"
                : searchMenuOpen
                ? "flex items-center justify-center space-x-7 p-6 z-50"
                : "hidden"
            } fixed top-[3.3rem] h-max bg-black dark:bg-gray-500 rounded-md text-white`}
          >
            <span className="w-max text-sm text-gray-200 whitespace-nowrap underline"> {userLanguage.search.searchBy}</span>
            <div className="h-max w-max flex items-center justify-center space-x-5">
              <button
                data-active={activeStates[0]}
                onClick={() => {
                  setSearchFilter(userLanguage.search.user);
                  setActive("user");
                }}
                type="button"
                className={`${
                  active === "user" ? "bg-blue-400 text-white shadow-none border-transparent" : " text-gray-200"
                } w-max py-1 px-3 text-center text-sm hover:text-white font-bold uppercase shadow-md hover:bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none border-2 hover:border-transparent`}
              >
                {userLanguage.search.user}
              </button>
              <button
                data-active={activeStates[1]}
                onClick={() => {
                  setSearchFilter(userLanguage.search.post);
                  setActive("post");
                }}
                type="button"
                className={`${
                  active === "pub" ? "bg-blue-400 text-white shadow-none border-transparent" : " text-gray-200"
                } w-max py-1 px-3 text-center text-sm hover:text-white font-bold uppercase shadow-md hover:bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none border-2 hover:border-transparent`}
              >
                {userLanguage.search.post}
              </button>
              <button
                onClick={() => {
                  setSearchFilter(null);
                  setSearchFilterRect(null);
                  setActive("");
                  setSearchMenuOpen(false);
                }}
                type="button"
                className={`${
                  searchPageMobile ? "absolute top-1 right-1" : "relative"
                } h-max w-max hover:bg-gray-700 rounded-full transition-colors duration-300`}
              >
                <span
                  className={`py-1 ${
                    searchPageMobile ? "px-1" : "px-3"
                  } flex items-center justify-center text-xs text-gray-200 underline hover:text-white font-bold uppercase`}
                >
                  <span className={`${searchPageMobile ? "hidden" : "inline-block"}`}>{userLanguage.search.cancel}</span>
                  <XIcon className={`${searchPageMobile ? "inline-block" : "hidden"} h-4 text-white`} />
                </span>
              </button>
            </div>
          </div>
        </form>

        <button
          tabIndex={0}
          className="md:hidden w-max flex flex-col items-center justify-center -space-y-0.5 outline-none bg-transparent transform translate-y-px md:transform-none"
          onClick={() => toggleMenu()}
        >
          <div
            className="rounded-full border border-gray-600 relative"
            style={{
              background: picUrl
                ? `url("${fromCDN(picUrl)}") no-repeat center/cover`
                : `url("${picPlaceholder}") no-repeat center/cover`,
              height: isAuthenticated ? "2.5rem" : "2rem",
              width: isAuthenticated ? "2.5rem" : "2rem",
            }}
          >
            <div className="h-3 w-3 rounded-full z-40 absolute -bottom-px -right-px bg-green-500 border-2 border-gray-100"></div>
          </div>
          {!isAuthenticated && (
            <span className="text-gray-900 dark:text-gray-100 whitespace-nowrap text-xs transform translate-y-1 italic">
              {userLanguage.navbar.visitor}
            </span>
          )}
        </button>

        <div className="hidden w-max md:flex items-center justify-evenly space-x-6 transition-color duration-500 text-black dark:text-gray-100">
          <button
            tabIndex={0}
            className="hidden md:flex items-center justify-center space-x-2 outline-none bg-transparent "
            onClick={() => handleLink("navbar-profile", id!, username)}
          >
            <div
              className="w-10 h-10 rounded-full border border-gray-600"
              style={
                picUrl
                  ? {
                      background: `url(${fromCDN(picUrl)}) no-repeat center/cover`,
                    }
                  : {
                      background: `url(${picPlaceholder}) no-repeat center/cover`,
                    }
              }
            ></div>
            <div className="flex flex-col items-start">
              {isAuthenticated && <span className="text-xs underline whitespace-nowrap">{userLanguage.navbar.connected}</span>}
              <span className="capitalize font-bold whitespace-nowrap max-w-[10ch] md:max-w-[15ch] overflow-x-hidden overflow-ellipsis pr-1">
                {isAuthenticated && username ? username : isAuthenticated && !username ? "Noname" : userLanguage.navbar.visitor}
              </span>
            </div>
          </button>
          <div className="hidden lg:flex items-center justify-center space-x-4">
            {isAuthenticated ? (
              <button
                tabIndex={0}
                className="hidden w-24 xl:flex items-center justify-center space-x-1 outline-none bg-transparent transform translate-x-8 hover:underline hover:font-bold"
                onClick={() => history.push("/")}
              >
                <span className="capitalize">{userLanguage.navbar.logout}</span> <Power size={18} className="font-bold" />
              </button>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="w-max py-2 px-3 text-center text-sm text-white font-bold capitalize shadow rounded-full transition duration-300 hover:shadow-none bg-[#ff4500] hover:bg-blue-500"
                >
                  {userLanguage.homepage.registerBtn}
                </Link>
                <button
                  onClick={() => handleLink("navbar-login")}
                  className="w-max py-2 px-3 text-center text-sm text-white font-bold capitalize shadow bg-blue-400 rounded-full transition duration-300 hover:shadow-none hover:bg-blue-500"
                >
                  {userLanguage.homepage.connectBtn}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

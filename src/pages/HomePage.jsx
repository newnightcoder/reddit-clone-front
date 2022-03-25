import React, { useEffect } from "react";
import { ThreeDots } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { logo, phonesImg } from "../assets";
import { persistor } from "../store/storeConfig";
import useLanguage from "../utils/hooks/useLanguage";
import useToggleSettings from "../utils/hooks/useToggleSettings";

const Homepage = () => {
  const [userLangData, setLanguage] = useLanguage();
  // const [settingsOpen, setSettingsOpen] = useState(false);

  // const toggleOptionsMenu = () => {
  //   return setSettingsOpen((prevState) => !prevState);
  // };

  const { settingsOpen, toggleSettings } = useToggleSettings();

  useEffect(() => {
    persistor.purge();
  }, []);

  return (
    <div
      className="min-h-screen w-full relative bg-gray-200 flex flex-col items-center justify-center"
      style={{ color: "#5e5e5e" }}
    >
      <button
        className="h-8 w-8 absolute top-5 right-10 flex items-center justify-center rounded-full tracking-widest font-bold text-2xl transition duration-300 hover:bg-gray-300"
        onClick={toggleSettings}
      >
        <ThreeDots />
      </button>
      {/* <Settings setLanguage={setLanguage} userLangData={userLangData} settingsOpen={settingsOpen} /> */}
      <div className="h-full w-full flex items-center justify-center">
        <div className="hidden h-full w-1/2 md:flex items-center justify-center lg:justify-end">
          <img src={phonesImg} alt="mobile phones" className="w-3/5 transform translate-y-10" />
        </div>
        <div className="h-full w-full md:w-1/2 flex flex-col items-center justify-center space-y-10">
          <div className="w-full flex flex-col items-center justify-center space-y-4">
            <header>
              <img src={logo} alt="" className="h-24" />
            </header>
            <p className="w-3/4 text-sm text-center px-2">{userLangData.homepage.introText}</p>
          </div>
          <div className="w-full flex flex-col items-center justify-center space-y-5">
            <div className="w-full flex flex-col items-center">
              <h2 className="uppercase">{userLangData.homepage.connectLbl}?</h2>
              <Link
                to="/login"
                className="w-60 py-2 text-center text-white font-bold uppercase shadow-xl bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
              >
                {userLangData?.homepage.connectBtn}
              </Link>
            </div>
            <div className="w-full flex flex-col items-center">
              <h2 className="uppercase">{userLangData?.homepage.registerLbl}?</h2>
              <Link
                to="/signup"
                className="w-60 py-2 text-center text-white font-bold uppercase shadow-xl bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
              >
                {userLangData?.homepage.registerBtn}
              </Link>
            </div>
            <div className="w-full flex flex-col items-center">
              <h2 className="uppercase">{userLangData?.homepage.exploreLbl}?</h2>
              <Link
                to="/feed"
                className="w-60 py-2 text-center text-white font-bold uppercase shadow-xl bg-blue-400 rounded-full transition-all duration-300 hover:shadow-none hover:bg-blue-500"
              >
                {userLangData?.homepage.exploreBtn}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center space-y-6">
        <div className="flex flex-col items-center justify-center space-y-3">
          <span className="text-sm">{userLangData?.homepage.download}</span>
          <div className="flex items-center justify-center space-x-2">
            <svg width="151" height="51" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:cursor-pointer">
              <path
                d="M138.555.664H12.452c-.46 0-.914 0-1.372.003-.384.002-.765.01-1.152.016a16.61 16.61 0 0 0-2.512.22c-.83.14-1.633.405-2.383.784a8.07 8.07 0 0 0-3.506 3.5 8.235 8.235 0 0 0-.783 2.379C.604 8.393.529 9.23.519 10.07c-.012.383-.013.767-.019 1.15v28.893c.006.389.007.764.019 1.153.01.838.085 1.675.225 2.502a8.22 8.22 0 0 0 .783 2.38 7.76 7.76 0 0 0 1.477 2.018 7.865 7.865 0 0 0 2.029 1.474c.75.38 1.553.646 2.383.788.83.136 1.67.21 2.512.221.387.009.768.014 1.152.014.458.002.912.002 1.372.002h126.103c.45 0 .908 0 1.359-.002.382 0 .773-.005 1.155-.014.84-.01 1.678-.084 2.507-.22a8.54 8.54 0 0 0 2.392-.79 7.85 7.85 0 0 0 2.027-1.473 8.007 8.007 0 0 0 1.482-2.017 8.26 8.26 0 0 0 .776-2.38c.139-.828.217-1.665.232-2.503.005-.389.005-.764.005-1.153.01-.454.01-.905.01-1.367v-26.16c0-.458 0-.913-.01-1.365 0-.384 0-.768-.005-1.152a16.93 16.93 0 0 0-.232-2.502 8.284 8.284 0 0 0-.776-2.38 8.095 8.095 0 0 0-3.509-3.499 8.492 8.492 0 0 0-2.392-.784 16.388 16.388 0 0 0-2.507-.22c-.382-.007-.773-.014-1.155-.016-.451-.003-.909-.003-1.359-.003z"
                fill="#A6A6A6"
              ></path>
              <path
                d="M11.004 49.662c-.383 0-.756-.005-1.136-.014-.786-.01-1.57-.079-2.346-.205a7.385 7.385 0 0 1-2.079-.687A6.784 6.784 0 0 1 3.69 47.48a6.677 6.677 0 0 1-1.281-1.752 7.18 7.18 0 0 1-.682-2.08 15.575 15.575 0 0 1-.209-2.352C1.51 41.03 1.5 40.15 1.5 40.15V11.162s.011-.867.018-1.122c.01-.787.08-1.573.208-2.35.12-.725.35-1.429.682-2.085a6.743 6.743 0 0 1 1.274-1.754 6.985 6.985 0 0 1 1.76-1.283 7.31 7.31 0 0 1 2.076-.683 15.8 15.8 0 0 1 2.354-.206l1.132-.015H139.99l1.146.016c.781.01 1.561.077 2.332.204.73.124 1.436.356 2.097.687a7.022 7.022 0 0 1 3.032 3.037 7.22 7.22 0 0 1 .671 2.07c.131.782.203 1.574.218 2.367.004.356.004.738.004 1.117.01.47.01.919.01 1.37v26.262c0 .456 0 .901-.01 1.35 0 .408 0 .782-.005 1.166-.014.78-.086 1.557-.214 2.326a7.2 7.2 0 0 1-.678 2.096 6.875 6.875 0 0 1-1.275 1.739 6.79 6.79 0 0 1-1.756 1.283 7.358 7.358 0 0 1-2.094.69c-.775.126-1.56.195-2.346.204-.367.009-.752.014-1.126.014l-1.361.002-127.631-.002z"
                fill="#000"
              ></path>
              <path
                d="M31.549 26.21c.013-1.05.29-2.08.807-2.993a6.218 6.218 0 0 1 2.146-2.231A6.332 6.332 0 0 0 29.5 18.27c-2.104-.222-4.145 1.264-5.218 1.264-1.093 0-2.745-1.242-4.523-1.206a6.644 6.644 0 0 0-3.254.975 6.677 6.677 0 0 0-2.353 2.458c-2.424 4.214-.616 10.406 1.707 13.812 1.161 1.668 2.52 3.531 4.296 3.465 1.739-.072 2.388-1.113 4.487-1.113 2.08 0 2.688 1.113 4.501 1.071 1.866-.03 3.041-1.675 4.162-3.359a13.818 13.818 0 0 0 1.904-3.891 6 6 0 0 1-2.66-2.215 6.034 6.034 0 0 1-1-3.321zM28.124 16.031a6.147 6.147 0 0 0 1.397-4.392 6.206 6.206 0 0 0-4.02 2.088 5.84 5.84 0 0 0-1.434 4.23 5.121 5.121 0 0 0 4.057-1.926zM53.528 34.817h-5.934l-1.425 4.224h-2.513l5.62-15.627h2.611l5.62 15.627h-2.556l-1.423-4.224zm-5.32-1.949h4.704l-2.319-6.855h-.064l-2.32 6.855zM69.644 33.346c0 3.54-1.888 5.815-4.737 5.815a3.835 3.835 0 0 1-2.07-.482 3.856 3.856 0 0 1-1.5-1.511h-.054v5.643h-2.33V27.649h2.255v1.895h.043a4.014 4.014 0 0 1 3.614-2.014c2.88 0 4.779 2.285 4.779 5.816zm-2.395 0c0-2.307-1.187-3.823-2.999-3.823-1.78 0-2.977 1.548-2.977 3.823 0 2.295 1.197 3.833 2.977 3.833 1.812 0 3-1.506 3-3.833zM82.136 33.346c0 3.54-1.888 5.815-4.736 5.815a3.834 3.834 0 0 1-2.071-.482 3.855 3.855 0 0 1-1.5-1.511h-.054v5.643h-2.33V27.649H73.7v1.895h.043a4.014 4.014 0 0 1 3.614-2.014c2.88 0 4.779 2.285 4.779 5.816zm-2.395 0c0-2.307-1.187-3.823-2.999-3.823-1.78 0-2.977 1.548-2.977 3.823 0 2.295 1.197 3.833 2.977 3.833 1.812 0 3-1.506 3-3.833zM90.392 34.688c.173 1.55 1.673 2.567 3.722 2.567 1.963 0 3.376-1.018 3.376-2.415 0-1.213-.852-1.94-2.87-2.437l-2.017-.488c-2.858-.693-4.185-2.035-4.185-4.213 0-2.696 2.34-4.548 5.664-4.548 3.29 0 5.544 1.852 5.62 4.548H97.35c-.14-1.559-1.424-2.5-3.301-2.5-1.877 0-3.16.952-3.16 2.338 0 1.105.82 1.755 2.826 2.253l1.715.422c3.194.759 4.52 2.047 4.52 4.332 0 2.924-2.32 4.755-6.009 4.755-3.452 0-5.783-1.788-5.933-4.615h2.385zM104.975 24.953v2.696h2.158v1.852h-2.158v6.281c0 .976.432 1.43 1.381 1.43.256-.004.512-.022.766-.054V39a6.37 6.37 0 0 1-1.294.108c-2.297 0-3.194-.866-3.194-3.075v-6.53h-1.65v-1.853h1.65v-2.696h2.341zM108.383 33.345c0-3.585 2.103-5.837 5.382-5.837 3.291 0 5.384 2.252 5.384 5.837 0 3.595-2.082 5.837-5.384 5.837-3.3 0-5.382-2.242-5.382-5.837zm8.392 0c0-2.459-1.122-3.91-3.01-3.91-1.887 0-3.009 1.462-3.009 3.91 0 2.469 1.122 3.91 3.009 3.91 1.888 0 3.01-1.441 3.01-3.91zM121.07 27.648h2.222v1.94h.054c.15-.606.504-1.141 1.001-1.516a2.7 2.7 0 0 1 1.729-.543c.268 0 .536.029.798.088v2.187a3.245 3.245 0 0 0-1.047-.141 2.34 2.34 0 0 0-1.814.75 2.357 2.357 0 0 0-.613 1.87v6.759h-2.33V27.648zM137.616 35.695c-.313 2.068-2.319 3.487-4.886 3.487-3.302 0-5.351-2.22-5.351-5.783 0-3.573 2.06-5.891 5.253-5.891 3.14 0 5.114 2.165 5.114 5.62v.8h-8.016v.142a2.98 2.98 0 0 0 .801 2.305 2.954 2.954 0 0 0 2.252.922 2.562 2.562 0 0 0 2.621-1.602h2.212zm-7.875-3.4h5.674a2.752 2.752 0 0 0-.762-2.057 2.734 2.734 0 0 0-2.021-.835 2.863 2.863 0 0 0-2.046.841 2.895 2.895 0 0 0-.845 2.05zM47.916 11.651a3.297 3.297 0 0 1 2.64 1.03 3.324 3.324 0 0 1 .88 2.701c0 2.399-1.292 3.778-3.52 3.778h-2.701V11.65h2.701zm-1.54 6.447h1.41a2.343 2.343 0 0 0 1.874-.761 2.364 2.364 0 0 0 .593-1.94 2.375 2.375 0 0 0-.602-1.926 2.358 2.358 0 0 0-1.864-.759h-1.41v5.386zM52.747 16.325a2.694 2.694 0 0 1 .683-2.061 2.676 2.676 0 0 1 1.979-.88 2.665 2.665 0 0 1 1.979.88 2.685 2.685 0 0 1 .683 2.06 2.695 2.695 0 0 1-.681 2.065 2.675 2.675 0 0 1-1.981.88 2.665 2.665 0 0 1-1.98-.88 2.687 2.687 0 0 1-.682-2.064zm4.178 0c0-1.228-.55-1.947-1.514-1.947-.969 0-1.513.719-1.513 1.947 0 1.238.544 1.95 1.513 1.95.964 0 1.514-.717 1.514-1.95zM65.147 19.16h-1.155l-1.167-4.173h-.088l-1.162 4.174h-1.144l-1.556-5.667h1.13l1.011 4.324h.083l1.16-4.324h1.07l1.16 4.324h.088l1.006-4.324h1.114l-1.55 5.667zM68.008 13.494h1.072v.9h.083a1.695 1.695 0 0 1 1.685-1.01 1.83 1.83 0 0 1 1.481.583 1.844 1.844 0 0 1 .473 1.525v3.668h-1.114v-3.387c0-.91-.395-1.364-1.219-1.364a1.29 1.29 0 0 0-1.287.884c-.06.178-.08.366-.06.552v3.315h-1.114v-5.666zM74.574 11.281h1.114v7.879h-1.114V11.28zM77.24 16.325a2.695 2.695 0 0 1 .682-2.061 2.674 2.674 0 0 1 1.98-.88 2.666 2.666 0 0 1 1.978.88 2.687 2.687 0 0 1 .684 2.06 2.696 2.696 0 0 1-.682 2.065 2.676 2.676 0 0 1-1.98.881 2.666 2.666 0 0 1-1.981-.88 2.687 2.687 0 0 1-.682-2.065zm4.177 0c0-1.228-.55-1.947-1.514-1.947-.969 0-1.513.719-1.513 1.947 0 1.238.545 1.95 1.513 1.95.964 0 1.514-.717 1.514-1.95zM83.734 17.558c0-1.02.757-1.608 2.1-1.691l1.529-.089v-.49c0-.598-.394-.936-1.156-.936-.622 0-1.053.23-1.176.63h-1.079c.114-.973 1.026-1.597 2.306-1.597 1.416 0 2.214.707 2.214 1.904v3.872h-1.073v-.797h-.088a1.902 1.902 0 0 1-1.695.89 1.698 1.698 0 0 1-1.316-.429 1.713 1.713 0 0 1-.566-1.267zm3.629-.484V16.6l-1.379.089c-.777.052-1.13.317-1.13.817 0 .51.441.807 1.047.807a1.324 1.324 0 0 0 1.321-.726c.08-.16.129-.334.14-.513zM89.938 16.324c0-1.79.916-2.925 2.343-2.925a1.855 1.855 0 0 1 1.73.994h.084v-3.112h1.114v7.879H94.14v-.896h-.088a1.963 1.963 0 0 1-1.772.99c-1.436 0-2.344-1.135-2.344-2.93zm1.15 0c0 1.202.565 1.925 1.508 1.925.94 0 1.52-.733 1.52-1.92 0-1.181-.587-1.925-1.52-1.925-.937 0-1.508.728-1.508 1.92zM99.817 16.325a2.693 2.693 0 0 1 1.58-2.71 2.668 2.668 0 0 1 3.619 1.607c.118.355.161.73.125 1.103a2.703 2.703 0 0 1-.681 2.064 2.68 2.68 0 0 1-1.981.88 2.665 2.665 0 0 1-1.981-.88 2.7 2.7 0 0 1-.68-2.064zm4.178 0c0-1.228-.549-1.947-1.514-1.947-.968 0-1.513.719-1.513 1.947 0 1.238.545 1.95 1.513 1.95.965 0 1.514-.717 1.514-1.95zM106.637 13.494h1.072v.9h.083a1.684 1.684 0 0 1 1.685-1.01 1.833 1.833 0 0 1 1.89 1.291c.082.264.104.543.063.817v3.668h-1.114v-3.387c0-.91-.394-1.364-1.218-1.364a1.288 1.288 0 0 0-1.002.407 1.308 1.308 0 0 0-.345 1.03v3.314h-1.114v-5.666zM117.722 12.082v1.437h1.223v.942h-1.223v2.913c0 .594.244.854.798.854.142 0 .284-.01.425-.026v.931c-.2.036-.403.056-.606.058-1.239 0-1.732-.438-1.732-1.53v-3.2h-.896v-.942h.896v-1.437h1.115zM120.469 11.281h1.104v3.123h.088a1.741 1.741 0 0 1 1.721-1.015 1.856 1.856 0 0 1 1.874 1.301c.083.262.106.539.07.811v3.659h-1.115v-3.383c0-.905-.42-1.363-1.207-1.363a1.314 1.314 0 0 0-1.348.87c-.065.18-.09.374-.073.566v3.31h-1.114V11.28zM131.819 17.63a2.298 2.298 0 0 1-.926 1.266c-.447.3-.985.432-1.519.374a2.552 2.552 0 0 1-1.978-.856 2.57 2.57 0 0 1-.63-2.069 2.623 2.623 0 0 1 1.52-2.733c.341-.153.71-.23 1.083-.227 1.57 0 2.518 1.077 2.518 2.856v.39h-3.986v.063a1.495 1.495 0 0 0 1.503 1.623 1.348 1.348 0 0 0 1.343-.686h1.072zm-3.918-1.825h2.851a1.371 1.371 0 0 0-.835-1.364 1.36 1.36 0 0 0-.554-.104 1.444 1.444 0 0 0-1.462 1.468z"
                fill="#fff"
              ></path>
            </svg>
            <svg width="151" height="51" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:cursor-pointer">
              <path
                d="M6.056 1.164h138.888c2.739 0 5.056 2.517 5.056 5.75v37.5c0 3.233-2.317 5.75-5.056 5.75H6.056C3.317 50.164 1 47.647 1 44.414v-37.5c0-3.233 2.317-5.75 5.056-5.75z"
                fill="#000"
                stroke="#A6A6A6"
              ></path>
              <path
                d="M53.189 14.382a2.966 2.966 0 0 1-.834 2.2 3.25 3.25 0 0 1-2.444.968 3.362 3.362 0 0 1-2.456-.99 3.49 3.49 0 0 1-1.01-2.453 3.49 3.49 0 0 1 1.01-2.453 3.544 3.544 0 0 1 3.822-.715c.401.163.758.415 1.045.737l-.589.583a2.22 2.22 0 0 0-1.822-.792 2.68 2.68 0 0 0-1.886.773 2.627 2.627 0 0 0-.78 1.867c0 .7.28 1.372.78 1.867a2.68 2.68 0 0 0 1.886.773 2.556 2.556 0 0 0 1.855-.737c.347-.365.549-.842.567-1.342h-2.422v-.792h3.233c.025.168.04.337.045.506zM58.277 11.632h-3v2.09h2.733v.792h-2.733v2.09h3v.814H54.41v-6.6h3.867v.814zM61.921 17.418h-.855v-5.786h-1.867v-.814h4.634v.814H61.92v5.786zM67.102 17.418v-6.6h.855v6.6h-.855zM71.754 17.418h-.856v-5.786H69.03v-.814h4.578v.814h-1.855v5.786zM82.289 16.56a3.486 3.486 0 0 1-4.889 0 3.545 3.545 0 0 1-.978-2.442c0-.908.35-1.781.978-2.442a3.284 3.284 0 0 1 2.445-1.001 3.362 3.362 0 0 1 2.444 1 3.373 3.373 0 0 1 .977 2.443 3.27 3.27 0 0 1-.977 2.442zm-4.256-.55a2.546 2.546 0 0 0 1.811.75 2.566 2.566 0 0 0 1.811-.75c.48-.516.746-1.191.746-1.892 0-.701-.266-1.376-.746-1.892a2.547 2.547 0 0 0-1.81-.75 2.566 2.566 0 0 0-1.812.75 2.778 2.778 0 0 0-.746 1.892c0 .7.267 1.376.746 1.892zM84.477 17.418v-6.6h1.033l3.244 5.137V10.82h.856v6.6h-.889l-3.389-5.38v5.379h-.855z"
                fill="#fff"
                stroke="#fff"
                strokeWidth="0.218"
                strokeMiterlimit="10"
              ></path>
              <path
                d="M76.21 27.043c-.935.002-1.85.279-2.627.796a4.697 4.697 0 0 0-1.738 2.107 4.643 4.643 0 0 0-.263 2.708 4.672 4.672 0 0 0 1.3 2.396 4.748 4.748 0 0 0 2.427 1.277c.919.178 1.87.083 2.734-.273a4.723 4.723 0 0 0 2.12-1.731 4.652 4.652 0 0 0 .792-2.605 4.568 4.568 0 0 0-.343-1.805 4.606 4.606 0 0 0-1.028-1.529 4.66 4.66 0 0 0-1.549-1.01c-.58-.23-1.2-.343-1.824-.331zm0 7.513a2.89 2.89 0 0 1-1.643-.38 2.85 2.85 0 0 1-1.143-1.228 2.813 2.813 0 0 1 .488-3.156 2.893 2.893 0 0 1 3.145-.71c.535.208.995.57 1.32 1.04.325.47.5 1.026.5 1.596a2.68 2.68 0 0 1-.728 1.976 2.732 2.732 0 0 1-1.938.862zm-10.355-7.513c-.936.002-1.85.279-2.628.796a4.696 4.696 0 0 0-1.738 2.107 4.643 4.643 0 0 0-.263 2.708 4.671 4.671 0 0 0 1.301 2.396 4.749 4.749 0 0 0 2.427 1.277 4.78 4.78 0 0 0 2.734-.273 4.723 4.723 0 0 0 2.12-1.731 4.652 4.652 0 0 0 .792-2.605 4.57 4.57 0 0 0-.343-1.805 4.606 4.606 0 0 0-1.028-1.529 4.66 4.66 0 0 0-1.55-1.01c-.579-.23-1.2-.343-1.824-.331zm0 7.513a2.89 2.89 0 0 1-1.643-.38 2.849 2.849 0 0 1-1.143-1.228 2.813 2.813 0 0 1 .487-3.156 2.894 2.894 0 0 1 3.145-.71c.536.208.996.57 1.32 1.04.325.47.5 1.026.5 1.596a2.682 2.682 0 0 1-.728 1.976 2.734 2.734 0 0 1-1.938.862zm-12.31-6.072v1.98h4.8a4.127 4.127 0 0 1-1.112 2.497 4.916 4.916 0 0 1-1.7 1.116c-.64.25-1.324.364-2.011.336a5.36 5.36 0 0 1-3.771-1.547 5.253 5.253 0 0 1-1.562-3.733c0-1.4.562-2.744 1.562-3.734a5.36 5.36 0 0 1 3.77-1.546 5.183 5.183 0 0 1 3.645 1.419l1.412-1.397a7.007 7.007 0 0 0-2.313-1.504 7.062 7.062 0 0 0-2.72-.498 7.41 7.41 0 0 0-2.898.47 7.353 7.353 0 0 0-2.48 1.555 7.268 7.268 0 0 0-1.666 2.393 7.208 7.208 0 0 0 0 5.695c.387.9.954 1.714 1.666 2.393a7.355 7.355 0 0 0 2.48 1.555c.924.348 1.91.508 2.897.47a6.805 6.805 0 0 0 2.781-.475 6.75 6.75 0 0 0 2.341-1.56 6.562 6.562 0 0 0 1.734-4.653 6.829 6.829 0 0 0-.1-1.232h-6.756zm50.344 1.54a4.406 4.406 0 0 0-1.554-2.114 4.476 4.476 0 0 0-2.49-.867 4.483 4.483 0 0 0-1.768.359 4.443 4.443 0 0 0-1.478 1.025 4.36 4.36 0 0 0-1.2 3.29 4.622 4.622 0 0 0 .91 2.795c.6.81 1.448 1.406 2.418 1.7.97.293 2.01.267 2.964-.073a4.696 4.696 0 0 0 2.331-1.814l-1.611-1.1c-.24.396-.581.723-.988.949a2.702 2.702 0 0 1-1.334.338 2.408 2.408 0 0 1-1.367-.359 2.372 2.372 0 0 1-.922-1.06l6.322-2.585-.233-.484zm-6.445 1.562a2.55 2.55 0 0 1 .658-1.885 2.598 2.598 0 0 1 1.82-.854 1.84 1.84 0 0 1 1.025.24c.31.178.56.442.719.76l-4.222 1.739zm-5.133 4.532h2.078v-13.75H92.31v13.75zm-3.4-8.03h-.078c-.31-.35-.694-.63-1.123-.82a3.296 3.296 0 0 0-1.366-.28 4.755 4.755 0 0 0-3.198 1.448 4.661 4.661 0 0 0-1.306 3.232c0 1.204.468 2.361 1.306 3.232a4.754 4.754 0 0 0 3.198 1.449c.471.009.939-.085 1.369-.275.43-.19.813-.472 1.12-.825h.078v.67c0 1.794-.967 2.75-2.522 2.75a2.64 2.64 0 0 1-1.45-.47 2.6 2.6 0 0 1-.94-1.19l-1.8.737a4.409 4.409 0 0 0 1.66 2.03c.748.495 1.63.754 2.53.742 2.433 0 4.444-1.42 4.444-4.873v-8.327h-1.922v.77zm-2.39 6.468a2.879 2.879 0 0 1-1.91-.89 2.823 2.823 0 0 1-.777-1.943c0-.722.278-1.417.777-1.943a2.879 2.879 0 0 1 1.91-.89 2.677 2.677 0 0 1 1.873.883 2.624 2.624 0 0 1 .661 1.945 2.594 2.594 0 0 1-.653 1.955 2.644 2.644 0 0 1-1.88.883zm27.101-12.188h-4.978v13.75h2.078v-5.214h2.9a4.365 4.365 0 0 0 1.747-.233 4.33 4.33 0 0 0 1.507-.903 4.242 4.242 0 0 0 0-6.265 4.33 4.33 0 0 0-3.254-1.135zm0 6.6h-2.9v-4.686h2.944a2.394 2.394 0 0 1 1.682.69 2.355 2.355 0 0 1 .696 1.664 2.356 2.356 0 0 1-1.468 2.175c-.288.118-.597.179-.91.179l-.044-.022zm12.822-1.97a3.91 3.91 0 0 0-2.168.502 3.86 3.86 0 0 0-1.532 1.6l1.833.759c.186-.331.464-.601.801-.78a1.993 1.993 0 0 1 1.099-.221 2.025 2.025 0 0 1 1.487.424 1.988 1.988 0 0 1 .736 1.347v.132a4.683 4.683 0 0 0-2.167-.528c-1.978 0-4 1.1-4 3.102a3.155 3.155 0 0 0 1.081 2.237 3.215 3.215 0 0 0 2.375.788 2.967 2.967 0 0 0 1.505-.317c.465-.236.858-.59 1.139-1.025h.067v1.1h2v-5.291c0-2.41-1.845-3.806-4.211-3.806l-.045-.022zm-.255 7.536c-.678 0-1.623-.341-1.623-1.166 0-1.1 1.178-1.474 2.223-1.474a3.714 3.714 0 0 1 1.888.462 2.47 2.47 0 0 1-.805 1.554 2.525 2.525 0 0 1-1.639.646l-.044-.022zm11.8-7.216-2.378 5.962h-.067l-2.467-5.962h-2.222l3.7 8.338-2.111 4.63h2.167l5.689-12.968h-2.311zm-18.667 8.8h2.067v-13.75h-2.067v13.75z"
                fill="#fff"
              ></path>
              <path
                d="M12.101 11.413c-.366.428-.553.98-.522 1.54v24.332a2.12 2.12 0 0 0 .522 1.54l.078.088 13.767-13.63v-.33L12.179 11.337l-.078.077z"
                fill="url(#a)"
              ></path>
              <path
                d="m30.5 29.826-4.555-4.543v-.33l4.556-4.543.1.066 5.455 3.058c1.556.87 1.556 2.3 0 3.18l-5.433 3.057-.122.055z"
                fill="url(#b)"
              ></path>
              <path d="m30.635 29.76-4.689-4.643-13.844 13.706a1.81 1.81 0 0 0 2.3.077l16.233-9.14" fill="url(#c)"></path>
              <path d="m30.635 20.475-16.233-9.13a1.801 1.801 0 0 0-2.3.066l13.844 13.706 4.689-4.642z" fill="url(#d)"></path>
              <path
                opacity="0.2"
                d="m30.502 29.66-16.1 9.075a1.857 1.857 0 0 1-2.223 0l-.077.077.077.088a1.857 1.857 0 0 0 2.223 0l16.233-9.14-.133-.1z"
                fill="#000"
              ></path>
              <path
                opacity="0.12"
                d="M12.1 38.67a2.185 2.185 0 0 1-.488-1.55v.164a2.12 2.12 0 0 0 .522 1.54l.078-.077-.111-.077zM36.056 26.547 30.5 29.66l.1.1 5.456-3.059c.322-.135.6-.353.808-.632.208-.278.335-.607.37-.952a2.065 2.065 0 0 1-1.178 1.43z"
                fill="#000"
              ></path>
              <path
                opacity="0.25"
                d="m14.4 11.501 21.656 12.188c.296.13.556.328.76.576.205.248.348.541.418.854a1.914 1.914 0 0 0-.37-.952 1.942 1.942 0 0 0-.808-.632L14.4 11.347c-1.544-.88-2.822-.154-2.822 1.606v.165c.034-1.76 1.278-2.486 2.822-1.617z"
                fill="#fff"
              ></path>
              <defs>
                <linearGradient id="a" x1="24.723" y1="12.7" x2="6.266" y2="31.343" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#00A0FF"></stop>
                  <stop offset="0.01" stopColor="#00A1FF"></stop>
                  <stop offset="0.26" stopColor="#00BEFF"></stop>
                  <stop offset="0.51" stopColor="#00D2FF"></stop>
                  <stop offset="0.76" stopColor="#00DFFF"></stop>
                  <stop offset="1" stopColor="#00E3FF"></stop>
                </linearGradient>
                <linearGradient id="b" x1="38.09" y1="25.118" x2="11.212" y2="25.118" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FFE000"></stop>
                  <stop offset="0.41" stopColor="#FFBD00"></stop>
                  <stop offset="0.78" stopColor="orange"></stop>
                  <stop offset="1" stopColor="#FF9C00"></stop>
                </linearGradient>
                <linearGradient id="c" x1="28.09" y1="27.647" x2="3.056" y2="52.924" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FF3A44"></stop>
                  <stop offset="1" stopColor="#C31162"></stop>
                </linearGradient>
                <linearGradient id="d" x1="8.613" y1="3.315" x2="19.788" y2="14.604" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#32A071"></stop>
                  <stop offset="0.07" stopColor="#2DA771"></stop>
                  <stop offset="0.48" stopColor="#15CF74"></stop>
                  <stop offset="0.8" stopColor="#06E775"></stop>
                  <stop offset="1" stopColor="#00F076"></stop>
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        <ul className="hidden md:flex items-center justify-center text-xs space-x-4 pb-2">
          <li className="capitalize text-gray-500">about</li>
          <li className="capitalize text-gray-500">press</li>
          <li className="capitalize text-gray-500">terms of use</li>
          <li className="capitalize text-gray-500">privacy policy</li>
          <li className="capitalize text-gray-500">&copy;2022 FORUM, Inc.</li>
        </ul>
      </div>
    </div>
  );
};

export default Homepage;

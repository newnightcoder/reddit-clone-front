import { ChevronDoubleRightIcon, HeartIcon, PencilIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import logo2 from "../assets/logo2.svg";
import picPlaceholder from "../assets/pic_placeholder.svg";
import { DeleteModal, EditModal, Post } from "../components";
import { cleanCurrentProfilePosts, getUserPosts } from "../store/actions/posts.action";
import { cleanCurrentProfileVisit, deleteUser, saveUserPic } from "../store/actions/user.action";
import { formatTimestamp } from "../utils/formatTime";
import history from "../utils/history";

const Profile = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [blob, setBlob] = useState(null);
  const [blobName, setBlobName] = useState(null);
  const file = useRef(null);
  const [isHidden, setIsHidden] = useState(true);
  const { id, picUrl, username, creationDate } = useSelector((state) => state?.user);
  const profileUser = useSelector((state) => state?.user?.currentProfileVisit);

  const role = useSelector((state) => state?.user.role);
  const posts = useSelector((state) => state?.posts.userPosts);
  const isAuthenticated = useSelector((state) => state.user.loginSuccess);

  const dispatch = useDispatch();

  const profilePostsTitle = (
    <>
      <span>Posts de </span>
      <span className="capitalize">{profileUser.username}</span>
    </>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    if (profileUser) {
      dispatch(getUserPosts(profileUser.id));
    } else dispatch(getUserPosts(id));
    return function cleanup() {
      dispatch(cleanCurrentProfileVisit());
      dispatch(cleanCurrentProfilePosts());
    };
  }, [dispatch, profileUser, id]);

  const handleImgSubmit = async (e) => {
    e.preventDefault();
    dispatch(saveUserPic(blob, id));
  };

  const toggleDeleteModal = () => {
    setOpenModal((openModal) => !openModal);
  };

  const handleDeleteProfile = (profileId) => {
    if (profileId === id) {
      dispatch(deleteUser(id));
      history.push("/fin");
    } else if (profileId === profileUser.id) {
      dispatch(deleteUser(profileUser.id));
      history.push({ pathname: "/fin", state: { admin: true } });
    }
  };

  const toggleEditModal = () => {
    setOpenEditModal((openEditModal) => !openEditModal);
  };

  return (
    <>
      {!isAuthenticated ? (
        <Redirect to={{ pathname: "/" }} />
      ) : (
        <div
          className="page-container h-max w-screen py-5 bg-gray-300 flex flex-col items-center justify-start gap-2 rounded-tr rounded-br transition transition-transform duration-300"
          style={{ minHeight: "calc(100vh - 4rem)" }}
        >
          {profileUser?.username === username && <h1 className="w-9/12 text-left text-xl text-gray-700 underline">Mon profil</h1>}
          <div className="top-section h-max w-10/12 pb-2 flex flex-col items-center justify-center gap-2 border-b border-black">
            <div className="avatar-container h-max w-full flex items-center justify-center">
              <div
                className="w-40 h-40 rounded-full border border-gray-400"
                style={
                  profileUser.username === username && picUrl !== null
                    ? { background: `url(${picUrl}) no-repeat center/cover` }
                    : profileUser.username !== username && profileUser.picUrl !== null
                    ? { background: `url(${profileUser.picUrl}) no-repeat center/cover` }
                    : { background: `url(${picPlaceholder}) no-repeat center/cover` }
                }
              ></div>
            </div>
            <div className="username-member h-max w-full flex flex-col items-center justify-start">
              <span className="text-xl font-bold capitalize">
                {profileUser.username ? profileUser.username : username?.length !== 0 && username}
              </span>
              <span className="block italic text-sm flex items-center justify-center gap-1">
                <span
                  className="block w-6 h-6 rounded-full outline-none transform translate-y-px"
                  style={{ background: `url(${logo2}) no-repeat center/cover` }}
                ></span>
                membre depuis{" "}
                {profileUser.creationDate
                  ? formatTimestamp(profileUser.creationDate)
                  : creationDate?.length !== 0
                  ? formatTimestamp(creationDate)
                  : null}
              </span>
            </div>
          </div>
          <div className="main-section h-full w-10/12 flex flex-col items-center justify-start gap-2">
            {profileUser?.username === username && (
              <form
                className="handle-img h-max w-full flex flex-col items-center justify-start gap-1"
                action=""
                method="POST"
                encType="multipart/form-data"
                onSubmit={handleImgSubmit}
              >
                <label
                  className="button-changer-choisir w-48 text-center text-white text-sm p-2 rounded shadow-xl hover:cursor-pointer"
                  style={{ backgroundColor: "#ef5350" }}
                  htmlFor="file"
                >
                  {!picUrl ? "Choisir une photo de profil" : "Changer la photo de profil"}
                </label>

                <div className="flex items-center ">
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
                      setIsHidden(false);
                    }}
                  />
                  <div className="text-center text-xs">
                    {!isHidden ? blobName : !picUrl ? <span className="italic text-xs">Aucune photo pour le moment.</span> : null}
                  </div>
                </div>
                <div className="buttons-container-apercu-valider w-full flex items-center justify-center gap-4">
                  <button
                    className="text-white text-sm px-2 shadow py-1 border border-red-500 rounded transform transition transition-opacity duration-1000 shadow-xl"
                    style={
                      isHidden ? { display: "none", opacity: 0 } : { display: "block", opacity: 1, backgroundColor: "#ef5350" }
                    }
                  >
                    voir l'aperçu
                  </button>
                  <button
                    className="w-max flex items-center gap-1 text-black font-bold px-2 shadow py-1 rounded transform transition transition-opacity duration-1000 shadow-xl"
                    style={
                      isHidden ? { opacity: 0, display: "none" } : { opacity: 1, display: "flex", backgroundColor: "#ef5350" }
                    }
                    onClick={() => setIsHidden(true)}
                  >
                    valider
                    <ChevronDoubleRightIcon className="h-4 w-4 text-black font-bold" style={{ transform: "translateY(1px)" }} />
                  </button>
                </div>
              </form>
            )}
            {profileUser?.username === username && (
              <ul className="h-max w-11/12 xl:w-3/4 2xl:w-2/3 flex flex-col lg:flex-row items-start justify-center gap-3 md:justify-evenly pt-10 pl-4 mb-4 text-sm text-gray-900">
                <li>
                  <button
                    className="h-10 w-max px-3 py-1 flex items-center justify-center gap-1 hover:underline hover:drop-shadow hover:bg-gray-700 text-gray-700 hover:text-white transition duration-200 rounded "
                    // onClick={toggleEditModal}
                  >
                    <UserCircleIcon className="h-8" /> Modifier mon pseudo
                  </button>
                </li>
                <li>
                  <button
                    className="h-10 w-max px-3 py-1 flex items-center justify-center gap-1 hover:underline hover:drop-shadow hover:bg-gray-700 text-gray-700 hover:text-white transition duration-300 rounded"
                    onClick={() => history.push("/create")}
                  >
                    <PencilIcon className="h-8" />
                    Créer un nouveau post
                  </button>
                </li>
                <li>
                  <button className="h-10 w-max px-3 py-1 flex items-center justify-center gap-1 hover:underline hover:drop-shadow hover:bg-gray-700 text-gray-700 hover:text-white transition duration-300 rounded">
                    <HeartIcon className="h-8 " />
                    Posts que j'ai aimé
                  </button>
                </li>
                <li>
                  <button
                    className="h-10 w-max px-3 py-1 flex items-center justify-center gap-1 hover:underline hover:drop-shadow hover:bg-red-600 text-gray-700 hover:text-white hover:font-bold transition duration-300 rounded text-sm"
                    onClick={() => setOpenModal(true)}
                  >
                    <TrashIcon className="h-8" />
                    Supprimer mon profil
                  </button>
                </li>
              </ul>
            )}
          </div>
          <div className="w-10/12 pl-4">
            {role === "admin" && profileUser.id !== id && (
              <button
                className="flex items-center justify-center gap-1 text-md hover:underline hover:drop-shadow"
                onClick={() => setOpenModal(true)}
              >
                <TrashIcon className="h-8 text-gray-700" />
                Supprimer le profil
              </button>
            )}
          </div>
          {openEditModal && <EditModal toggleEditModal={toggleEditModal} openEditModal={openEditModal} />}
          {openModal && (
            <DeleteModal
              toggleDeleteModal={toggleDeleteModal}
              handleDeleteProfile={handleDeleteProfile}
              origin={role === "admin" && profileUser.id !== id ? "profile-admin" : "profile"}
            />
          )}
          <div className="w-10/12 flex flex-col items-center justify-center">
            <h2 className="uppercase font-bold">
              {profileUser.id !== id ? <>{profilePostsTitle}</> : `Mes posts (${posts.length})`}
            </h2>
            <div className="w-full md:w-1/2 2xl:w-1/3 flex flex-col items-center justify-center gap-3 pt-4">
              {posts.map((post) => (
                <Post key={post.postId} post={post} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

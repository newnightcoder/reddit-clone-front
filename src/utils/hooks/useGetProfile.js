import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_USER } from "../../API";
import { clearErrorPost, setErrorPost } from "../../store/actions/posts.action";
import { getFollowers } from "../../store/actions/user.action";

const useGetProfile = (id) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();

  const getProfile = async (id) => {
    const token = localStorage.getItem("jwt");
    const request = {
      headers: {
        "Content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "post",
      body: JSON.stringify({ id }),
    };
    try {
      const response = await fetch(`${API_USER}/`, request);
      const { user, error } = await response.json();
      if (error) return dispatch(setErrorPost(error));
      setUserData(user);
      dispatch(clearErrorPost());
    } catch (error) {
      dispatch(setErrorPost("backend"));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProfile(id);
      dispatch(getFollowers(id));
      console.log("user reçu pour le profil", userData);
    }
  }, [dispatch, id, isAuthenticated]);

  return userData;
};

export default useGetProfile;

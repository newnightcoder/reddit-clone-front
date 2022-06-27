import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_USER } from "../../API";
import { clearErrorPost, setErrorPost } from "../../store/actions/posts.action";

const useGetProfile = (id) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { error: errorPost } = useSelector((state) => state.posts);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getProfile = useCallback(
    async (id) => {
      const token = localStorage.getItem("jwt");
      const request = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        method: "post",
        body: JSON.stringify({ id }),
      };
      setLoading(true);
      try {
        const response = await fetch(`${API_USER}/`, request);
        const { user, error } = await response.json();
        if (error) return dispatch(setErrorPost(error));
        if (errorPost) {
          dispatch(clearErrorPost());
        }
        setUserData(user);
        setLoading(false);
      } catch (error) {
        dispatch(setErrorPost("backend"));
      }
    },
    [dispatch, setLoading]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getProfile(id);
    }
  }, [dispatch, id, isAuthenticated, getProfile]);

  return { userData, loading };
};

export default useGetProfile;

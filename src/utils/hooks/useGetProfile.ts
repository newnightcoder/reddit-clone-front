import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../API/users";
import { clearErrorPostAction, setErrorPostAction, setSessionExpiredAction } from "../../store/actions/posts.action";
import { IUser } from "../../store/types";

const useGetProfile = (id: number) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { error: errorPost } = useSelector((state) => state.posts);
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getProfile = useCallback(
    async (id: number) => {
      setLoading(true);
      try {
        const { user, error, sessionExpired } = await fetchUserProfile(id);
        if (error) return dispatch(setErrorPostAction(error));
        if (sessionExpired) return dispatch(setSessionExpiredAction(sessionExpired));
        if (errorPost) {
          dispatch(clearErrorPostAction());
        }
        setUserData(user);
        setLoading(false);
      } catch (error) {
        dispatch(setErrorPostAction("backend"));
      }
    },
    [dispatch, setLoading, setUserData, errorPost]
  );

  useEffect(() => {
    if (isAuthenticated) {
      getProfile(id);
    }
  }, [dispatch, id, isAuthenticated, getProfile]);

  return { userData, loading };
};

export default useGetProfile;

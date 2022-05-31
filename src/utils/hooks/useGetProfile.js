import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_USER } from "../../API";

const useGetProfile = (id) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  const getProfile = async (id) => {
    const request = {
      headers: {
        "Content-type": "application/json",
      },
      method: "post",
      body: JSON.stringify({ id }),
    };
    try {
      const response = await fetch(`${API_USER}/`, request);
      const { user } = await response.json();
      console.log("user reçu pour le profil", user);
      setUserData(user);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getProfile(id);
      console.log("userData", userData);
    }
  }, [id, isAuthenticated]);

  return userData;
};

export default useGetProfile;

import { useEffect, useState } from "react";
import { API_AUTH } from "../../API";

const useGetProfile = (id) => {
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
      const response = await fetch(`${API_AUTH}/`, request);
      const { user } = await response.json();
      console.log("user reçu pour le profil", user);
      setUserData(user);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    getProfile(id);
    console.log("userData", userData);
  }, []);

  return userData;
};

export default useGetProfile;

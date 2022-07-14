import { API_USER } from "..";
import { IUser } from "../../store/types";

const fetchUserProfile = async (id: number) => {
  const token = localStorage.getItem("jwt");
  const request = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "get",
  };
  try {
    const response = await fetch(`${API_USER}/${id}`, request);
    const { user, error, sessionExpired }: { user: IUser; error: string | null; sessionExpired: boolean } = await response.json();
    return { user, error, sessionExpired };
  } catch (err) {
    throw err;
  }
};
export default fetchUserProfile;

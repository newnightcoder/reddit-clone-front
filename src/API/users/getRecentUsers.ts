import { API_USER } from "..";
import { IUser } from "../../store/types";

const getRecentUsers = async () => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
  };
  try {
    const response = await fetch(`${API_USER}/user`, request);
    const { recentUsers, sessionExpired, error }: { recentUsers: IUser[]; sessionExpired: boolean; error: string } =
      await response.json();
    return { recentUsers, sessionExpired, error };
  } catch (err) {
    throw err;
  }
};
export default getRecentUsers;

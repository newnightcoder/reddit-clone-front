import { API_USER } from "..";
import { IUser } from "../../store/types";

const getRecentUsers = async () => {
  try {
    const response = await fetch(`${API_USER}/recent`);
    const { recentUsers, sessionExpired, error }: { recentUsers: IUser[]; sessionExpired: boolean; error: string } =
      await response.json();
    return { recentUsers, sessionExpired, error };
  } catch (err) {
    throw err;
  }
};
export default getRecentUsers;

import { API_USER } from "..";
import { IUser } from "../../store/types";

const getMods = async () => {
  try {
    const response = await fetch(`${API_USER}/mods`);
    const { mods, error, sessionExpired }: { mods: IUser[]; error: string; sessionExpired: boolean } = await response.json();
    return { mods, error, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default getMods;

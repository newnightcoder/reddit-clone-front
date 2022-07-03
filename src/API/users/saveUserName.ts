import { API_USER } from "..";
import { IUser } from "../../store/types";

const saveUserName = async (id: number, name: string) => {
  const request = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ id, name }),
  };
  try {
    const response = await fetch(`${API_USER}/username`, request);
    const {
      user,
      error,
      isNewUser,
      accessToken,
    }: { user: IUser; error: string | null; isNewUser: boolean; accessToken: string } = await response.json();
    return { user, error, isNewUser, accessToken };
  } catch (err) {
    throw err;
  }
};

export default saveUserName;

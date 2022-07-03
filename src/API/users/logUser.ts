import { API_USER } from "..";
import { IUser } from "../../store/types";

const logUser = async (email: string, password: string) => {
  const request = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(`${API_USER}/login`, request);
    const {
      error,
      user,
      isNewUser,
      accessToken,
    }: { error: string | null; user: IUser; isNewUser: boolean; accessToken: string } = await response.json();
    return { error, user, isNewUser, accessToken };
  } catch (err) {
    throw err;
  }
};

export default logUser;

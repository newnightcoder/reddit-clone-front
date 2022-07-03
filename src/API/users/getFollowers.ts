import { API_USER } from "..";
import { IUser } from "../../store/types";

const getFollowers = async (id: number) => {
  const token = localStorage.getItem("jwt");
  const request = {
    headers: { Authorization: `Bearer ${token}` },
    method: "get",
  };
  try {
    const response = await fetch(`${API_USER}/follow/${id}`, request);
    const { followers, following, error }: { followers: IUser[]; following: IUser[]; error: string } = await response.json();
    return { followers, following, error };
  } catch (err) {
    throw err;
  }
};

export default getFollowers;

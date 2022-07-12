import { API_USER } from "..";
import { IPost, IUser } from "../../store/types";

const getSearchResults = async (query: string, filter?: string) => {
  const token = localStorage.getItem("jwt");
  const request = {
    headers: { Authorization: `Bearer ${token}` },
    method: "get",
  };
  try {
    const response = await fetch(`${API_USER}/search/${query}/${filter}`, request);
    const { results, error }: { results: IUser[] | IPost; error: string } = await response.json();
    return { results, error };
  } catch (err) {
    throw err;
  }
};

export default getSearchResults;

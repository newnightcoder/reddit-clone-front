import { API_POST } from "..";
import { IComment } from "../../store/types";

const getComments = async (postId: number) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
  };
  const response = await fetch(`${API_POST}/comment/${postId}`, request);
  const { error, comments, sessionExpired }: { error: string | null; comments: IComment[]; sessionExpired: boolean } =
    await response.json();
  return { error, comments, sessionExpired };
};

export default getComments;

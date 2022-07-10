import { API_POST } from "..";
import { IComment } from "../../store/types";

const createComment = async (comment: IComment) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ comment }),
  };
  try {
    const response = await fetch(`${API_POST}/comment`, request);
    const {
      error,
      count,
      newComment,
      sessionExpired,
    }: { error: string | null; count: number; newComment: IComment; sessionExpired: boolean } = await response.json();
    return { error, count, newComment, sessionExpired };
  } catch (err) {
    throw err;
  }
};
export default createComment;

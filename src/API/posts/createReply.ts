import { API_POST } from "..";
import { IReply } from "../../store/types";

const createReply = async (reply: IReply) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify(reply),
  };
  try {
    const response = await fetch(`${API_POST}/reply`, request);
    const { error, replyId, sessionExpired }: { error: string | null; replyId: number; sessionExpired: boolean } =
      await response.json();
    return { error, replyId, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default createReply;

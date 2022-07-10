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
    body: JSON.stringify({ reply }),
  };
  try {
    const response = await fetch(`${API_POST}/reply`, request);
    const {
      newReply,
      error,
      replyId,
      sessionExpired,
    }: { newReply: IReply; error: string | null; replyId: number; sessionExpired: boolean } = await response.json();
    return { newReply, replyId, error, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default createReply;

import { API_POST } from "..";
import { IReply } from "../../store/types";

const fetchReplies = async (arr: number[]) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: { Authorization: `Bearer ${accessToken}` },
    method: "get",
  };
  try {
    const response = await fetch(`${API_POST}/reply/${arr}`, request);
    const { error, replies, sessionExpired }: { error: string | null; replies: IReply[]; sessionExpired: boolean } =
      await response.json();
    return { error, replies, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default fetchReplies;

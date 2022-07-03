import { API_USER } from "..";

const likePost = async (origin: string, userId: number, id: number, like: boolean) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ origin, userId, id, like }),
  };
  try {
    const response = await fetch(`${API_USER}/like`, request);
    const { liked, sessionExpired, error }: { liked: boolean; sessionExpired: boolean; error: string | null } =
      await response.json();
    return { liked, sessionExpired, error };
  } catch (err) {
    throw err;
  }
};

export default likePost;

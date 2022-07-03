import { API_POST } from "..";

const deletePublication = async (postId: number, origin: string, postIdComment: number | null) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ postId, origin, postIdComment }),
  };
  try {
    const response = await fetch(`${API_POST}/delete`, request);
    const { error, sessionExpired }: { error: string | null; sessionExpired: boolean } = await response.json();
    const resStatus = response.status;
    return { resStatus, error, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default deletePublication;

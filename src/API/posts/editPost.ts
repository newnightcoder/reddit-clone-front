import { API_POST } from "..";
import { IEdit, IPost } from "../../store/types";

const editPost = async (post: IPost | IEdit, origin: string) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ origin, post }),
  };
  try {
    const response = await fetch(`${API_POST}/edit`, request);
    const { edit, error, sessionExpired }: { edit: IPost | IEdit; error: string | null; sessionExpired: boolean } =
      await response.json();
    return { edit, error, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default editPost;

import { API_POST } from "..";
import { IPost } from "../../store/types";

const createPost = async (post: IPost) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify({ post }),
  };
  try {
    const response = await fetch(API_POST, request);
    const { newPost, error, sessionExpired }: { newPost: IPost; error: string | null; sessionExpired: boolean } =
      await response.json();
    return { newPost, error, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default createPost;

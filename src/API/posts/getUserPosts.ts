import { API_POST } from "..";
import { ILike, IPost } from "../../store/types";

export const fetchUserPosts = async (userId: number) => {
  const accessToken: string = localStorage.getItem("jwt") || "";
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ userId }),
  };
  try {
    const response = await fetch(`${API_POST}/user`, request);
    const {
      posts,
      likes,
      sessionExpired,
      error,
    }: { posts: IPost[]; likes: ILike[]; sessionExpired: boolean; error: string | null } = await response.json();
    return { posts, likes, sessionExpired, error };
  } catch (error) {
    throw error;
  }
};
export default fetchUserPosts;

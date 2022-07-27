import { API_POST } from "..";
import { ILike, IPost } from "../../store/types";

const fetchPosts = async () => {
  const request = { method: "get" };

  try {
    const response = await fetch(`${API_POST}`, request);
    const { posts, likes, error }: { posts: IPost[]; likes: ILike[]; error: string | null } = await response.json();
    return { posts, likes, error };
  } catch (error) {
    throw error;
  }
};
export default fetchPosts;

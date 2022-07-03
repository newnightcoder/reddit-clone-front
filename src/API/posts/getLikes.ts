import { API_POST } from "..";
import { ILike } from "../../store/types";

const fetchLikes = async () => {
  const request = new Request(`${API_POST}/like`, { method: "get" });
  try {
    const response = await fetch(request);
    const { likes, error }: { likes: ILike[]; error: string | null } = await response.json();
    return { likes, error };
  } catch (error) {
    throw error;
  }
};

export default fetchLikes;

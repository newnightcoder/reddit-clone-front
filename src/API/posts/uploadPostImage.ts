import { API_POST } from "..";

export const uploadPostImage = async (blob: File) => {
  const formData = new FormData();
  formData.append("image", blob);
  const request = {
    method: "post",
    body: formData,
  };

  try {
    const response = await fetch(`${API_POST}/post-image`, request);
    const { imgUrl, error }: { imgUrl: string; error: string | null } = await response.json();
    return { imgUrl, error };
  } catch (err) {
    throw err;
  }
};

export default uploadPostImage;

import { API_USER } from "..";

const saveUserPic = async (blob: File, id: number, imgType: string) => {
  const formData = new FormData();
  formData.append("image", blob);
  formData.append("id", id.toString());
  formData.append("imgType", imgType);
  const request = {
    // headers: { "Content-Type": "application/json" },
    method: "POST",
    body: formData,
  };
  try {
    const response = await fetch(`${API_USER}/pic`, request);
    const { error, picUrl }: { error: string | null; picUrl: string } = await response.json();
    return { error, picUrl };
  } catch (err) {
    throw err;
  }
};

export default saveUserPic;

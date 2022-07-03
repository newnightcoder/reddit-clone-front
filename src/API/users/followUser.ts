import { API_USER } from "..";

const followUser = async (myId: number, userId: number, bool: boolean) => {
  const token = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    method: "post",
    body: JSON.stringify({ myId, userId, bool }),
  };
  try {
    const response = await fetch(`${API_USER}/follow`, request);
    const { msg, error }: { msg: string; error: string | null } = await response.json();
    return { msg, error };
  } catch (err) {
    throw err;
  }
};

export default followUser;

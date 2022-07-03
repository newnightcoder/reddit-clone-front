import { API_USER } from "..";

const editUserName = async (userId: number, username: string) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ userId, username }),
  };
  try {
    const response = await fetch(`${API_USER}/edit`, request);
    const { newName, error }: { newName: string; error: string | null } = await response.json();
    return { newName, error };
  } catch (err) {
    throw err;
  }
};

export default editUserName;

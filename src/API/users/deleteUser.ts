import { API_USER } from "..";

const deleteUser = async (id: number) => {
  const accessToken = localStorage.getItem("jwt");
  const request = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    method: "post",
    body: JSON.stringify({ id }),
  };
  try {
    const response = await fetch(`${API_USER}/delete`, request);
    const { error, sessionExpired }: { error: string | null; sessionExpired: boolean } = await response.json();
    const status = response.status;
    return { status, error, sessionExpired };
  } catch (err) {
    throw err;
  }
};

export default deleteUser;

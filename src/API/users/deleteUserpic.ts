import { API_USER } from "../index";

const deleteUserpic = async (id: number, imgType: string) => {
  const token = localStorage.getItem("jwt");
  const request = {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    method: "post",
    body: JSON.stringify({ id, imgType }),
  };
  try {
    const response = await fetch(`${API_USER}/pic/delete`, request);
    const { result, error, sessionExpired }: { result: string; error: string; sessionExpired: boolean } = await response.json();
    return { result, error, sessionExpired };
  } catch (error) {
    throw error;
  }
};

export default deleteUserpic;

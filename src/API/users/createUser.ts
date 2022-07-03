import { API_USER } from "..";

const createUser = async (email: string, password: string, date: string) => {
  const request = {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      date,
    }),
  };
  try {
    const response = await fetch(`${API_USER}/signup`, request);
    const { error, userId }: { error: string | null; userId: number } = await response.json();
    return { error, userId };
  } catch (err) {
    throw err;
  }
};

export default createUser;

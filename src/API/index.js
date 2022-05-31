export const API_USER =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/user"
    : process.env.NODE_ENV === "production" && "https://social-media-sql-backend.herokuapp.com/api/user";

export const API_POST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/post"
    : process.env.NODE_ENV === "production" && "https://social-media-sql-backend.herokuapp.com/api/post";

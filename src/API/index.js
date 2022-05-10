export const API_AUTH =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/auth"
    : process.env.NODE_ENV === "production" && "https://social-media-sql-backend.herokuapp.com/api/auth";

export const API_POST =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/api/post"
    : process.env.NODE_ENV === "production" && "https://social-media-sql-backend.herokuapp.com/api/post";

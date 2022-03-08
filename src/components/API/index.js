export const API_AUTH =
  process.env.NODE_ENV === "production"
    ? "https://social-media-sql-backend.herokuapp.com/api/auth"
    : process.env.NODE_ENV === "development" && "http://localhost:3001/api/auth";
export const API_POST =
  process.env.NODE_ENV === "production"
    ? "https://social-media-sql-backend.herokuapp.com/api/post"
    : process.env.NODE_ENV === "development" && "http://localhost:3001/api/post";
// export const API_AUTH = "http://localhost:3001/api/auth";
// export const API_POST = "http://localhost:3001/api/post";

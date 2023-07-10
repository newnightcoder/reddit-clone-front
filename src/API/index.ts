const API_USER_DEV = new URL("http://localhost:3001/api/user");
const API_POST_DEV = new URL("http://localhost:3001/api/post");
// const API_USER_PROD = new URL("https://forum-backend-42cf.onrender.com/api/user");
// const API_POST_PROD = new URL("https://forum-backend-42cf.onrender.com/api/post");
const API_USER_PROD = new URL("https://social-media-sql-backend.herokuapp.com/api/user");
const API_POST_PROD = new URL("https://social-media-sql-backend.herokuapp.com/api/post");

export const API_USER: URL = process.env.NODE_ENV === "development" ? API_USER_DEV : API_USER_PROD;
export const API_POST: URL = process.env.NODE_ENV === "development" ? API_POST_DEV : API_POST_PROD;

const USER = "api/user";
const POSTS = "api/post";
// const HEROKU_ENDPOINT = "https://social-media-sql-backend.herokuapp.com"; 😭 it's over
// const RENDER_ENDPOINT = "https://forum-backend-42cf.onrender.com"; 🤬 much too slow
const RAILWAY_ENDPOINT = "reddit-clone-back-production.up.railway.app"; // 🤞🏾 let's try!

const API_USER_DEV = new URL("http://localhost:3001/api/user");
const API_USER_PROD = new URL(`${RAILWAY_ENDPOINT}/${USER}`);

const API_POST_DEV = new URL("http://localhost:3001/api/post");
const API_POST_PROD = new URL(`${RAILWAY_ENDPOINT}/${POSTS}`);

export const API_USER: URL = process.env.NODE_ENV === "development" ? API_USER_DEV : API_USER_PROD;
export const API_POST: URL = process.env.NODE_ENV === "development" ? API_POST_DEV : API_POST_PROD;

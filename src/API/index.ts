// HEROKU: 😭 it's over
// const HEROKU_ENDPOINT_USER = "https://social-media-sql-backend.herokuapp.com/api/user";
// const HEROKU_ENDPOINT_POSTS = "https://social-media-sql-backend.herokuapp.com/api/post";

// RENDER: 🤬 much too slow
// const RENDER_ENDPOINT_USER = "https://forum-backend-42cf.onrender.com/api/user";
// const RENDER_ENDPOINT_POSTS = "https://forum-backend-42cf.onrender.com/api/post";

//RAILWAY: 🤞🏾 let's try!
const RAILWAY_ENDPOINT_USER = "https://reddit-clone-back-production.up.railway.app/api/user";
const RAILWAY_ENDPOINT_POSTS = "https://reddit-clone-back-production.up.railway.app/api/post";

const API_USER_DEV = new URL("http://localhost:3001/api/user");
const API_USER_PROD = new URL(RAILWAY_ENDPOINT_USER);

const API_POST_DEV = new URL("http://localhost:3001/api/post");
const API_POST_PROD = new URL(RAILWAY_ENDPOINT_POSTS);

export const API_USER: URL = process.env.NODE_ENV === "development" ? API_USER_DEV : API_USER_PROD;
export const API_POST: URL = process.env.NODE_ENV === "development" ? API_POST_DEV : API_POST_PROD;

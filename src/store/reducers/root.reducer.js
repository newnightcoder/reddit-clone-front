import { combineReducers } from "redux";
import { postsReducer } from "./posts.reducer.js";
import { userReducer } from "./user.reducer.js";

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

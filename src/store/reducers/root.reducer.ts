import { combineReducers } from "redux";
import { postsReducer } from "./posts.reducer";
import { userReducer } from "./user.reducer";

export const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

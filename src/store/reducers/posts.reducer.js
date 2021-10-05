import { actionType } from "../constants";

const initialState = [];

export const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_POSTS:
      return (state = action.payload);

    default:
      return state;
  }
};

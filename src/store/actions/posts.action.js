import { API_POST } from "../../components/API";
import { actionType } from "../constants";

export const getPosts = () => async (dispatch) => {
  const request = {
    method: "get",
  };

  try {
    const response = await fetch(API_POST, request);
    const data = await response.json();
    const { posts } = data;
    dispatch({
      type: actionType.GET_POSTS,
      payload: posts,
    });
  } catch (error) {
    throw error;
  }
};

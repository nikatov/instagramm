import { DB } from "../../db";
import { IPost, IPostData } from "../../interfaces";
import { IAddPostAction, ILoadPostsAction, IRemovePostAction, IToggleBookedAction } from "../interfaces";
import { IActionType } from "../types";

type IActionFunction = (dispatch: (p: ILoadPostsAction) => void) => void

export const loadPosts = (): IActionFunction => {
  return async dispatch => {
    dispatch({
      type: IActionType.LOAD_POSTS,
      payload: { allPosts: posts }
    });
  }
}

export const addPost = (postData: IPostData): IAddPostAction => {
  const post: IPost = {
    ...postData,
    id: Date.now().toString()
  }
  return ({
    type: IActionType.ADD_POST,
    payload: { post }
  });
}

export const removePost = (id: string): IRemovePostAction => {
  return ({
    type: IActionType.REMOVE_POST,
    payload: { id }
  });
}

export const toggleBooked = (id: string): IToggleBookedAction => {
  return ({
    type: IActionType.TOGGLE_BOOKED,
    payload: { id }
  });
}
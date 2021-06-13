import { IPost } from "../interfaces";
import { IActionType } from "./types";

export interface ILoadPostsAction {
  type: IActionType.LOAD_POSTS
  payload: {
    allPosts: IPost[]
  }
}

export interface IAddPostAction {
  type: IActionType.ADD_POST,
  payload: {
    post: IPost
  }
}

export interface IRemovePostAction {
  type: IActionType.REMOVE_POST,
  payload: {
    id: string
  }
}

export interface IToggleBookedAction {
  type: IActionType.TOGGLE_BOOKED,
  payload: {
    id: string
  }
}

export type IAction = ILoadPostsAction | IAddPostAction | IRemovePostAction | IToggleBookedAction;

export interface IPostState {
  allPosts: IPost[],
  bookedPosts: IPost[],
  loading: boolean
}

export interface IRootState {
  post: IPostState,
}
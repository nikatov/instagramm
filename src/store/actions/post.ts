import { DB } from "../../db";
import { IPost, IPostData } from "../../interfaces";
import { IAction } from "../interfaces";
import { IActionType } from "../types";

type IActionFunction = (dispatch: (p: IAction) => void) => void

export const loadPosts = (): IActionFunction => (
  async dispatch => {
    const posts: IPost[] = await DB.getPosts() as IPost[];
    dispatch({
      type: IActionType.LOAD_POSTS,
      payload: { allPosts: posts }
    });
  }
)

export const addPost = (postData: IPostData): IActionFunction => (
  async dispatch => {
    const post: IPost = {
      ...postData,
      id: Date.now().toString()
    }
    dispatch({
      type: IActionType.ADD_POST,
      payload: { post }
    });
  }
)

export const removePost = (id: string): IActionFunction => (
  async dispatch => (
    dispatch({
      type: IActionType.REMOVE_POST,
      payload: { id }
    })
  )
)

export const toggleBooked = (id: string): IActionFunction => (
  async dispatch => (
    dispatch({
      type: IActionType.TOGGLE_BOOKED,
      payload: { id }
    })
  )
)
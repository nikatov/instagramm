import { IAction, IPostState } from "../interfaces";
import { IActionType } from "../types";

const initialState: IPostState = {
  allPosts: [],
  bookedPosts: [],
  loading: true
};

export const postReducer = (state: IPostState = initialState, action: IAction ): IPostState => {
  switch (action.type) {
    case IActionType.LOAD_POSTS: return {
      ...state,
      allPosts: action.payload.allPosts,
      bookedPosts: action.payload.allPosts.filter(post => post.booked),
      loading: false
    }
    case IActionType.ADD_POST: return {
      ...state,
      allPosts: [
        {...action.payload.post},
        ...state.allPosts
      ]
    }
    case IActionType.REMOVE_POST: return {
      ...state,
      allPosts: state.allPosts.filter(el => el.id !== action.payload.id),
      bookedPosts: state.bookedPosts.filter(el => el.id !== action.payload.id),
    }
    case IActionType.TOGGLE_BOOKED: {
      const allPosts = state.allPosts.map(post => {
        if (post.id === action.payload.id) {
          post.booked = !post.booked;
        }
        return post;
      });
      return {
        ...state,
        allPosts,
        bookedPosts: allPosts.filter(post => post.booked)
      }
    }
    default: return state;
  }
}
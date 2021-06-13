import * as FileSystem from 'expo-file-system';
import { isNull } from 'util';
import { Post } from '../../components/Post';
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

export const addPost = (postData: IPostData): IActionFunction => {
  return async dispatch => {
    // Перемещение фотографии из временного хранилище в файловую систему
    const fileName = postData.img.split('/').pop();
    if(fileName === null) {
      throw new Error('объект не был помещен во временное хранилище');
    }
    const documentDirectory = FileSystem.documentDirectory;
    if (documentDirectory === null) {
      throw new Error('Не удалось получить доступ к файловой директории');
    }
    const newPath = documentDirectory + fileName;
    try {
      FileSystem.moveAsync({
        from: postData.img,
        to: newPath
      })
    } catch (e) {
      throw new Error('Ошибка перемещения файла из временного хранилище в файловую систему: ' + e);
    }
    // Новый пост с картинкой из файловой системы
    const newPostData = { ...postData, img: newPath }
    // Добавление поста в базу данных
    const id = await DB.createPost(newPostData) as string;
    // Новый пост с id из базы данных
    const post: IPost = {...newPostData, id }
    dispatch({
      type: IActionType.ADD_POST,
      payload: { post }
    });
  }
}

export const removePost = (id: string): IActionFunction => (
  async dispatch => {
    await DB.removePost(id);
    dispatch({
      type: IActionType.REMOVE_POST,
      payload: { id }
    })
  }
)

export const toggleBooked = (id: string, booked: boolean): IActionFunction => (
  async dispatch => {
    await DB.updatePost(id, booked);
    dispatch({
      type: IActionType.TOGGLE_BOOKED,
      payload: { id }
    })
  }
)
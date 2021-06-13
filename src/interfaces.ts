export interface IPostData {
  img: string,
  text: string,
  date: string,
  booked: Boolean
}

export interface IPost extends IPostData {
  id: string
}
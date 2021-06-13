export interface IPostData {
  img: string,
  text: string,
  date: string,
  booked: boolean
}

export interface IPost extends IPostData {
  id: string
}
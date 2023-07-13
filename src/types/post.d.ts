export interface Comments {
  userId: string,
  commentId: string,
  username: string,
  comment: string,
  timestamp: number,
}

export interface Post {
  postId: string,
  userId: string,
  author: string,
  timestamp: number,
  imgurl: string,
  likes?: number,
  title: string,
  tags?: [string]
  comments?: comments[]
}
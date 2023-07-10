export interface Post {
  id: string,
  userId: string,
  author: string,
  timestamp: number,
  imgurl: string,
  likes: number,
  title: string,
  tags: [string]
  comments: [{
    userId: string,
    commentId: string,
    user: string,
    comment: string,
    timestamp: number,
  }]
}

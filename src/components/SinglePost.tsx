import { Post } from "../types/post"

function SinglePost(post:Post) {
  return(
    <div className="openp-container">
      {post.author}
    </div>
  )
}

export default SinglePost
import { Post } from "../types/post"
import test from "../assets/test.jpg"
import testavatar from "../assets/testavatar.jpg"

function SinglePost(post:Post) {
  return(
    <div onClick={e => e.stopPropagation()} className="openp-container">
      <div className="openp-img-container">
        <img className="openp-img" src={test} alt="test"></img>
      </div>
      <div className="openp-comment-container">
        <div className="openp-header">
          <img className="openp-avatar" src={testavatar}></img>
          <div className="openp-author"> {post.author} </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost
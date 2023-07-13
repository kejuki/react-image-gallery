import { Post } from "../types/post"
import test from "../assets/test.jpg"
import testavatar from "../assets/testavatar.jpg"


const SinglePost = ({currentPost} : {currentPost: Post | undefined}) => {
  return(
    <div onClick={e => e.stopPropagation()} className="openp-container">
      <div className="openp-img-container">
        <img className="openp-img" src={test} alt="test"></img>
      </div>
      <div className="openp-comment-container">
        <div className="openp-header">
          <img className="openp-avatar" src={testavatar}></img>
          <div className="openp-author"> {currentPost?.author} </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost
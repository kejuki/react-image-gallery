import { Post, Comments } from "../types/post"
import '../css/OpenedPost.css'
import test from "../assets/test.jpg"
import testavatar from "../assets/testavatar.jpg"

const OpenedPost = ({currentPost} : {currentPost: Post | undefined}) => {
  return(
    <div onClick={e => e.stopPropagation()} className="openp-container">
      <div className="openp-img-container">
        <img className="openp-img" src={test} alt="test"></img>
      </div>
      <div className="openp-comment-container">
        <div className="openp-header-and-comments-container">
          <div className="openp-header">
            <img className="openp-avatar" src={testavatar}></img>
            <div className="openp-author"> {currentPost?.author} </div>
          </div>
          <div className="openp-comments">
            {currentPost?.comments?.map((comment:Comments, i) => 
              <div key={i} className="openp-comment">
                {comment.username} {comment.comment}
              </div>
            )}
          </div>
        </div>
        <div className="openp-comment-bottom">
          <div className="openp-like-btn-container">
            <button className="openp-like-btn">like</button>
          </div>
          <div className="openp-add-comment-container">
              <textarea className="openp-textarea" placeholder="Add a comment..."></textarea>
              <button className="openp-add-comment-btn" >post</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OpenedPost
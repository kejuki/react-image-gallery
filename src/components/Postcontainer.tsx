import { useEffect, useState } from "react"
import { useInfiniteQuery } from "react-query"
import { getPostsPaginated } from "../api/postsRoutes"
import "./OpenedPost.css"
import test from "../assets/test.jpg"
import { Post } from "../types/post"
import SinglePost from "./SinglePost"
import testavatar from "../assets/testavatar.jpg"

function Postcontainer(){
  const { 
    status,
    error,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage, 
    } = useInfiniteQuery(
      "posts", 
      getPostsPaginated, {
      getNextPageParam: (lastPage, pages) => {
        console.log(lastPage)
        if(lastPage.page < lastPage.totalPages) return lastPage.page + 1
        return false
      }
  })

  const [showMore, setShowMore] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<Post | undefined>(undefined)

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  console.log(data)
  return(
    <div id='post-wrapper'>
      {showMore ? 
        <div onClick={()=>setShowMore(false)} className="openp-root">
          <button onClick={()=>setShowMore(false)} className="openp-closebtn">X</button>
          <SinglePost currentPost={currentPost}></SinglePost>
        </div> 
      : null}
      {data?.pages?.map((page, i) => (
        <div key={i}>
          {page.posts.map((post:Post) => (
            <article className="post-post" key={post.postId}>
              <div>
                <header className="post-header">
                  <div className="post-avatar-container">
                    <img className="post-avatar" src={testavatar}></img>
                  </div>
                  <div className="post-author-timestamp-container">
                    <div className="post-author">
                      {post.author}
                    </div>
                    <div className="post-timestamp">
                      {new Date(post.timestamp).toDateString()}
                    </div>
                  </div>
                </header>
                <div>
                  <img className="post-img" src={test}></img>
                </div>
                <div className="post-actions-bar">
                  <button className="post-likes">like</button>
                  <button className="post-comment">comment</button>
                  <button className="post-share">share</button>
                </div>
                <div className="post-like-count">{`${post.likes} likes`}</div>
                <div className="post-comments-container">
                  <div className="post-title-bar">
                    <div className="post-title-author">{post.author}</div>
                    <div className="post-title">
                      {post.title} 
                      {post.tags?.map((tag) => {
                        return(" #" + tag)
                      })}
                    </div>
                  </div>
                  <div className="post-comments">
                    {post.comments?.slice(0,2).map((comment, i)=>(
                      <div key={i}>{comment.username} {comment.comment}</div>
                      )
                    )}
                    <button onClick={()=>{setShowMore(true); setCurrentPost(post)}}>show more</button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      ))}
      {isFetching && <p>Loading ...</p>}
      {hasNextPage && <button onMouseOver={fetchNextPage}>Load More</button>}
    </div>
  )
}

export default Postcontainer
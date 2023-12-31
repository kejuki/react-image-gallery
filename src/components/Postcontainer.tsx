import { useState, useEffect } from "react"
import { useInfiniteQuery } from "react-query"
import { getPostsPaginated } from "../api/postsRoutes"
import "../css/MainCol.css"
import test from "../assets/test.jpg"
import { Post } from "../types/post"
import OpenedPost from "./OpenedPost"
import testavatar from "../assets/testavatar.jpg"

const Postcontainer = () => {
  //useInfiniteQuery hook from react query loads posts paginated initially and when fetchNewPage is called
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
        return undefined
      }
  })

  const [showMore, setShowMore] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<Post | undefined>(undefined)

  const handleScroll = () => {
    let scrollH = document.getElementsByClassName("maincol")[0].scrollHeight
    let scrollT = document.getElementsByClassName("maincol")[0].scrollTop
    let windowH = window.innerHeight
    console.log(hasNextPage)
    if(scrollH - 1200 - windowH < scrollT || isFetching || !hasNextPage){
      fetchNextPage()
    }
  }

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  console.log(data)
  return(
    <div className="maincol" onScroll={handleScroll}>
      <div id='post-wrapper'>
        {showMore ? //shows a detailed post when clicking show more
          <div onClick={()=>setShowMore(false)} className="openp-root">
            <button onClick={()=>setShowMore(false)} className="openp-closebtn">X</button>
            <OpenedPost currentPost={currentPost}/>
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
      </div>
    </div>
  )
}

export default Postcontainer
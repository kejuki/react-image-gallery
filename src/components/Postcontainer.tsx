import { useEffect, useState } from "react"
import { useInfiniteQuery } from "react-query"
import { getPostsPaginated } from "../api/postsRoutes"
import test from "../assets/test.jpg"

interface Post {
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

  if (status === "loading") return <h1>Loading...</h1>
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>

  console.log(data)
  return(
    <div id='post-wrapper'>
      {data?.pages?.map((page, i) => (
        <div key={i}>
          {page.posts.map((post:Post) => (
            <article className="post-post" key={post.id}>
              <div>
                <header className="post-header">
                  <div className="post-avatar">
                    <img></img>
                  </div>
                  <div className="post-author">
                    {post.author}
                  </div>
                  <div className="post-timestamp">
                    {new Date(post.timestamp).toDateString()}
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
                      {post.tags.map((tag) => {
                        return(" #" + tag)
                      })}
                    </div>
                  </div>
                  <div className="post-comments">
                    {post.comments.slice(0,2).map((comment, i)=>(
                      <div key={i}>{comment.user} {comment.comment}</div>
                      )
                    )}
                    <button >show more</button>
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
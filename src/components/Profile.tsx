import { getUser } from "../api/profileRoutes"
import { useQuery, useInfiniteQuery } from 'react-query'
import { useState } from "react"
import { getPostsPaginatedByuserId } from "../api/postsRoutes"
import OpenedPost from "./OpenedPost"
import testavatar from "../assets/testavatar.jpg"
import test from "../assets/test.jpg"
import '../css/profile.css'
import { Post } from "../types/post"

function Profile(){

  //dummy uid before users are implemented properly
  const userId = 'userId1'
  const user = useQuery({
    queryKey: ['user', userId], 
    queryFn: () => getUser(userId),
  })

  const { 
    status,
    error,
    data,
    isFetching,
    hasNextPage,
    fetchNextPage,
    } = useInfiniteQuery(
      ["posts", userId], 
      ({pageParam, queryKey}) => getPostsPaginatedByuserId({pageParam}, queryKey[1]), {
      getNextPageParam: (lastPage, pages) => {
        if(lastPage.page < lastPage.totalPages) return lastPage.page + 1
        return false
      }
  })

  const [showMore, setShowMore] = useState<boolean>(false)
  const [currentPost, setCurrentPost] = useState<Post | undefined>(undefined)

  if (user.status === "error") return (<div>Something went wrong...</div>)
  if (user.status === "loading") return (<div>loading...</div>)

  return(
    <div id="profile-wrapper">
      {showMore ? //shows a detailed post when clicking show more
        <div onClick={()=>setShowMore(false)} className="openp-root">
          <button onClick={()=>setShowMore(false)} className="openp-closebtn">X</button>
          <OpenedPost currentPost={currentPost}/>
        </div> 
      : null}
      <div className="profile-header">
        <div className="profile-avatar-container">
          <img className="profile-avatar" src={testavatar}></img>
        </div>
        <div className="profile-text">
          <div className="profile-actions">
            <div className="profile-name">{user?.data?.username}</div>
            <button className="profile-follow-btn">follow</button>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">444 posts</div>
            <div className="profile-stat">555 followers</div>
            <div className="profile-stat">666 following</div>
          </div>
          <div className="profile-realname">{user?.data?.realname}</div>
          <div className="profile-description">{user?.data?.description}</div>
        </div>
      </div>
      {status === "loading" ? <>loading...</> : 
      <div className="profile-posts">
        {data?.pages?.map((page, i) => (
          <div key={i} className="profile-posts-cotainer">
            {page?.posts?.map((post: Post)=>(
              <article key={post.postId} className="profile-post">
                <div className="profile-post-cover" onClick={()=>{setShowMore(true); setCurrentPost(post)}}></div>
                <img className="profile-post-image" src={test}></img>
              </article>
            ))}
          </div>
        ))}
      {isFetching && <p>Loading ...</p>}
      {hasNextPage && <button onMouseOver={fetchNextPage}>Load More</button>}
      </div>
      }
    </div>
  )
}

export default Profile
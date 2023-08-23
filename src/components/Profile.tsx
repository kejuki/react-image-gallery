import { getUser } from "../api/profileRoutes"
import { useQuery, useInfiniteQuery } from 'react-query'
import { getPostsPaginatedByuserId } from "../api/postsRoutes"
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

  if (user.status === "loading") return (<div>loading...</div>)

  return(
    <div id="profile-wrapper">
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
                <div>
                  <img className="profile-post-image" src={test}></img>
                </div>
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
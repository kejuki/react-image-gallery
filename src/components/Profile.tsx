import { getUser } from "../api/profileRoutes"
import { useQuery, useInfiniteQuery } from 'react-query'
import testavatar from "../assets/testavatar.jpg"
import '../css/profile.css'

function Profile(){

  //dummy uid before users are implemented properly
  const userId = 'userId1'
  const user = useQuery({
    queryKey: ['user', userId], 
    queryFn: () => getUser(userId),
  })

  



  if (user.status === "loading") return (<div>loading...</div>)
  console.log(user)
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
          <div className="prfile-description">{user?.data?.description}</div>
        </div>
      </div>

    </div>
  )
}

export default Profile
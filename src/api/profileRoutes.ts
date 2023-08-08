import axios from "axios"

export function getUser(userId: string): Promise<any>{
  return axios.get(`http://localhost:3001/users/${userId}`)
    .then(res => {return res.data} )
}
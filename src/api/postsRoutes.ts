import axios from "axios"

export function getPosts(): Promise<any>{
  return axios.get(`http://localhost:3001/igposts`)
    .then(res => {return res.data} )
}


export function getPostsPaginated({ pageParam = 1 }): Promise<any>{
  return axios.get(`http://localhost:3001/igposts?page=${pageParam}`)
    .then(res => {return res.data} )
}

export function getPostsPaginatedByuserId({ pageParam = 1 }, userId:string): Promise<any>{
  return axios.get(`http://localhost:3001/igposts/${userId}?page=${pageParam}`)
    .then(res => {return res.data} )
}

export function getPostsById(id: string): Promise<any>{
  return axios.get(`http://localhost:3001/igposts/${id}`)
    .then(res => { return res.data })
}
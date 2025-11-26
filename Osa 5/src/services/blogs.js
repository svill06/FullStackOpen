import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async blog => {
  const res = await axios.post(baseUrl, blog, {
    headers: { Authorization: token }
  })
  return res.data
}

const update = async blog => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, {
    headers: { Authorization: token }
  })
  return res.data
}

const remove = async blog => {
  const res = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: token }
  })
  return res.data
}

export default { getAll, create, update, remove, setToken }

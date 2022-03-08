import axios from 'axios'
import userService from './user'

const baseUrl = '/api/blogs'

const config = () => ({ headers: { Authorization: `bearer ${userService.getToken()}` } })

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}
const create = async newBlog => {
    const response = await axios.post(baseUrl, newBlog, config())
    return response.data
}

const update = async updatedBlog => {
    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config())
    return response.data
}
const remove = async removedBlog => {
    const response = await axios.delete(`${baseUrl}/${removedBlog.id}`, config())
    return response.data
}

export default { getAll, create, update, remove }

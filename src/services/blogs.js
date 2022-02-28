import axios from 'axios'

const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async newBlog => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newBlog, config)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export default { getAll, create, setToken }

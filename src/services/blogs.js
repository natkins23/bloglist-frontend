import axios from 'axios'

const baseUrl = '/api/blogs'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const create = async newBlog => {
    console.log(token)
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newBlog, config)
    console.log(response)
    return response.data
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export default { getAll, create, setToken }

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        blogService.getAll().then(b => setBlogs(b))
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
        }
    }, [])

    const notifyWith = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }
    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedUser')
        notifyWith(`Logged out!`)
    }
    const handleLogin = async event => {
        event.preventDefault()
        try {
            const loggedUser = await loginService.login({
                username,
                password,
            })
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            setUsername('')
            setPassword('')
            notifyWith(`${username} logged in!`)
        } catch (error) {
            notifyWith(`Failed to login: ${error.response.data.error}`, 'error')
        }
    }
    const addBlog = async event => {
        event.preventDefault()
        try {
            const newBlogObject = {
                title,
                author,
                url,
            }
            const createdBlog = await blogService.create(newBlogObject)
            setBlogs(blogs.concat(createdBlog))
            setAuthor('')
            setTitle('')
            setUrl('')
            notifyWith(`${createdBlog.title} by ${createdBlog.author} was just added!`)
        } catch (error) {
            notifyWith(`Failed to add blog: ${error.response.data.error}`, 'error')
        }
    }
    const blogForm = () => (
        <>
            <h2>Add Blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input type="text" value={title} name="Title" onChange={({ target }) => setTitle(target.value)} />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input type="text" value={url} name="url" onChange={({ target }) => setUrl(target.value)} />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
    const loginForm = () => (
        <>
            <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </>
    )
    const showBlogs = () => (
        <>
            <p>
                Hi {user.name}!
                <button type="button" onClick={handleLogout}>
                    logout
                </button>
            </p>

            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
            {blogForm()}
        </>
    )
    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            {user === null ? loginForm() : showBlogs()}
        </div>
    )
}
export default App

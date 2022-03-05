import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
    const [blogs, setBlogs] = useState([])
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
    const logout = () => {
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loggedUser')
        notifyWith(`Logged out!`)
    }
    const login = async (username, password) => {
        try {
            const loggedUser = await loginService.login({
                username,
                password,
            })
            setUser(loggedUser)
            blogService.setToken(loggedUser.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
            notifyWith(`${username} logged in!`)
        } catch (error) {
            notifyWith(`Failed to login: ${error.response.data.error}`, 'error')
        }
    }

    const createBlog = async blogObject => {
        try {
            blogFormRef.current.toggleVisibility()
            const createdBlog = await blogService.create(blogObject)
            setBlogs(blogs.concat(createdBlog))
            notifyWith(`${createdBlog.title} by ${createdBlog.author} was just added!`)
        } catch (error) {
            notifyWith(`Failed to add blog: ${error.response.data.error}`, 'error')
        }
    }
    const blogFormRef = useRef()
    const newBlogForm = () => (
        <Togglable buttonLabel="add blog" ref={blogFormRef}>
            <NewBlogForm createBlog={createBlog} />
        </Togglable>
    )

    const loginForm = () => (
        <Togglable buttonLabel="login">
            <LoginForm onLogin={login} />
        </Togglable>
    )

    const showBlogs = () => (
        <>
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </>
    )
    return (
        <div>
            <h2>blogs</h2>
            <Notification notification={notification} />
            {user === null ? (
                loginForm()
            ) : (
                <div>
                    <p>
                        Hi {user.name}!
                        <button type="button" onClick={logout}>
                            logout
                        </button>
                    </p>
                    {newBlogForm()}
                </div>
            )}
            <br />
            {showBlogs()}
        </div>
    )
}
export default App

import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'

function App() {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [notification, setNotification] = useState(null)
    const blogFormRef = useRef()
    const byLikes = (b1, b2) => (b2.likes > b1.likes ? 1 : -1)
    useEffect(() => {
        blogService.getAll().then(b => setBlogs(b.sort(byLikes)))
    }, [])

    useEffect(() => {
        const userFromStorage = userService.getUser()
        if (userFromStorage) {
            setUser(userFromStorage)
        }
    }, [])

    const login = async (username, password) => {
        try {
            const loggedUser = await loginService.login({
                username,
                password,
            })
            setUser(loggedUser)
            userService.setUser(loggedUser)
            notifyWith(`${username} logged in!`)
        } catch (error) {
            notifyWith(`Failed to login: ${error.response.data.error}`, 'error')
        }
    }

    const logout = () => {
        setUser(null)
        userService.clearUser()
        notifyWith(`Logged out!`)
    }

    const createBlog = async newBlog => {
        try {
            blogFormRef.current.toggleVisibility()
            const createdBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(createdBlog))
            notifyWith(`${createdBlog.title} was just added!`)
        } catch (error) {
            notifyWith(`Failed to add blog: ${error.response.data.error}`, 'error')
        }
    }

    const likeBlog = async blogToLike => {
        const likedBlog = {
            ...blogToLike,
            likes: blogToLike.likes + 1,
            user: blogToLike.user.id,
        }
        try {
            const updatedBlog = await blogService.update(likedBlog)
            notifyWith(`You just liked "${updatedBlog.title}!"`)
            const updatedBlogs = blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
            setBlogs(updatedBlogs)
        } catch (error) {
            notifyWith(`Failed to add blog: ${error.response.data.error}`, 'error')
        }
    }

    const removeBlog = async blogToRemove => {
        try {
            const updatedBlog = await blogService.remove(blogToRemove)
            notifyWith(`Just deleted a blog`)
            const updatedBlogs = blogs.filter(b => b.id !== updatedBlog.id)
            setBlogs(updatedBlogs)
        } catch (error) {
            notifyWith(`Failed to remove blog: ${error.response.data.error}`, 'error')
        }
    }
    const notifyWith = (message, type = 'success') => {
        setNotification({ message, type })
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    // ---JSX---
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
                <Blog key={blog.id} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
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

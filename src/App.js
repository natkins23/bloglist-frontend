// Features to add
// 1) notifications like with the countries project
// 2) change blogService to use async await

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
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

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
    const handleLogout = () => {
        console.log('logging out of', user.username)
        setUser(null)
        window.localStorage.removeItem('loggedUser')
    }
    const handleLogin = async event => {
        event.preventDefault()
        console.log('logging in with', username, password)
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
        } catch (exception) {
            console.log('exception', exception)
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const addBlog = async event => {
        event.preventDefault()
        console.log(user)
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
            <Notification message={errorMessage} />
            {user === null ? loginForm() : showBlogs()}
        </div>
    )
}
export default App

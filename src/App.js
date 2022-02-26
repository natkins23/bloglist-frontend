// Features to add
// 1) notifications like with the countries project
// 2) change blogService to use async await
//

import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

function App() {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(b => setBlogs(b))
    }, [])

    const handleLogin = async event => {
        event.preventDefault()
        console.log('logging in with', username, password)
        try {
            const userToken = await loginService.login({
                username,
                password,
            })
            setUser(userToken)
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
            <p>{user.name} logged-in</p>
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
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

import { useState } from 'react'

function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async event => {
        event.preventDefault()
        onLogin(username, password)
        setUsername('')
        setPassword('')
    }
    
    return (
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
}
export default LoginForm

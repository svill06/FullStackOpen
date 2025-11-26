import { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const submit = e => {
    e.preventDefault()
    handleLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={submit}>
      <div>
        username <input id="username" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password <input id="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )
}

export default LoginForm

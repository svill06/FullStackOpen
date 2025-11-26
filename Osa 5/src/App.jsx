import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(setBlogs)
    }
  }, [])

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setMessage('Logged in successfully')
      setMessageType('success')
      setTimeout(() => setMessage(null), 5000)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    } catch (error) {
      setMessage('wrong username or password')
      setMessageType('error')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = async blog => {
    try {
      const newBlog = await blogService.create(blog)
      setBlogs(blogs.concat(newBlog))
      setMessage(`A new blog "${newBlog.title}" added`)
      setMessageType('success')
      setTimeout(() => setMessage(null), 5000)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setMessage('Failed to add blog')
      setMessageType('error')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const updateLikes = async blog => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id || blog.user }
    await blogService.update(updatedBlog)
    setBlogs(blogs.map(b => (b.id === blog.id ? { ...b, likes: b.likes + 1 } : b)))
  }

  const removeBlog = async blog => {
    if (window.confirm(`Remove blog ${blog.title}?`)) {
      await blogService.remove(blog)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={messageType} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable buttonLabel="create new" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog key={blog.id} blog={blog} updateLikes={updateLikes} removeBlog={removeBlog} user={user} />
      ))}
    </div>
  )
}

export default App

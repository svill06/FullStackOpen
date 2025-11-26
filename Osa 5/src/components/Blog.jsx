import { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = { padding: 10, border: 'solid', borderWidth: 1, marginBottom: 5 }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible(!visible)}>{visible ? 'hide' : 'view'}</button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button className="like-button" onClick={() => updateLikes(blog)}>like</button>
          </div>
          <div>{blog.user?.name}</div>
          {user && blog.user?.username === user.username && (
            <button onClick={() => removeBlog(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog

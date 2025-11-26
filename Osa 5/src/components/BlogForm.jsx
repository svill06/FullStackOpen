import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title: <input id="title-input" value={title} onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        author: <input id="author-input" value={author} onChange={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        url: <input id="url-input" value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

export default BlogForm

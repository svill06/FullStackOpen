const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((fav, blog) => blog.likes > fav.likes ? blog : fav)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + 1
  })
  const top = Object.entries(authors).reduce((a, b) => a[1] > b[1] ? a : b)
  return { author: top[0], blogs: top[1] }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const authors = {}
  blogs.forEach(blog => {
    authors[blog.author] = (authors[blog.author] || 0) + blog.likes
  })
  const top = Object.entries(authors).reduce((a, b) => a[1] > b[1] ? a : b)
  return { author: top[0], likes: top[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

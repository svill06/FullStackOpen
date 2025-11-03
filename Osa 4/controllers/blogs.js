const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const user = req.user
  if (!user) return res.status(401).json({ error: 'token missing or invalid' })

  const body = req.body
  if (!body.title || !body.url) return res.status(400).json({ error: 'title or url missing' })

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).end()
  if (blog.user.toString() !== user.id.toString()) return res.status(401).json({ error: 'unauthorized' })

  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const { likes } = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, { likes }, { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter

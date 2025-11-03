const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

const app = express()
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)

mongoose.connect('mongodb://localhost/bloglist')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err))

module.exports = app

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const api = supertest(app)

let token
let userId

beforeAll(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('password', 10)
  const user = await new User({ username: 'testuser', passwordHash }).save()
  userId = user.id

  const response = await api.post('/api/login').send({ username: 'testuser', password: 'password' })
  token = response.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await new Blog({ title: 'First', author: 'Alice', url: 'http://first.com', likes: 1, user: userId }).save()
})

test('blogs are returned as JSON', async () => {
  await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('a valid blog can be added', async () => {
  const newBlog = { title: 'Second', author: 'Bob', url: 'http://second.com', likes: 2 }
  await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)

  const blogs = await Blog.find({})
  expect(blogs).toHaveLength(2)
})

test('blog without token is rejected', async () => {
  const newBlog = { title: 'Third', author: 'Carol', url: 'http://third.com' }
  await api.post('/api/blogs').send(newBlog).expect(401)
})

afterAll(async () => {
  await mongoose.connection.close()
})

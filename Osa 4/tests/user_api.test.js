const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send({ username: 'root', name: 'Admin', password: 'secret' })
})

test('creation succeeds with a fresh username', async () => {
  const newUser = { username: 'newuser', name: 'New', password: 'password' }
  await api.post('/api/users').send(newUser).expect(201)

  const users = await User.find({})
  expect(users).toHaveLength(2)
})

test('creation fails with short password', async () => {
  const newUser = { username: 'short', name: 'Short', password: 'pw' }
  await api.post('/api/users').send(newUser).expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})

const app = require('./app')
const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}).on('error', (err) => {
  console.error('Error starting server:', err)
})

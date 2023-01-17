const gateway = require('fast-gateway')

const PORT = process.env.PORT || 8000

const server = gateway({
  routes: [
    {
      prefix: '/user',
      target: 'http://localhost:8001'
    },
    {
      prefix: '/post',
      target: 'http://localhost:8002'
    }
  ]
})

server.get('/', (req, res) => {
  res.send('Gateway running')
})

server.start(PORT).then(server => {
  console.log(`Gateway running on http://localhost:${PORT}`)
})

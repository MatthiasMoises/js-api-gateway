const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8002

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

let posts = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil repqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 2,
    id: 11,
    title: "et ea vero quia laudantium autem",
    body: "delectus reiciendis molestiae occaecati non minima eveniet qui voluptatibus accusamus in eum beatae sit"
  }
]

app.get('/get', (req, res) => {
  res.status(200).json(posts)
})

app.get('/:id/get', (req, res) => {
  const id = parseInt(req.params.id)
  const post = posts.find(post => post.id === id)

  res.status(200).json(post)
})

app.get('/get/user/:id', (req, res) => {
  const userId = parseInt(req.params.id)
  const userPosts = posts.filter(post => post.userId === userId)

  res.status(200).json(userPosts)
})

app.post('/create', (req, res) => {
  const lastId = [...posts].pop().id

  const { userId, title, body } = req.body

  if (userId && title && body) {
    const newId = lastId + 1

    const newPost = {
      userId,
      id: newId,
      title,
      body
    }

    posts.push(newPost)

    res.status(201).json(posts)
  } else {
    res.status(500).json({ error: 'Please fill out all fields' })
  }
})

app.put('/:id/update', (req, res) => {
  const id = parseInt(req.params.id)

  const postIndex = posts.find(post => post.id === id)

  if (postIndex !== -1) {
    const { userId, title, body } = req.body

    if (userId && title && body) {
      const updatedPost = {
        userId,
        id,
        title,
        body
      }

      posts.splice(postIndex, 1, updatedPost)
      res.status(200).json(updatedPost)
    } else {
      res.status(500).json({ error: 'Please fill out all fields' })
    }
  } else {
    res.status(404).json({ error: 'Post not found' })
  }
})

app.delete('/:id/delete', (req, res) => {
  const id = parseInt(req.params.id)
  const postIndex = posts.findIndex(post => post.id === id)

  posts.splice(postIndex, 1)

  res.status(200).json(posts)
})

app.listen(PORT, () => {
  console.log(`Post service running on http://localhost:${PORT}`)
})

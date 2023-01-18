const express = require('express')
const app = express()
const cors = require('cors')

const PORT = process.env.PORT || 8001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

let users = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "Sincere@april.biz"
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv"
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "Nathan@yesenia.net"
  }
]

app.get('/get', (req, res) => {
  res.status(200).json(users)
})

app.get('/:id/get', (req, res) => {
  const id = parseInt(req.params.id)
  const user = users.find(user => user.id === id)

  res.status(200).json(user)
})

app.post('/create', (req, res) => {
  const lastId = [...users].pop().id

  const { name, username, email } = req.body

  if (name && username && email) {
    const newId = lastId + 1

    const newUser = {
      id: newId,
      name,
      username,
      email
    }

    users.push(newUser)

    res.status(201).json(users)
  } else {
    res.status(500).json({ error: 'Please fill out all fields' })
  }
})

app.put('/:id/update', (req, res) => {
  const id = parseInt(req.params.id)

  const userIndex = users.find(user => user.id === id)

  if (userIndex !== -1) {
    const { name, username, email } = req.body

    if (name && username && email) {
      const updatedUser = {
        id,
        name,
        username,
        email
      }

      users.splice(userIndex, 1, updatedUser)
      res.status(200).json(updatedUser)
    } else {
      res.status(500).json({ error: 'Please fill out all fields' })
    }
  } else {
    res.status(404).json({ error: 'User not found' })
  }
})

app.delete('/:id/delete', (req, res) => {
  const id = parseInt(req.params.id)
  const userIndex = users.findIndex(user => user.id === id)

  users.splice(userIndex, 1)

  res.status(200).json(users)
})

app.listen(PORT, () => {
  console.log(`User service running on http://localhost:${PORT}`)
})

import express from 'express'
import { database } from './database.ts'
import type { RowDataPacket } from 'mysql2/promise'
import bcrypt from 'bcrypt'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

interface Users extends RowDataPacket {
  id: number,
  name: string,
  email: number
}

interface User {
  id: number,
  email: string,
  password: string;
}

interface Settings {
  salary: number;
  user_id: number
}
app.post<User>('/api/create', async (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password) {
    return res.status(400).send('Name, email and password are required')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const [result] = await database.query('INSERT INTO users_table (name, email, password) VALUES (?, ?, ?);', [name, email, hashedPassword])
  res.send(result)
})

interface LoginRequest {
  id: number,
  email: string,
  password: string
}

app.post<LoginRequest>('/api/login', async (req, res) => {
  const { email, password } = req.body
  const [rows] = await database.query('SELECT * FROM users_table WHERE email = ?;', [email])
  const users = rows as LoginRequest[]
  if (users.length === 0) {
    return res.status(401).send('Invalid email or password')
  }
  const user = users[0]
  const isPasswordValid = await bcrypt.compare(password, user!.password)
  if (!isPasswordValid) {
    return res.status(401).send('Invalid email or password')
  }
  res.send({ user: { id: user!.id, email: user!.email } })
})

app.get('/api/users', async (req, res) => {
  const user_id = req.query.user_id
  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' })
  }
    const [results] = await database.query<Users[]>('SELECT * FROM users_table;')
    res.send(results)
    console.log(results);
})

app.get<Settings>('/api/settings', async (req, res) => {
  const user_id = req.query.user_id
  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" })
  }
  try {
    const [results] = await database.query('SELECT * FROM settings_table WHERE user_id = ? ', [user_id])
    res.json(results)

  } catch (err) {
    console.log(err)
  }
})

app.post<Settings>('/api/salary', async (req, res) => {
  const { user_id, salary } = req.body
   await database.query('UPDATE settings_table SET salary = ? WHERE user_id = ?', [salary, user_id])
  res.send({salary})
})

app.get('/api/transactions', async (req, res) => {
  const user_id = req.query.user_id

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' })
  }

    const [results] = await database.query('SELECT t.id, t.user_id, t.description, t.amount, t.category_id, c.name, c.type FROM transaction_table t JOIN category_table c ON t.category_id = c.id where t.user_id = ?',[user_id])
    res.send(results)
})

app.post('/api/transactions', async (req, res) => {
  const { user_id, description, amount, category_id } = req.body
  const [result] = await database.query('INSERT INTO transaction_table (user_id, description, amount, category_id) VALUES (?, ?, ?, ?);', [user_id, description, amount, category_id])
  res.send(result)
})


app.get('/api/categories', async (req, res) => {
  const user_id = req.query.user_id

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' })
  }

    const [results] = await database.query('SELECT * FROM category_table WHERE user_id = ?;', [user_id])
    res.send(results)
})

app.post('/api/categories', async (req, res) => {


  const { name, type, user_id } = req.body
  const [result] = await database.query('INSERT INTO category_table (name, type, user_id) VALUES (?, ?, ?);', [name, type, user_id])
  res.send(result)
})

app.listen(3000, () => {
  console.log('Webbtjänsten kan nu ta emot anrop.')
})

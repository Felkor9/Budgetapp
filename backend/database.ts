import mysql from 'mysql2/promise'

export const database = await mysql.createConnection({
  database: 'budgetapp',
  host: 'localhost',
  password: 'mypassword',
  user: 'root'
})

database.connect()

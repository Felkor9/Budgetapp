import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import { usersTable } from '../src/db/schema.ts';
import express from 'express';
import mysql from "mysql2/promise"

const app = express()

app.use(express.json())


export const database = await mysql.createConnection({
  database: 'budgetapp',
  host: 'localhost',
  password: 'mypassword',
  user: 'root'
})

const db = drizzle({client: database})

async function main() {

  app.get("/users", async (req, res) => {
    const result = await db.select().from(usersTable)
    res.json(result)
    console.log(result)

  })

  console.log("hej")
}
main();


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

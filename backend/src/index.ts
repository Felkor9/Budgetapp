import 'dotenv/config';
import { drizzle } from "drizzle-orm/mysql2";
import { categoryTable, transactionTable, usersTable } from '../src/db/schema.ts';
import express from 'express';
import mysql, { type RowDataPacket } from "mysql2/promise"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import type {Secret, SignOptions}  from "jsonwebtoken"
import { eq, name } from 'drizzle-orm';
import dotenv from "dotenv";
import { rmSync } from 'fs';



dotenv.config();
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

  app.get("/api/users", async (req, res) => {
    const result = await db.select().from(usersTable)
    res.json(result)
    console.log(result)
  })

  interface create extends RowDataPacket{
    id: number,
    name: string
    email: string,
    password: string
  }

  app.post("/api/createuser", async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(usersTable).values({
      name: name,
      email: email,
      password: hashedPassword
    })
    res.json({message: "User Created"})
  })

  app.post("/api/login", async (req, res) =>  {
    const { email, password } = req.body;

    const users = await db.select().from(usersTable).where(eq(usersTable.email, email))
    const user = users[0];
    if (!user) {
      return res.status(400)
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
      return res.status(401)
    }


    const secret: Secret = process.env.JWT_SECRET!;
    const expiresIn = process.env.JWT_EXPIRES || "1h";

     const token = jwt.sign(
    {
      id: user.id,
      email: user.email
    },secret, {expiresIn} as SignOptions

  );
    return res.json({
      message: "login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
      }
    })
  })



app.get("/api/transactions", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    const userId = (decoded as any).id;

    const result = await db
      .select({
        transactionId: transactionTable.id,
        amount: transactionTable.amount,
        description: transactionTable.description,
        userId: usersTable.id,
        userName: usersTable.name,
        userEmail: usersTable.email,
        categoryName: categoryTable.name,
        categoryType: categoryTable.type
      })
      .from(transactionTable)
      .leftJoin(usersTable, eq(transactionTable.user_id, usersTable.id))
      .leftJoin(categoryTable, eq(transactionTable.category_id, categoryTable.id))
      .where(eq(transactionTable.user_id, userId));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



  app.post("/api/transaction", async (req, res) => {
    try {
      const authHeader = req.headers.authorization
      if (!authHeader) return res.status(401).json({ error: "no token" })

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token!, process.env.JWT_SECRET!)
      const userId = (decoded as any).id

       const { amount, description, category_id, date } = req.body;

    if (!amount || !description || !category_id || !date) {
      return res.status(400).json({ error: "Missing fields" });
    }

    await db.insert(transactionTable).values({
      user_id: userId,
      category_id,
      amount,
      date,
      description,
    });

    res.json({ message: "Transaction added" });

    }catch(err) {
    console.error(err)
  }
  })



}



main();


app.listen(3000, () => {
  console.log("Server running on port 3000");
});

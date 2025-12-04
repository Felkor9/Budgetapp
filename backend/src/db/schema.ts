
import { sql, } from 'drizzle-orm';
import { datetime, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';


export const usersTable = mysqlTable('users_table', {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const categoryTable = mysqlTable('category_table', {
  id: int().autoincrement().primaryKey(),
  user_id: int().references(() => usersTable.id),
  name: varchar({ length: 255 }).notNull(),
  type: varchar({ length: 255 }).notNull(),
});

export const transactionTable = mysqlTable('transaction_table', {
  id: int().autoincrement().primaryKey(),
  user_id: int().references(() => usersTable.id),
  category_id: int().references(() => categoryTable.id),
  amount: int(),
  date: datetime(),
  description: varchar({ length: 255 }),
  created_at: datetime().default(sql`CURRENT_TIMESTAMP`)
});

export const budgetTable = mysqlTable('budget_table', {
  id: int().autoincrement().primaryKey(),
  user_id: int().references(() => usersTable.id),
  category_id: int().references(() => categoryTable.id).notNull(),
  amount_limit: int().notNull(),
  month: int().notNull(),
  year: int().notNull(),
});

// INSERT INTO category_table(user_id, name, type)Values(6, "Sovrum", "Sovrum");
// INSERT INTO transaction_table(user_id, category_id, amount, description)Values(6, "1", 50, "Computer");
// INSERT INTO budget_table(user_id, category_id, amount_limit, month, year)Values(6, 1, 600, 2, 2025);

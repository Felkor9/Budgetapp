import { defineConfig } from "cypress";
import {database} from "../backend/database"

export default defineConfig({
  e2e: {
    setupNodeEvents(on) {
      on("task", {
        clearTestUsers() {
          return database.query('Delete from users_table WHERE name = "Vanja";')
        },
        clearTestDesc() {
          return database.query('DELETE FROM transaction_table WHERE description = "test";')
        },
        clearTelia() {
          return database.query('DELETE FROM transaction_table WHERE description = "Telia";')
        },
        clearCat() {
          return database.query('DELETE FROM category_table where name = "TV-abonemang";')
        }
      })
    },
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",

    },
  },
});

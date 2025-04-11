import { pgTable, serial, varchar, text } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull(),
  password: text("password").notNull(),
  email: varchar("email", { length: 255 }).notNull(),
});

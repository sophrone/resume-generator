import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const Profile = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  bio: text("bio"),
  skills: text("skills"),
});

import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

export const JobListing = pgTable("job_listings", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  postedAt: timestamp("posted_at").defaultNow(),
  requirements: text("requirements"), // Optional field for job requirements
});

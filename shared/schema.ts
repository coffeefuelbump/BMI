import { pgTable, text, serial, integer, boolean, real, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const bmiRecords = pgTable("bmi_records", {
  id: serial("id").primaryKey(),
  age: integer("age").notNull(),
  height: real("height").notNull(),
  weight: real("weight").notNull(),
  heightUnit: text("height_unit").notNull(),
  weightUnit: text("weight_unit").notNull(),
  bmi: real("bmi").notNull(),
  category: text("category").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertBMIRecordSchema = createInsertSchema(bmiRecords).omit({
  id: true,
  createdAt: true,
});

export const bmiCalculationSchema = z.object({
  age: z.number().min(1, "Age must be at least 1").max(120, "Age must be less than 120"),
  height: z.number().min(0.1, "Height must be greater than 0"),
  weight: z.number().min(0.1, "Weight must be greater than 0"),
  heightUnit: z.enum(["cm", "ft"]),
  weightUnit: z.enum(["kg", "lbs"]),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBMIRecord = z.infer<typeof insertBMIRecordSchema>;
export type BMIRecord = typeof bmiRecords.$inferSelect;
export type BMICalculation = z.infer<typeof bmiCalculationSchema>;

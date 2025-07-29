import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, json, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  workoutsCompleted: integer("workouts_completed").default(0),
  totalMinutes: integer("total_minutes").default(0),
  currentStreak: integer("current_streak").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const exercises = pgTable("exercises", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  targetAreas: json("target_areas").$type<string[]>().notNull(),
  difficulty: integer("difficulty").notNull(), // 1-5
  equipment: text("equipment").default("none"),
  instructions: json("instructions").$type<string[]>().notNull(),
  imageUrl: text("image_url"),
  animationSteps: json("animation_steps").$type<string[]>(),
});

export const workouts = pgTable("workouts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  duration: integer("duration").notNull(), // in minutes
  targetArea: text("target_area").notNull(),
  goal: text("goal").notNull(),
  exercises: json("exercises").$type<WorkoutExercise[]>().notNull(),
  completedAt: timestamp("completed_at"),
  isFavorite: boolean("is_favorite").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const workoutSessions = pgTable("workout_sessions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  workoutId: varchar("workout_id").references(() => workouts.id),
  duration: integer("duration").notNull(), // actual duration in seconds
  exercisesCompleted: integer("exercises_completed").notNull(),
  caloriesBurned: integer("calories_burned"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertExerciseSchema = createInsertSchema(exercises).omit({
  id: true,
});

export const insertWorkoutSchema = createInsertSchema(workouts).omit({
  id: true,
  createdAt: true,
});

export const insertWorkoutSessionSchema = createInsertSchema(workoutSessions).omit({
  id: true,
  completedAt: true,
});

// Workout configuration schema
export const workoutConfigSchema = z.object({
  duration: z.enum(["3", "5", "10", "15"]),
  targetArea: z.enum(["full-body", "legs", "abs", "upper-body"]),
  goal: z.enum(["fat-loss", "endurance", "strength"]),
});

// Exercise timing schema
export const workoutExerciseSchema = z.object({
  exerciseId: z.string(),
  name: z.string(),
  description: z.string(),
  workDuration: z.number(), // seconds
  restDuration: z.number(), // seconds
  instructions: z.array(z.string()),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Exercise = typeof exercises.$inferSelect;
export type InsertExercise = z.infer<typeof insertExerciseSchema>;
export type Workout = typeof workouts.$inferSelect;
export type InsertWorkout = z.infer<typeof insertWorkoutSchema>;
export type WorkoutSession = typeof workoutSessions.$inferSelect;
export type InsertWorkoutSession = z.infer<typeof insertWorkoutSessionSchema>;
export type WorkoutConfig = z.infer<typeof workoutConfigSchema>;
export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;

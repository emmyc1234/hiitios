import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { workoutConfigSchema, insertWorkoutSessionSchema } from "@shared/schema";
import { generateWorkout } from "../client/src/lib/workout-generator";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all exercises
  app.get("/api/exercises", async (req, res) => {
    try {
      const exercises = await storage.getAllExercises();
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exercises" });
    }
  });

  // Get exercises by target area
  app.get("/api/exercises/:targetArea", async (req, res) => {
    try {
      const { targetArea } = req.params;
      const exercises = await storage.getExercisesByTargetArea(targetArea);
      res.json(exercises);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch exercises" });
    }
  });

  // Generate workout based on configuration
  app.post("/api/generate-workout", async (req, res) => {
    try {
      const config = workoutConfigSchema.parse(req.body);
      const allExercises = await storage.getAllExercises();
      
      const workout = generateWorkout(config, allExercises);
      
      res.json(workout);
    } catch (error) {
      console.error("Workout generation error:", error);
      res.status(400).json({ message: "Invalid workout configuration" });
    }
  });

  // Save workout to favorites
  app.post("/api/workouts", async (req, res) => {
    try {
      // For demo purposes, we'll create a mock user
      const userId = "demo-user";
      
      const workoutData = {
        ...req.body,
        userId
      };
      
      const workout = await storage.createWorkout(workoutData);
      res.json(workout);
    } catch (error) {
      res.status(500).json({ message: "Failed to save workout" });
    }
  });

  // Toggle workout favorite status
  app.patch("/api/workouts/:id/favorite", async (req, res) => {
    try {
      const { id } = req.params;
      const { isFavorite } = req.body;
      
      const workout = await storage.toggleWorkoutFavorite(id, isFavorite);
      res.json(workout);
    } catch (error) {
      res.status(500).json({ message: "Failed to update workout" });
    }
  });

  // Get user's favorite workouts
  app.get("/api/workouts/favorites", async (req, res) => {
    try {
      // For demo purposes, we'll use a mock user
      const userId = "demo-user";
      
      const favorites = await storage.getFavoriteWorkouts(userId);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch favorite workouts" });
    }
  });

  // Record completed workout session
  app.post("/api/workout-sessions", async (req, res) => {
    try {
      // For demo purposes, we'll use a mock user
      const userId = "demo-user";
      
      const sessionData = {
        ...req.body,
        userId
      };
      
      const validatedSession = insertWorkoutSessionSchema.parse(sessionData);
      const session = await storage.createWorkoutSession(validatedSession);
      
      // Update user progress
      const user = await storage.getUser(userId) || await storage.createUser({ username: "demo", password: "demo" });
      const newWorkoutsCompleted = user.workoutsCompleted + 1;
      const newTotalMinutes = user.totalMinutes + Math.floor(validatedSession.duration / 60);
      const newStreak = user.currentStreak + 1;
      
      await storage.updateUserProgress(userId, newWorkoutsCompleted, newTotalMinutes, newStreak);
      
      res.json(session);
    } catch (error) {
      console.error("Session recording error:", error);
      res.status(500).json({ message: "Failed to record workout session" });
    }
  });

  // Get user progress
  app.get("/api/user/progress", async (req, res) => {
    try {
      // For demo purposes, we'll use a mock user
      const userId = "demo-user";
      
      let user = await storage.getUser(userId);
      if (!user) {
        user = await storage.createUser({ username: "demo", password: "demo" });
      }
      
      res.json({
        workoutsCompleted: user.workoutsCompleted,
        totalMinutes: user.totalMinutes,
        currentStreak: user.currentStreak
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

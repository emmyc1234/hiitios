import { type Exercise } from "@shared/schema";

// This file contains the exercise database that matches what's seeded in the backend
// It can be used for offline functionality or client-side filtering

export const exerciseDatabase: Omit<Exercise, 'id'>[] = [
  // Full Body Exercises
  {
    name: "Burpees",
    description: "Start standing, squat down, kick back to plank, push-up, jump feet back, jump up with arms overhead.",
    targetAreas: ["full-body"],
    difficulty: 4,
    equipment: "none",
    instructions: [
      "Start in standing position",
      "Squat down and place hands on floor",
      "Jump feet back to plank",
      "Do a push-up",
      "Jump feet back to squat",
      "Jump up with arms overhead"
    ]
  },
  {
    name: "Mountain Climbers",
    description: "Start in plank position. Bring your right knee to your chest, then quickly switch legs. Keep your core tight.",
    targetAreas: ["full-body", "abs"],
    difficulty: 3,
    equipment: "none",
    instructions: [
      "Start in plank position",
      "Bring right knee to chest",
      "Quickly switch to left knee",
      "Maintain plank position",
      "Keep core engaged",
      "Maintain steady rhythm"
    ]
  },
  {
    name: "Jumping Jacks",
    description: "Stand with feet together, jump while spreading legs and raising arms overhead, then jump back to start.",
    targetAreas: ["full-body"],
    difficulty: 2,
    equipment: "none",
    instructions: [
      "Start with feet together",
      "Jump while spreading legs",
      "Raise arms overhead",
      "Jump back to starting position",
      "Keep knees soft",
      "Maintain steady rhythm"
    ]
  },
  // Abs Exercises
  {
    name: "Plank Hold",
    description: "Hold a straight plank position, keeping your core tight and back straight. Avoid letting hips sag.",
    targetAreas: ["abs"],
    difficulty: 3,
    equipment: "none",
    instructions: [
      "Start in push-up position",
      "Keep body straight",
      "Engage core muscles",
      "Don't let hips sag",
      "Breathe normally",
      "Hold position"
    ]
  },
  {
    name: "Bicycle Crunches",
    description: "Lie on your back, bring opposite elbow to knee in a cycling motion while keeping other leg straight.",
    targetAreas: ["abs"],
    difficulty: 3,
    equipment: "none",
    instructions: [
      "Lie on back with hands behind head",
      "Lift shoulders off ground",
      "Bring right elbow to left knee",
      "Switch to left elbow to right knee",
      "Keep alternating",
      "Don't pull on neck"
    ]
  },
  {
    name: "Russian Twists",
    description: "Sit with knees bent, lean back slightly and rotate your torso from side to side.",
    targetAreas: ["abs"],
    difficulty: 3,
    equipment: "none",
    instructions: [
      "Sit with knees bent",
      "Lean back slightly",
      "Lift feet off ground",
      "Rotate torso left and right",
      "Keep chest up",
      "Control the movement"
    ]
  },
  // Add more exercises as needed...
];

export function getExercisesByTargetArea(targetArea: string): Omit<Exercise, 'id'>[] {
  return exerciseDatabase.filter(exercise => 
    exercise.targetAreas.includes(targetArea)
  );
}

export function getExercisesByDifficulty(difficulty: number): Omit<Exercise, 'id'>[] {
  return exerciseDatabase.filter(exercise => 
    exercise.difficulty === difficulty
  );
}

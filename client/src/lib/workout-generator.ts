import { type WorkoutConfig, type Exercise, type WorkoutExercise } from "@shared/schema";

export function generateWorkout(config: WorkoutConfig, exercises: Exercise[]): WorkoutExercise[] {
  const { duration, targetArea, goal, exerciseDuration } = config;
  const durationMinutes = parseInt(duration);
  const customExerciseDuration = parseInt(exerciseDuration || "60");
  
  // Filter exercises by target area
  let filteredExercises = exercises.filter(exercise => 
    exercise.targetAreas.includes(targetArea) || 
    (targetArea === "full-body" && exercise.targetAreas.includes("full-body"))
  );

  // If no specific exercises found, fall back to full-body exercises
  if (filteredExercises.length === 0) {
    filteredExercises = exercises.filter(exercise => 
      exercise.targetAreas.includes("full-body")
    );
  }

  // Determine rest intervals based on goal (work duration is customizable)
  let workDuration: number = customExerciseDuration;
  let restDuration: number;
  
  switch (goal) {
    case "fat-loss":
      restDuration = 10; // Short rest for high intensity
      break;
    case "endurance":
      restDuration = 15; // Moderate rest for stamina building
      break;
    case "strength":
      restDuration = 20; // Longer rest for recovery
      break;
    default:
      restDuration = 15;
  }

  // Calculate how many exercises we can fit
  const totalIntervalTime = workDuration + restDuration;
  const totalSeconds = durationMinutes * 60;
  const maxExercises = Math.floor(totalSeconds / totalIntervalTime);
  
  // Select exercises (shuffle and take required amount)
  const shuffledExercises = [...filteredExercises].sort(() => Math.random() - 0.5);
  const selectedExercises = shuffledExercises.slice(0, Math.min(maxExercises, filteredExercises.length));
  
  // If we need more exercises than available, repeat some
  while (selectedExercises.length < maxExercises) {
    const additionalExercises = shuffledExercises.slice(0, maxExercises - selectedExercises.length);
    selectedExercises.push(...additionalExercises);
  }

  // Generate workout exercises
  const workoutExercises: WorkoutExercise[] = selectedExercises.map(exercise => ({
    exerciseId: exercise.id,
    name: exercise.name,
    description: exercise.description,
    workDuration,
    restDuration,
    instructions: exercise.instructions,
  }));

  // Adjust the last exercise to have no rest period
  if (workoutExercises.length > 0) {
    workoutExercises[workoutExercises.length - 1].restDuration = 0;
  }

  return workoutExercises;
}

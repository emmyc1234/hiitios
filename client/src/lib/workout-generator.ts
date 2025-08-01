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
  
  // Smart exercise selection with repetition control
  const selectedExercises: Exercise[] = [];
  const exerciseUsageCount = new Map<string, number>();
  const exerciseLastUsedIndex = new Map<string, number>();
  
  // Shuffle exercises for variety
  const shuffledExercises = [...filteredExercises].sort(() => Math.random() - 0.5);
  
  for (let i = 0; i < maxExercises; i++) {
    let selectedExercise: Exercise | null = null;
    
    // Priority 1: Find completely unused exercises (count = 0)
    const unusedExercises = shuffledExercises.filter(exercise => 
      (exerciseUsageCount.get(exercise.id) || 0) === 0
    );
    
    if (unusedExercises.length > 0) {
      selectedExercise = unusedExercises[0];
    } else {
      // Priority 2: Find exercises used only once with adequate spacing (3+ gap)
      const onceUsedExercises = shuffledExercises.filter(exercise => {
        const usageCount = exerciseUsageCount.get(exercise.id) || 0;
        const lastUsedIndex = exerciseLastUsedIndex.get(exercise.id) || -1;
        return usageCount === 1 && (i - lastUsedIndex) >= 3;
      });
      
      if (onceUsedExercises.length > 0) {
        selectedExercise = onceUsedExercises[0];
      } else {
        // Priority 3: Any exercise with adequate spacing
        for (const exercise of shuffledExercises) {
          const usageCount = exerciseUsageCount.get(exercise.id) || 0;
          const lastUsedIndex = exerciseLastUsedIndex.get(exercise.id) || -1;
          
          if (usageCount < 2 && (i - lastUsedIndex) >= 3) {
            selectedExercise = exercise;
            break;
          }
        }
        
        // Final fallback: use any exercise
        if (!selectedExercise) {
          selectedExercise = shuffledExercises[i % shuffledExercises.length];
        }
      }
    }
    
    // Update tracking
    selectedExercises.push(selectedExercise);
    exerciseUsageCount.set(selectedExercise.id, (exerciseUsageCount.get(selectedExercise.id) || 0) + 1);
    exerciseLastUsedIndex.set(selectedExercise.id, i);
  }

  // Generate workout exercises with special handling for Single Leg Glute Bridges
  const workoutExercises: WorkoutExercise[] = [];
  
  selectedExercises.forEach(exercise => {
    // Add the main exercise
    workoutExercises.push({
      exerciseId: exercise.id,
      name: exercise.name,
      description: exercise.description,
      workDuration,
      restDuration,
      instructions: exercise.instructions,
    });
    
    // If it's Single Leg Glute Bridges, immediately add the other leg version
    if (exercise.name === "Single Leg Glute Bridges") {
      workoutExercises.push({
        exerciseId: exercise.id + "_other_leg",
        name: "Single Leg Glute Bridges (Other Leg)",
        description: "Switch to the other leg and repeat the same glute bridge movement for balanced muscle development.",
        workDuration,
        restDuration,
        instructions: ["Lie on back with knees bent", "Lift the OTHER leg up", "Push through planted heel", "Lift hips up", "Squeeze glutes at top", "Lower slowly"],
      });
    }
  });

  // Adjust the last exercise to have no rest period
  if (workoutExercises.length > 0) {
    workoutExercises[workoutExercises.length - 1].restDuration = 0;
  }

  return workoutExercises;
}

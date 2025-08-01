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

  // Sort exercises based on fitness goal for optimal training effect
  filteredExercises = filteredExercises.sort((a, b) => {
    switch (goal) {
      case "fat-loss":
        // Prioritize high-intensity compound movements and cardio-based exercises
        const fatLossPriority = (exercise: Exercise) => {
          if (exercise.name.includes("Burpees") || exercise.name.includes("Mountain Climbers") || 
              exercise.name.includes("Jump") || exercise.name.includes("High Knees")) return 1;
          if (exercise.difficulty >= 3) return 2; // High intensity exercises
          return 3;
        };
        return fatLossPriority(a) - fatLossPriority(b);
        
      case "strength":
        // Prioritize higher difficulty exercises and compound movements
        const strengthPriority = (exercise: Exercise) => {
          if (exercise.difficulty >= 4) return 1; // Hardest exercises first
          if (exercise.name.includes("Push-ups") || exercise.name.includes("Squats") || 
              exercise.name.includes("Lunges") || exercise.name.includes("Pike")) return 2;
          return 3;
        };
        return strengthPriority(a) - strengthPriority(b);
        
      case "endurance":
        // Mix of moderate intensity with focus on sustained effort exercises
        const endurancePriority = (exercise: Exercise) => {
          if (exercise.difficulty === 2 || exercise.difficulty === 3) return 1; // Moderate intensity
          if (exercise.name.includes("Plank") || exercise.name.includes("Wall Sit") || 
              exercise.name.includes("Calf Raises")) return 2; // Endurance-focused
          return 3;
        };
        return endurancePriority(a) - endurancePriority(b);
        
      default:
        return 0;
    }
  });

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
  
  // Apply goal-specific workout structure
  let shuffledExercises: Exercise[];
  
  switch (goal) {
    case "fat-loss":
      // Fat loss: High intensity circuits with minimal rest - front-load hardest exercises
      shuffledExercises = [...filteredExercises].sort(() => Math.random() - 0.5);
      break;
      
    case "strength":
      // Strength: Start with compound movements, progress to isolation
      const compoundFirst = filteredExercises.sort((a, b) => b.difficulty - a.difficulty);
      shuffledExercises = [...compoundFirst];
      break;
      
    case "endurance":
      // Endurance: Alternate high and moderate intensity for sustained effort
      const endurancePattern = [...filteredExercises].sort(() => Math.random() - 0.5);
      shuffledExercises = endurancePattern;
      break;
      
    default:
      shuffledExercises = [...filteredExercises].sort(() => Math.random() - 0.5);
  }
  
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
  
  selectedExercises.forEach((exercise, index) => {
    // Apply goal-specific rest duration adjustments
    let exerciseRestDuration = restDuration;
    
    if (goal === "fat-loss") {
      // Fat loss: Even shorter rest for high-intensity exercises
      if (exercise.difficulty >= 4) {
        exerciseRestDuration = Math.max(5, restDuration - 5);
      }
    } else if (goal === "strength") {
      // Strength: Longer rest for compound movements
      if (exercise.difficulty >= 4 || exercise.name.includes("Push-ups") || 
          exercise.name.includes("Squats") || exercise.name.includes("Pike")) {
        exerciseRestDuration = restDuration + 10;
      }
    } else if (goal === "endurance") {
      // Endurance: Vary rest periods to build stamina
      exerciseRestDuration = index % 2 === 0 ? restDuration : restDuration + 5;
    }
    
    // Add the main exercise
    workoutExercises.push({
      exerciseId: exercise.id,
      name: exercise.name,
      description: exercise.description,
      workDuration,
      restDuration: exerciseRestDuration,
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

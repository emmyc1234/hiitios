import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { WorkoutScreen } from "@/components/workout-screen";
import { RestScreen } from "@/components/rest-screen";
import { WorkoutComplete } from "@/components/workout-complete";
import { type WorkoutExercise } from "@shared/schema";

export default function WorkoutPage() {
  const [, setLocation] = useLocation();
  const [currentScreen, setCurrentScreen] = useState<"workout" | "rest" | "complete">("workout");
  const [workout, setWorkout] = useState<WorkoutExercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [workoutConfig, setWorkoutConfig] = useState<any>(null);

  useEffect(() => {
    // Get workout data from sessionStorage (passed from workout setup)
    const storedWorkout = sessionStorage.getItem("currentWorkout");
    const storedConfig = sessionStorage.getItem("workoutConfig");
    
    if (storedWorkout && storedConfig) {
      setWorkout(JSON.parse(storedWorkout));
      setWorkoutConfig(JSON.parse(storedConfig));
    } else {
      // No workout data, redirect to home
      setLocation("/");
    }
  }, [setLocation]);

  const handleExerciseComplete = () => {
    if (currentExerciseIndex < workout.length - 1) {
      setCurrentScreen("rest");
    } else {
      setCurrentScreen("complete");
    }
  };

  const handleRestComplete = () => {
    setCurrentExerciseIndex(prev => prev + 1);
    setCurrentScreen("workout");
  };

  const handleWorkoutExit = () => {
    sessionStorage.removeItem("currentWorkout");
    sessionStorage.removeItem("workoutConfig");
    setLocation("/");
  };

  if (!workout.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading workout...</p>
        </div>
      </div>
    );
  }

  const currentExercise = workout[currentExerciseIndex];
  const nextExercise = workout[currentExerciseIndex + 1];

  return (
    <div className="min-h-screen">
      {currentScreen === "workout" && (
        <WorkoutScreen
          exercise={currentExercise}
          nextExercise={nextExercise}
          currentIndex={currentExerciseIndex}
          totalExercises={workout.length}
          workoutConfig={workoutConfig}
          onExerciseComplete={handleExerciseComplete}
          onWorkoutExit={handleWorkoutExit}
        />
      )}
      
      {currentScreen === "rest" && (
        <RestScreen
          nextExercise={nextExercise}
          restDuration={currentExercise.restDuration}
          onRestComplete={handleRestComplete}
        />
      )}
      
      {currentScreen === "complete" && (
        <WorkoutComplete
          workout={workout}
          workoutConfig={workoutConfig}
          onNewWorkout={handleWorkoutExit}
        />
      )}
    </div>
  );
}

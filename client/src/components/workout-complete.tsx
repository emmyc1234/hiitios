import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Heart, Share, RotateCcw } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { type WorkoutExercise } from "@shared/schema";

interface WorkoutCompleteProps {
  workout: WorkoutExercise[];
  workoutConfig: any;
  onNewWorkout: () => void;
}

export function WorkoutComplete({ workout, workoutConfig, onNewWorkout }: WorkoutCompleteProps) {
  const { toast } = useToast();

  const saveWorkoutMutation = useMutation({
    mutationFn: async (workoutData: any) => {
      const response = await apiRequest("POST", "/api/workouts", workoutData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Workout saved to favorites",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save workout",
        variant: "destructive",
      });
    },
  });

  const recordSessionMutation = useMutation({
    mutationFn: async (sessionData: any) => {
      const response = await apiRequest("POST", "/api/workout-sessions", sessionData);
      return response.json();
    },
  });

  // Calculate workout stats
  const totalDuration = parseInt(workoutConfig.duration) * 60; // Convert to seconds
  const totalExercises = workout.length;
  const estimatedCalories = Math.round(totalDuration * 0.15); // Rough estimate

  // Record the completed session
  useState(() => {
    recordSessionMutation.mutate({
      workoutId: null,
      duration: totalDuration,
      exercisesCompleted: totalExercises,
      caloriesBurned: estimatedCalories,
    });
  }, []);

  const handleSaveWorkout = () => {
    const workoutData = {
      duration: parseInt(workoutConfig.duration),
      targetArea: workoutConfig.targetArea,
      goal: workoutConfig.goal,
      exercises: workout,
    };
    
    saveWorkoutMutation.mutate(workoutData);
  };

  const handleShareWorkout = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HIIT Pro Workout Complete!',
          text: `Just completed a ${workoutConfig.duration}-minute ${workoutConfig.targetArea} workout focused on ${workoutConfig.goal}! 💪`,
          url: window.location.origin,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `Just completed a ${workoutConfig.duration}-minute ${workoutConfig.targetArea} workout focused on ${workoutConfig.goal}! 💪`;
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Copied!",
        description: "Share text copied to clipboard",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-primary to-warning text-white flex flex-col justify-center p-6">
      <div className="text-center space-y-6">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto pulse-animation">
          <Trophy className="text-white" size={48} />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Workout Complete!</h2>
          <p className="text-white/80">Amazing job crushing that workout</p>
        </div>

        {/* Workout Stats */}
        <Card className="bg-white/20 border-0">
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{workoutConfig.duration}:00</div>
                <div className="text-sm opacity-80">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{totalExercises}</div>
                <div className="text-sm opacity-80">Exercises</div>
              </div>
            </div>
            <div className="text-center pt-2 border-t border-white/20">
              <div className="text-2xl font-bold">~{estimatedCalories}</div>
              <div className="text-sm opacity-80">Calories Burned</div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            className="w-full bg-white text-primary font-bold py-3 px-6 rounded-xl hover:bg-gray-100"
            onClick={handleSaveWorkout}
            disabled={saveWorkoutMutation.isPending}
          >
            <Heart className="mr-2" size={16} />
            {saveWorkoutMutation.isPending ? "Saving..." : "Save to Favorites"}
          </Button>
          
          <Button
            variant="ghost"
            className="w-full bg-white/20 text-white font-medium py-3 px-6 rounded-xl hover:bg-white/30"
            onClick={handleShareWorkout}
          >
            <Share className="mr-2" size={16} />
            Share Achievement
          </Button>
          
          <Button
            variant="outline"
            className="w-full border-2 border-white text-white font-medium py-3 px-6 rounded-xl hover:bg-white/10 bg-transparent"
            onClick={onNewWorkout}
          >
            <RotateCcw className="mr-2" size={16} />
            Start New Workout
          </Button>
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkoutTimer } from "@/hooks/use-workout-timer";
import { type WorkoutExercise } from "@shared/schema";

interface RestScreenProps {
  nextExercise?: WorkoutExercise;
  restDuration: number;
  onRestComplete: () => void;
}

export function RestScreen({ nextExercise, restDuration, onRestComplete }: RestScreenProps) {
  const { timeRemaining, progress, start, skip } = useWorkoutTimer({
    duration: restDuration,
    onComplete: onRestComplete,
  });

  useEffect(() => {
    start();
  }, [start]);

  const formatTime = (seconds: number) => {
    return Math.ceil(seconds).toString();
  };

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-accent to-green-400 text-white flex flex-col justify-center p-6">
      <div className="text-center space-y-6">
        {/* Rest Timer */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="transform -rotate-90 w-32 h-32">
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="6" 
              fill="transparent"
            />
            <circle 
              cx="64" 
              cy="64" 
              r="56" 
              stroke="white" 
              strokeWidth="6" 
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="timer-circle"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold">{formatTime(timeRemaining)}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Rest Time</h2>
          <p className="text-white/80">Great job! Catch your breath</p>
        </div>

        {/* Next Exercise Info */}
        {nextExercise && (
          <Card className="bg-white/20 border-0">
            <CardContent className="p-4">
              <div className="text-sm opacity-90 mb-1">Next Exercise</div>
              <div className="text-xl font-bold">{nextExercise.name}</div>
              <div className="text-sm opacity-90">{nextExercise.workDuration} seconds</div>
            </CardContent>
          </Card>
        )}

        {/* Skip Rest Button */}
        <Button 
          className="bg-white text-accent font-bold py-3 px-8 rounded-xl hover:bg-gray-100"
          onClick={skip}
        >
          Skip Rest
        </Button>
      </div>
    </div>
  );
}

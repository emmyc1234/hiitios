import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Pause, 
  Play, 
  X, 
  SkipForward,
  PlayCircle
} from "lucide-react";
import { useWorkoutTimer } from "@/hooks/use-workout-timer";
import { type WorkoutExercise } from "@shared/schema";

interface WorkoutScreenProps {
  exercise: WorkoutExercise;
  nextExercise?: WorkoutExercise;
  currentIndex: number;
  totalExercises: number;
  workoutConfig: any;
  onExerciseComplete: () => void;
  onWorkoutExit: () => void;
}

export function WorkoutScreen({
  exercise,
  nextExercise,
  currentIndex,
  totalExercises,
  workoutConfig,
  onExerciseComplete,
  onWorkoutExit,
}: WorkoutScreenProps) {
  const [isPaused, setIsPaused] = useState(false);
  const { timeRemaining, progress, isActive, start, pause, resume, skip } = useWorkoutTimer({
    duration: exercise.workDuration,
    onComplete: onExerciseComplete,
  });

  useEffect(() => {
    start();
  }, [start]);

  const handlePauseResume = () => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
    setIsPaused(!isPaused);
  };

  const handleSkip = () => {
    skip();
  };

  const formatTime = (seconds: number) => {
    return Math.ceil(seconds).toString();
  };

  const overallProgress = ((currentIndex) / totalExercises) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-white">
      {/* Workout Header */}
      <div className="bg-gradient-to-r from-primary to-warning text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={handlePauseResume}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </Button>
          <div className="text-center">
            <div className="text-sm opacity-90">
              {workoutConfig?.duration} Min • {workoutConfig?.targetArea?.replace('-', ' ')} • {workoutConfig?.goal?.replace('-', ' ')}
            </div>
            <div className="font-bold">Workout in Progress</div>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onWorkoutExit}
          >
            <X size={20} />
          </Button>
        </div>
        
        {/* Overall Progress */}
        <div className="bg-white/20 rounded-full h-2 mb-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300" 
            style={{ width: `${overallProgress}%` }}
          />
        </div>
        <div className="text-sm opacity-90 text-center">
          Exercise {currentIndex + 1} of {totalExercises}
        </div>
      </div>

      {/* Current Exercise */}
      <div className="p-6 bg-white">
        <div className="text-center space-y-4">
          {/* Timer Display */}
          <div className="relative w-40 h-40 mx-auto">
            <svg className="transform -rotate-90 w-40 h-40">
              <circle 
                cx="80" 
                cy="80" 
                r="70" 
                stroke="#E5E7EB" 
                strokeWidth="8" 
                fill="transparent"
              />
              <circle 
                cx="80" 
                cy="80" 
                r="70" 
                stroke="#FF6B35" 
                strokeWidth="8" 
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="timer-circle"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-sm text-gray-600">seconds</div>
              </div>
            </div>
          </div>

          {/* Exercise Info */}
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-secondary">{exercise.name}</h3>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
              Work Phase
            </Badge>
          </div>

          {/* Exercise Description */}
          <Card className="bg-gray-50">
            <CardContent className="p-4">
              <p className="text-sm text-gray-700 text-left">
                {exercise.description}
              </p>
            </CardContent>
          </Card>

          {/* Exercise Instructions */}
          {exercise.instructions && exercise.instructions.length > 0 && (
            <Card className="bg-gradient-to-br from-gray-100 to-gray-200">
              <CardContent className="p-4">
                <div className="text-gray-500 text-center">
                  <PlayCircle className="mx-auto mb-2" size={32} />
                  <ul className="text-sm text-left space-y-1">
                    {exercise.instructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">{index + 1}.</span>
                        {instruction}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Workout Controls */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={handleSkip}
          >
            <SkipForward className="mr-2" size={16} />
            Skip
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90"
            onClick={handlePauseResume}
          >
            {isPaused ? <Play className="mr-2" size={16} /> : <Pause className="mr-2" size={16} />}
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
        </div>
      </div>

      {/* Next Exercise Preview */}
      {nextExercise && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Up Next</div>
            <div className="font-medium text-secondary">{nextExercise.name}</div>
            <div className="text-sm text-gray-500">
              {nextExercise.workDuration}s work • {nextExercise.restDuration}s rest
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, SkipForward } from "lucide-react";
import { useWorkoutTimer } from "@/hooks/use-workout-timer";
import { useSpeech } from "@/hooks/use-speech";
import { type WorkoutExercise } from "@shared/schema";

interface RestScreenProps {
  nextExercise?: WorkoutExercise;
  restDuration: number;
  onRestComplete: () => void;
  onReturnHome: () => void;
}

export function RestScreen({ nextExercise, restDuration, onRestComplete, onReturnHome }: RestScreenProps) {
  const [hasAnnouncedNext, setHasAnnouncedNext] = useState(false);
  const { timeRemaining, progress, start, skip } = useWorkoutTimer({
    duration: restDuration,
    onComplete: onRestComplete,
  });
  const { announceTransition, announceCountdown, stop: stopSpeech } = useSpeech();

  useEffect(() => {
    start();
    // Announce rest period and next exercise
    if (!hasAnnouncedNext) {
      setTimeout(() => {
        announceTransition("Rest time");
        if (nextExercise) {
          setTimeout(() => {
            announceTransition(`Get ready for ${nextExercise.name.toLowerCase()}`);
          }, 1500);
        }
      }, 500);
      setHasAnnouncedNext(true);
    }
  }, [start, nextExercise, announceTransition, hasAnnouncedNext]);

  // Announce countdown for final seconds
  useEffect(() => {
    announceCountdown(timeRemaining);
  }, [timeRemaining, announceCountdown]);

  const formatTime = (seconds: number) => {
    return Math.ceil(seconds).toString();
  };

  const circumference = 2 * Math.PI * 56;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gradient-to-br from-accent to-green-400 dark:from-green-600 dark:to-green-800 text-white flex flex-col justify-center p-6">
      {/* Home Button */}
      <div className="absolute top-4 left-4">
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-white/20"
          onClick={onReturnHome}
        >
          <Home size={20} />
        </Button>
      </div>

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
          className="bg-white text-accent font-bold py-3 px-8 rounded-xl hover:bg-gray-100 flex items-center space-x-2"
          onClick={() => {
            stopSpeech(); // Stop any ongoing speech
            skip();
          }}
        >
          <SkipForward size={16} />
          <span>Skip Rest</span>
        </Button>
      </div>
    </div>
  );
}

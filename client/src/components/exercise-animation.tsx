import { Card, CardContent } from "@/components/ui/card";
import { 
  User, 
  Activity, 
  Zap, 
  Target, 
  Dumbbell, 
  Flame,
  Heart,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Move,
  CircleDot
} from "lucide-react";

interface ExerciseImageProps {
  exerciseName: string;
  instructions: string[];
}

// Simple icon mapping for exercises
const exerciseIcons: Record<string, any> = {
  "Burpees": Flame,
  "Mountain Climbers": Move,
  "Jumping Jacks": ArrowUp,
  "Plank Hold": User,
  "Bicycle Crunches": RotateCcw,
  "Russian Twists": CircleDot,
  "Dead Bug": Target,
  "Jump Squats": Zap,
  "Lunges": ArrowDown,
  "Wall Sit": User,
  "Single Leg Glute Bridges": Activity,
  "Push-ups": Dumbbell,
  "Pike Push-ups": ArrowUp,
  "Tricep Dips": ArrowDown,
  "Arm Circles": RotateCcw,
};

// Exercise category colors
const getCategoryColor = (exerciseName: string) => {
  if (["Plank Hold", "Bicycle Crunches", "Russian Twists", "Dead Bug"].includes(exerciseName)) {
    return "bg-accent/20 text-accent"; // Abs - green
  } else if (["Jump Squats", "Lunges", "Wall Sit", "Single Leg Glute Bridges"].includes(exerciseName)) {
    return "bg-warning/20 text-warning"; // Legs - yellow
  } else if (["Push-ups", "Pike Push-ups", "Tricep Dips", "Arm Circles"].includes(exerciseName)) {
    return "bg-secondary/20 text-secondary"; // Upper body - dark
  } else {
    return "bg-primary/20 text-primary"; // Full body - orange
  }
};

export function ExerciseImage({ exerciseName, instructions }: ExerciseImageProps) {
  const IconComponent = exerciseIcons[exerciseName] || Activity;
  const colorClass = getCategoryColor(exerciseName);

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardContent className="p-4">
        {/* Exercise Icon */}
        <div className="text-center space-y-4">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${colorClass}`}>
            <IconComponent size={40} />
          </div>
          
          {/* Exercise Instructions */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-800 dark:text-gray-200">
              How to perform:
            </div>
            <ul className="text-sm text-left space-y-1 text-gray-700 dark:text-gray-300">
              {instructions.slice(0, 4).map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2 font-medium">{index + 1}.</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
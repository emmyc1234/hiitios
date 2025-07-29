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
import mountainClimberImage from "@assets/videoframe_648_1753806194505.png";
import deadBugImage from "@assets/videoframe_6857_1753806329966.png";
import burpeeImage1 from "@assets/videoframe_12628_1753806442229.png";
import burpeeImage2 from "@assets/videoframe_7454_1753806442232.png";

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
        {/* Exercise Icon or Image */}
        <div className="text-center space-y-4">
          {exerciseName === "Mountain Climbers" ? (
            // Use actual mountain climber image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={mountainClimberImage} 
                alt="Mountain Climbers Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Dead Bug" ? (
            // Use actual dead bug image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={deadBugImage} 
                alt="Dead Bug Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Burpees" ? (
            // Use both burpee images to show the movement sequence
            <div className="space-y-2">
              <div className="w-32 h-16 mx-auto rounded-lg overflow-hidden shadow-md">
                <img 
                  src={burpeeImage1} 
                  alt="Burpees Exercise - Plank Position"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-32 h-16 mx-auto rounded-lg overflow-hidden shadow-md">
                <img 
                  src={burpeeImage2} 
                  alt="Burpees Exercise - Jump Up"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Plank → Jump Up
              </div>
            </div>
          ) : (
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto ${colorClass}`}>
              <IconComponent size={40} />
            </div>
          )}
          
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
            
            {exerciseName === "Mountain Climbers" && (
              <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                <div className="text-xs text-primary font-medium">
                  Tip: Keep alternating legs rapidly like you're climbing a mountain!
                </div>
              </div>
            )}
            
            {exerciseName === "Dead Bug" && (
              <div className="mt-3 p-2 bg-accent/10 rounded-lg">
                <div className="text-xs text-accent font-medium">
                  Tip: Keep your back pressed to the floor throughout the movement!
                </div>
              </div>
            )}
            
            {exerciseName === "Burpees" && (
              <div className="mt-3 p-2 bg-warning/10 rounded-lg">
                <div className="text-xs text-warning font-medium">
                  Tip: Land softly on your jump and maintain good form throughout!
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
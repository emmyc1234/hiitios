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
  CircleDot,
  ArrowLeftRight
} from "lucide-react";
import mountainClimberImage from "@assets/videoframe_648_1753806194505.png";
import deadBugImage from "@assets/videoframe_6857_1753806329966.png";
import burpeeImage1 from "@assets/videoframe_12628_1753806442229.png";
import burpeeImage2 from "@assets/videoframe_7454_1753806442232.png";
import jumpingJacksImage from "@assets/videoframe_3491_1753806584802.png";
import plankHoldImage from "@assets/videoframe_3793_1753806887356.png";
import bicycleCrunchesImage from "@assets/videoframe_5364_1753806926907.png";
import russianTwistsImage from "@assets/videoframe_5737_1753806995706.png";
import jumpSquatImage1 from "@assets/videoframe_5572_1753807055637.png";
import jumpSquatImage2 from "@assets/videoframe_3804_1753807055640.png";
import lungesImage from "@assets/videoframe_5200_1753807873079.png";
import wallSitImage from "@assets/wall_sit_exercise.png";
import jumpLungesImage from "@assets/videoframe_2551_1754059303596.png";
import sideLungesImage from "@assets/videoframe_3570_1754059364900.png";
import calfRaisesImage from "@assets/videoframe_5743_1754059651143.png";
import kickbacksImage1 from "@assets/videoframe_3231_1754060319975.png";
import kickbacksImage2 from "@assets/videoframe_6103_1754060319981.png";
import pikePushUpsImage from "@assets/videoframe_3696_1754060597535.png";
import singleLegGluteBridgeImage from "@assets/videoframe_1385_1754055984520.png";
import pushUpsImage from "@assets/videoframe_5905_1754056185240.png";
import plankArmLiftsImage from "@assets/videoframe_1414_1754056764129.png";
import diamondPushUpsImage from "@assets/videoframe_565_1754057036618.png";
import armCirclesImage from "@assets/videoframe_4160_1754057151563.png";
import verticalLegCrunchImage from "@assets/videoframe_5988_1754057911068.png";

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
  "Single Leg Glute Bridges (Other Leg)": Activity,
  "Push-ups": Dumbbell,
  "Pike Push-ups": ArrowUp,
  "Tricep Dips": ArrowDown,
  "Arm Circles": RotateCcw,
  "Vertical Leg Crunch": Target,
  "Jump Lunges": Zap,
  "Side Lunges": ArrowLeftRight,
  "Calf Raises": ArrowUp,
  "Kickbacks": Move,
};

// Exercise category colors
const getCategoryColor = (exerciseName: string) => {
  if (["Plank Hold", "Bicycle Crunches", "Russian Twists", "Dead Bug", "Vertical Leg Crunch"].includes(exerciseName)) {
    return "bg-accent/20 text-accent"; // Abs - green
  } else if (["Jump Squats", "Lunges", "Wall Sit", "Single Leg Glute Bridges", "Single Leg Glute Bridges (Other Leg)", "Jump Lunges", "Side Lunges", "Calf Raises", "Kickbacks"].includes(exerciseName)) {
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
          ) : exerciseName === "Jumping Jacks" ? (
            // Use actual jumping jacks image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={jumpingJacksImage} 
                alt="Jumping Jacks Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Plank Hold" ? (
            // Use actual plank hold image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={plankHoldImage} 
                alt="Plank Hold Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Bicycle Crunches" ? (
            // Use actual bicycle crunches image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={bicycleCrunchesImage} 
                alt="Bicycle Crunches Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Russian Twists" ? (
            // Use actual russian twists image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={russianTwistsImage} 
                alt="Russian Twists Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Vertical Leg Crunch" ? (
            // Use actual vertical leg crunch image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={verticalLegCrunchImage} 
                alt="Vertical Leg Crunch Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Jump Squats" ? (
            // Use both jump squat images to show the movement sequence
            <div className="space-y-2">
              <div className="w-32 h-16 mx-auto rounded-lg overflow-hidden shadow-md">
                <img 
                  src={jumpSquatImage1} 
                  alt="Jump Squats Exercise - Squat Position"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-32 h-16 mx-auto rounded-lg overflow-hidden shadow-md">
                <img 
                  src={jumpSquatImage2} 
                  alt="Jump Squats Exercise - Jump Phase"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Squat → Explosive Jump
              </div>
            </div>
          ) : exerciseName === "Lunges" ? (
            // Use actual lunges image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={lungesImage} 
                alt="Lunges Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Jump Lunges" ? (
            // Use actual jump lunges image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={jumpLungesImage} 
                alt="Jump Lunges Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Side Lunges" ? (
            // Use actual side lunges image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={sideLungesImage} 
                alt="Side Lunges Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Calf Raises" ? (
            // Use actual calf raises image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={calfRaisesImage} 
                alt="Calf Raises Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Kickbacks" ? (
            // Use actual kickbacks images provided by user - alternating between two positions
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={kickbacksImage1} 
                alt="Kickbacks Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Wall Sit" ? (
            // Use actual wall sit image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={wallSitImage} 
                alt="Wall Sit Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Single Leg Glute Bridges" ? (
            // Use actual single leg glute bridge image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={singleLegGluteBridgeImage} 
                alt="Single Leg Glute Bridges Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Single Leg Glute Bridges (Other Leg)" ? (
            // Use same image but with different label for the other leg version
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={singleLegGluteBridgeImage} 
                alt="Single Leg Glute Bridges (Other Leg) Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Push-ups" ? (
            // Use actual push-ups image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={pushUpsImage} 
                alt="Push-ups Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Plank with Arm Lifts" ? (
            // Use actual plank with arm lifts image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={plankArmLiftsImage} 
                alt="Plank with Arm Lifts Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Diamond Push-ups" ? (
            // Use actual diamond push-ups image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={diamondPushUpsImage} 
                alt="Diamond Push-ups Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Arm Circles" ? (
            // Use actual arm circles image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={armCirclesImage} 
                alt="Arm Circles Exercise"
                className="w-full h-full object-cover"
              />
            </div>
          ) : exerciseName === "Pike Push-ups" ? (
            // Use actual pike push-ups image provided by user
            <div className="w-32 h-20 mx-auto rounded-lg overflow-hidden shadow-md">
              <img 
                src={pikePushUpsImage} 
                alt="Pike Push-ups Exercise"
                className="w-full h-full object-cover"
              />
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
            
            {exerciseName === "Jumping Jacks" && (
              <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                <div className="text-xs text-primary font-medium">
                  Tip: Keep your knees soft and maintain a steady rhythm!
                </div>
              </div>
            )}
            
            {exerciseName === "Plank Hold" && (
              <div className="mt-3 p-2 bg-accent/10 rounded-lg">
                <div className="text-xs text-accent font-medium">
                  Tip: Keep your body straight and don't let your hips sag!
                </div>
              </div>
            )}
            
            {exerciseName === "Bicycle Crunches" && (
              <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                <div className="text-xs text-primary font-medium">
                  Tip: Don't pull on your neck - keep the movement controlled!
                </div>
              </div>
            )}
            
            {exerciseName === "Russian Twists" && (
              <div className="mt-3 p-2 bg-accent/10 rounded-lg">
                <div className="text-xs text-accent font-medium">
                  Tip: Keep your chest up and rotate from your core, not your arms!
                </div>
              </div>
            )}
            
            {exerciseName === "Jump Squats" && (
              <div className="mt-3 p-2 bg-warning/10 rounded-lg">
                <div className="text-xs text-warning font-medium">
                  Tip: Land softly with bent knees to protect your joints!
                </div>
              </div>
            )}
            
            {exerciseName === "Lunges" && (
              <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                <div className="text-xs text-primary font-medium">
                  Tip: Keep your front knee over your ankle, not past your toes!
                </div>
              </div>
            )}
            
            {exerciseName === "Wall Sit" && (
              <div className="mt-3 p-2 bg-accent/10 rounded-lg">
                <div className="text-xs text-accent font-medium">
                  Tip: Keep your back flat against the wall and thighs parallel to the floor!
                </div>
              </div>
            )}
            
            {exerciseName === "Single Leg Glute Bridges" && (
              <div className="mt-3 p-2 bg-warning/10 rounded-lg">
                <div className="text-xs text-warning font-medium">
                  Tip: Squeeze your glutes at the top and keep your hips level!
                </div>
              </div>
            )}
            
            {exerciseName === "Push-ups" && (
              <div className="mt-3 p-2 bg-primary/10 rounded-lg">
                <div className="text-xs text-primary font-medium">
                  Tip: Keep your body straight and lower chest to the ground!
                </div>
              </div>
            )}
            
            {exerciseName === "Plank with Arm Lifts" && (
              <div className="mt-3 p-2 bg-secondary/10 rounded-lg">
                <div className="text-xs text-secondary font-medium">
                  Tip: Keep hips stable and core tight while lifting arms!
                </div>
              </div>
            )}
            
            {exerciseName === "Diamond Push-ups" && (
              <div className="mt-3 p-2 bg-destructive/10 rounded-lg">
                <div className="text-xs text-destructive font-medium">
                  Tip: Form diamond with hands, keep elbows close! Modify on knees if needed.
                </div>
              </div>
            )}
            
            {exerciseName === "Arm Circles" && (
              <div className="mt-3 p-2 bg-muted/80 rounded-lg">
                <div className="text-xs text-muted-foreground font-medium">
                  Tip: Keep arms straight and make controlled circles forward and backward!
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
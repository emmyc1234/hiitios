import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";

interface ExerciseAnimationProps {
  exerciseName: string;
  instructions: string[];
  isActive?: boolean;
}

// SVG-based exercise illustrations
const exerciseAnimations: Record<string, { svg: string; steps: string[] }> = {
  "Burpees": {
    svg: `
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <g id="burpee-step">
          <!-- Standing position -->
          <g id="standing">
            <circle cx="100" cy="40" r="8" fill="#FF6B35" />
            <rect x="98" y="48" width="4" height="30" fill="#FF6B35" rx="2" />
            <rect x="95" y="52" width="10" height="3" fill="#FF6B35" rx="1" />
            <rect x="96" y="78" width="3" height="20" fill="#FF6B35" rx="1" />
            <rect x="101" y="78" width="3" height="20" fill="#FF6B35" rx="1" />
            <rect x="94" y="96" width="12" height="3" fill="#333" rx="1" />
          </g>
        </g>
      </svg>
    `,
    steps: [
      "Start standing tall",
      "Squat down, hands on floor",
      "Jump back to plank",
      "Perform push-up",
      "Jump feet forward",
      "Explode up with arms overhead"
    ]
  },
  "Mountain Climbers": {
    svg: `
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <g id="mountain-climber">
          <!-- Plank position with knee drive -->
          <circle cx="50" cy="60" r="6" fill="#FF6B35" />
          <rect x="48" y="66" width="4" height="20" fill="#FF6B35" rx="2" />
          <rect x="45" y="70" width="10" height="2" fill="#FF6B35" rx="1" />
          <!-- Arms -->
          <line x1="50" y1="86" x2="30" y2="100" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="86" x2="70" y2="100" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Legs -->
          <line x1="52" y1="86" x2="60" y2="70" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="48" y1="86" x2="80" y2="100" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Ground line -->
          <line x1="20" y1="100" x2="180" y2="100" stroke="#333" strokeWidth="2" />
        </g>
      </svg>
    `,
    steps: [
      "Start in plank position",
      "Drive right knee to chest",
      "Return to plank",
      "Drive left knee to chest",
      "Keep alternating rapidly",
      "Maintain strong plank"
    ]
  },
  "Jumping Jacks": {
    svg: `
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <g id="jumping-jack">
          <!-- Body -->
          <circle cx="100" cy="40" r="8" fill="#FF6B35" />
          <rect x="98" y="48" width="4" height="30" fill="#FF6B35" rx="2" />
          <!-- Arms up -->
          <line x1="100" y1="55" x2="80" y2="35" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="55" x2="120" y2="35" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Legs spread -->
          <line x1="100" y1="78" x2="85" y2="110" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="78" x2="115" y2="110" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Ground -->
          <line x1="70" y1="110" x2="130" y2="110" stroke="#333" strokeWidth="2" />
        </g>
      </svg>
    `,
    steps: [
      "Start with feet together",
      "Jump while spreading legs",
      "Raise arms overhead",
      "Jump back to start",
      "Keep knees soft",
      "Maintain rhythm"
    ]
  },
  "Plank Hold": {
    svg: `
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <g id="plank">
          <!-- Head -->
          <circle cx="50" cy="60" r="6" fill="#FF6B35" />
          <!-- Body (straight line) -->
          <rect x="48" y="66" width="80" height="4" fill="#FF6B35" rx="2" />
          <!-- Arms -->
          <line x1="50" y1="70" x2="30" y2="85" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="50" y1="70" x2="30" y2="95" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Legs -->
          <line x1="128" y1="68" x2="150" y2="85" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="128" y1="68" x2="170" y2="85" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Ground -->
          <line x1="20" y1="95" x2="180" y2="95" stroke="#333" strokeWidth="2" />
        </g>
      </svg>
    `,
    steps: [
      "Start in push-up position",
      "Keep body straight",
      "Engage core muscles",
      "Don't let hips sag",
      "Breathe normally",
      "Hold steady position"
    ]
  },
  "Push-ups": {
    svg: `
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <g id="pushup">
          <!-- Head -->
          <circle cx="60" cy="50" r="6" fill="#FF6B35" />
          <!-- Body -->
          <rect x="58" y="56" width="60" height="4" fill="#FF6B35" rx="2" />
          <!-- Arms -->
          <line x1="60" y1="60" x2="40" y2="80" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="60" x2="40" y2="90" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Legs -->
          <line x1="118" y1="58" x2="140" y2="75" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="118" y1="58" x2="160" y2="75" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Ground -->
          <line x1="30" y1="90" x2="170" y2="90" stroke="#333" strokeWidth="2" />
        </g>
      </svg>
    `,
    steps: [
      "Start in plank position",
      "Lower chest to ground",
      "Keep body straight",
      "Push back up",
      "Don't let hips sag",
      "Control the movement"
    ]
  },
  "Jump Squats": {
    svg: `
      <svg viewBox="0 0 200 150" className="w-full h-full">
        <g id="jump-squat">
          <!-- Head -->
          <circle cx="100" cy="30" r="6" fill="#FF6B35" />
          <!-- Body -->
          <rect x="98" y="36" width="4" height="25" fill="#FF6B35" rx="2" />
          <!-- Arms up (jumping) -->
          <line x1="100" y1="45" x2="85" y2="25" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="45" x2="115" y2="25" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Legs (bent for squat/jump) -->
          <line x1="100" y1="61" x2="88" y2="75" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="61" x2="112" y2="75" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="88" y1="75" x2="85" y2="95" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <line x1="112" y1="75" x2="115" y2="95" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round" />
          <!-- Ground -->
          <line x1="70" y1="95" x2="130" y2="95" stroke="#333" strokeWidth="2" />
          <!-- Motion lines -->
          <path d="M 95 20 Q 90 15 85 20" stroke="#FFB800" strokeWidth="2" fill="none" />
          <path d="M 105 20 Q 110 15 115 20" stroke="#FFB800" strokeWidth="2" fill="none" />
        </g>
      </svg>
    `,
    steps: [
      "Start in squat position",
      "Lower into deep squat",
      "Explode up into jump",
      "Land softly",
      "Go into next squat",
      "Keep chest up"
    ]
  }
};

export function ExerciseAnimation({ exerciseName, instructions, isActive = true }: ExerciseAnimationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(isActive);
  
  const animation = exerciseAnimations[exerciseName];
  const steps = animation?.steps || instructions;

  useEffect(() => {
    if (!isPlaying || !steps.length) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2000); // Change step every 2 seconds

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  useEffect(() => {
    setIsPlaying(isActive);
  }, [isActive]);

  if (!animation && !instructions.length) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
      <CardContent className="p-4 space-y-4">
        {/* Animation Display */}
        <div className="relative">
          <div className="bg-white rounded-lg p-4 shadow-inner min-h-[120px] flex items-center justify-center">
            {animation ? (
              <div 
                className="w-full max-w-[150px] h-[100px]"
                dangerouslySetInnerHTML={{ __html: animation.svg }}
              />
            ) : (
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-2xl">🏃</div>
                </div>
                <div className="text-sm text-gray-600">Exercise Animation</div>
              </div>
            )}
          </div>

          {/* Play/Pause Control */}
          <Button
            size="sm"
            variant="outline"
            className="absolute top-2 right-2 h-8 w-8 p-0"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          </Button>
        </div>

        {/* Current Step Display */}
        <div className="text-center space-y-2">
          <div className="text-xs text-primary font-medium">
            Step {currentStep + 1} of {steps.length}
          </div>
          <div className="text-sm font-medium text-gray-800">
            {steps[currentStep]}
          </div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-1">
          {steps.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentStep 
                  ? 'bg-primary' 
                  : 'bg-gray-300'
              }`}
              onClick={() => setCurrentStep(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
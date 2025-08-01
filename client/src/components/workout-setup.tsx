import { useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Target, 
  Goal, 
  Play, 
  Flame, 
  Moon,
  Sun,
  User,
  Dumbbell,
  TrainTrack,
  Weight,
  Heart,
  Zap
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { generateWorkout } from "@/lib/workout-generator";
import { type WorkoutConfig } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function WorkoutSetup() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [selectedDuration, setSelectedDuration] = useState<string>("10");
  const [selectedTarget, setSelectedTarget] = useState<string>("abs");
  const [selectedGoal, setSelectedGoal] = useState<string>("endurance");
  const [selectedExerciseDuration, setSelectedExerciseDuration] = useState<string>("60");

  const { data: exercises = [], isLoading } = useQuery({
    queryKey: ["/api/exercises"],
  });

  const { data: userProgress } = useQuery({
    queryKey: ["/api/user/progress"],
  });

  const handleGenerateWorkout = async () => {
    try {
      const config: WorkoutConfig = {
        duration: selectedDuration as any,
        targetArea: selectedTarget as any,
        goal: selectedGoal as any,
        exerciseDuration: selectedExerciseDuration as any,
      };

      const workout = generateWorkout(config, exercises);
      
      // Store workout and config in sessionStorage
      sessionStorage.setItem("currentWorkout", JSON.stringify(workout));
      sessionStorage.setItem("workoutConfig", JSON.stringify(config));
      
      // Navigate to workout page
      setLocation("/workout");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate workout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const durationOptions = [
    { value: "3", label: "3", sublabel: "min" },
    { value: "5", label: "5", sublabel: "min" },
    { value: "10", label: "10", sublabel: "min" },
    { value: "15", label: "15", sublabel: "min" },
  ];

  const targetOptions = [
    { value: "full-body", label: "Full Body", icon: User },
    { value: "legs", label: "Legs", icon: TrainTrack },
    { value: "abs", label: "Abs", icon: Weight },
    { value: "upper-body", label: "Upper Body", icon: Dumbbell },
  ];

  const goalOptions = [
    { 
      value: "fat-loss", 
      label: "Fat Loss", 
      description: "High intensity, cardio focus",
      icon: Flame 
    },
    { 
      value: "endurance", 
      label: "Endurance", 
      description: "Longer intervals, stamina building",
      icon: Heart 
    },
    { 
      value: "strength", 
      label: "Strength", 
      description: "Power moves, muscle building",
      icon: Zap 
    },
  ];

  const exerciseDurationOptions = [
    { value: "45", label: "45", sublabel: "sec" },
    { value: "60", label: "60", sublabel: "sec" },
    { value: "75", label: "75", sublabel: "sec" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading exercises...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-warning rounded-lg flex items-center justify-center">
              <Flame className="text-white" size={16} />
            </div>
            <h1 className="text-xl font-bold text-secondary dark:text-white">HIIT Pro</h1>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-secondary dark:text-white">Ready to Sweat?</h2>
          <p className="text-gray-600 dark:text-gray-300">Customize your HIIT workout below</p>
        </div>

        {/* Duration Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary dark:text-white flex items-center">
            <Clock className="text-primary mr-2" size={20} />
            Workout Duration
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {durationOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedDuration === option.value ? "default" : "outline"}
                className={`h-auto p-4 flex-col ${
                  selectedDuration === option.value
                    ? "bg-primary/10 border-primary text-primary hover:bg-primary/15"
                    : "bg-white dark:bg-gray-800 hover:border-primary hover:text-primary dark:text-white"
                }`}
                onClick={() => setSelectedDuration(option.value)}
              >
                <div className="text-2xl font-bold">{option.label}</div>
                <div className="text-sm">{option.sublabel}</div>
              </Button>
            ))}
          </div>
        </div>

        {/* Exercise Duration Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary dark:text-white flex items-center">
            <Clock className="text-primary mr-2" size={20} />
            Exercise Length
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {exerciseDurationOptions.map((option) => (
              <Button
                key={option.value}
                variant={selectedExerciseDuration === option.value ? "default" : "outline"}
                className={`h-auto p-4 flex-col ${
                  selectedExerciseDuration === option.value
                    ? "bg-primary/10 border-primary text-primary hover:bg-primary/15"
                    : "bg-white dark:bg-gray-800 hover:border-primary hover:text-primary dark:text-white"
                }`}
                onClick={() => setSelectedExerciseDuration(option.value)}
              >
                <div className="text-xl font-bold">{option.label}</div>
                <div className="text-sm">{option.sublabel}</div>
              </Button>
            ))}
          </div>
        </div>

        {/* Target Area Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary dark:text-white flex items-center">
            <Target className="text-primary mr-2" size={20} />
            Target Area
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {targetOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={selectedTarget === option.value ? "default" : "outline"}
                  className={`h-auto p-4 flex-col ${
                    selectedTarget === option.value
                      ? "bg-primary/10 border-primary text-primary hover:bg-primary/15"
                      : "bg-white dark:bg-gray-800 hover:border-primary hover:text-primary dark:text-white"
                  }`}
                  onClick={() => setSelectedTarget(option.value)}
                >
                  <Icon className="mb-2" size={24} />
                  <div className="text-sm font-medium">{option.label}</div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Goal Selector */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-secondary dark:text-white flex items-center">
            <Goal className="text-primary mr-2" size={20} />
            Goal
          </h3>
          <div className="space-y-3">
            {goalOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.value}
                  variant={selectedGoal === option.value ? "default" : "outline"}
                  className={`w-full h-auto p-4 justify-between ${
                    selectedGoal === option.value
                      ? "bg-primary/10 border-primary text-primary hover:bg-primary/15"
                      : "bg-white dark:bg-gray-800 hover:border-primary hover:text-primary dark:text-white"
                  }`}
                  onClick={() => setSelectedGoal(option.value)}
                >
                  <div className="text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm opacity-70">{option.description}</div>
                  </div>
                  <Icon size={20} />
                </Button>
              );
            })}
          </div>
        </div>

        {/* Generate Workout Button */}
        <Button
          className="w-full bg-gradient-to-r from-primary to-warning text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          onClick={handleGenerateWorkout}
        >
          <Play className="mr-2" size={20} />
          Generate My Workout
        </Button>

        {/* Progress Stats */}
        {userProgress && (
          <Card className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
            <CardContent className="pt-6">
              <h4 className="font-semibold text-secondary dark:text-white mb-3">Your Progress</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">
                    {userProgress.workoutsCompleted || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Workouts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">
                    {userProgress.totalMinutes || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-warning">
                    {userProgress.currentStreak || 0}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Day Streak</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

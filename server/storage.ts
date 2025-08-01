import { type User, type InsertUser, type Exercise, type InsertExercise, type Workout, type InsertWorkout, type WorkoutSession, type InsertWorkoutSession, type WorkoutExercise } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserProgress(userId: string, workoutsCompleted: number, totalMinutes: number, currentStreak: number): Promise<User>;

  // Exercise methods
  getAllExercises(): Promise<Exercise[]>;
  getExercisesByTargetArea(targetArea: string): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;

  // Workout methods
  createWorkout(workout: InsertWorkout): Promise<Workout>;
  getUserWorkouts(userId: string): Promise<Workout[]>;
  getFavoriteWorkouts(userId: string): Promise<Workout[]>;
  toggleWorkoutFavorite(workoutId: string, isFavorite: boolean): Promise<Workout>;

  // Workout session methods
  createWorkoutSession(session: InsertWorkoutSession): Promise<WorkoutSession>;
  getUserSessions(userId: string): Promise<WorkoutSession[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private exercises: Map<string, Exercise>;
  private workouts: Map<string, Workout>;
  private workoutSessions: Map<string, WorkoutSession>;

  constructor() {
    this.users = new Map();
    this.exercises = new Map();
    this.workouts = new Map();
    this.workoutSessions = new Map();
    this.seedExercises();
  }

  private seedExercises() {
    const exercisesData: InsertExercise[] = [
      // Full Body Exercises
      {
        name: "Burpees",
        description: "Start standing, squat down, kick back to plank, push-up, jump feet back, jump up with arms overhead.",
        targetAreas: ["full-body"],
        difficulty: 4,
        equipment: "none",
        instructions: ["Start in standing position", "Squat down and place hands on floor", "Jump feet back to plank", "Do a push-up", "Jump feet back to squat", "Jump up with arms overhead"],
        imageUrl: null,
        animationSteps: ["Standing", "Squat down", "Plank position", "Push-up", "Return to squat", "Jump up"]
      },
      {
        name: "Mountain Climbers",
        description: "Start in plank position. Bring your right knee to your chest, then quickly switch legs. Keep your core tight.",
        targetAreas: ["full-body", "abs"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Start in plank position", "Bring right knee to chest", "Quickly switch to left knee", "Maintain plank position", "Keep core engaged", "Maintain steady rhythm"],
        imageUrl: null,
        animationSteps: ["Plank position", "Right knee to chest", "Return to plank", "Left knee to chest", "Return to plank", "Continue alternating"]
      },
      {
        name: "Jumping Jacks",
        description: "Stand with feet together, jump while spreading legs and raising arms overhead, then jump back to start.",
        targetAreas: ["full-body"],
        difficulty: 2,
        equipment: "none",
        instructions: ["Start with feet together", "Jump while spreading legs", "Raise arms overhead", "Jump back to starting position", "Keep knees soft", "Maintain steady rhythm"],
        imageUrl: null,
        animationSteps: ["Feet together, arms down", "Jump legs apart, arms up", "Return to start", "Repeat motion", "Keep rhythm", "Stay light on feet"]
      },
      {
        name: "High Knees",
        description: "Run in place bringing knees up as high as possible toward chest, pumping arms.",
        targetAreas: ["full-body"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Stand with feet hip-width apart", "Lift right knee to chest", "Quickly switch to left knee", "Pump arms as you run in place", "Keep core engaged", "Maintain quick pace"],
        imageUrl: null,
        animationSteps: ["Stand ready", "Right knee up", "Left knee up", "Pump arms", "Quick rhythm", "Stay on balls of feet"]
      },
      {
        name: "Squat Jumps",
        description: "Perform squat then jump up explosively, landing softly back into squat position.",
        targetAreas: ["full-body"],
        difficulty: 4,
        equipment: "none",
        instructions: ["Start in squat position", "Lower into deep squat", "Jump up explosively", "Land softly on balls of feet", "Immediately squat again", "Keep chest up throughout"],
        imageUrl: null,
        animationSteps: ["Squat position", "Deep squat", "Explosive jump", "Soft landing", "Back to squat", "Continuous motion"]
      },
      {
        name: "Bear Crawl",
        description: "Crawl forward on hands and feet with knees slightly off ground, engaging core.",
        targetAreas: ["full-body"],
        difficulty: 4,
        equipment: "none",
        instructions: ["Start on hands and knees", "Lift knees 2 inches off ground", "Move right hand and left foot forward", "Switch to left hand and right foot", "Keep core tight", "Maintain low position"],
        imageUrl: null,
        animationSteps: ["Hands and knees", "Lift knees slightly", "Right hand left foot", "Left hand right foot", "Core engaged", "Stay low"]
      },
      {
        name: "Star Jumps",
        description: "Jump up spreading arms and legs wide into star shape, then return to start.",
        targetAreas: ["full-body"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Start with feet together", "Jump up explosively", "Spread arms and legs wide", "Land softly with feet together", "Keep movements controlled", "Engage core throughout"],
        imageUrl: null,
        animationSteps: ["Feet together", "Jump up", "Star shape", "Control landing", "Return to start", "Smooth rhythm"]
      },
      {
        name: "Plank Jacks",
        description: "In plank position, jump feet apart and together like jumping jacks.",
        targetAreas: ["full-body"],
        difficulty: 4,
        equipment: "none",
        instructions: ["Start in plank position", "Jump feet apart", "Jump feet back together", "Keep hips level", "Maintain plank form", "Land softly on balls of feet"],
        imageUrl: null,
        animationSteps: ["Plank position", "Jump feet apart", "Jump feet together", "Keep core tight", "Maintain form", "Controlled movement"]
      },
      {
        name: "Squat Thrusts",
        description: "From standing, squat down, jump back to plank, jump feet forward, stand up.",
        targetAreas: ["full-body"],
        difficulty: 4,
        equipment: "none",
        instructions: ["Start standing", "Squat down, hands on floor", "Jump feet back to plank", "Jump feet forward to squat", "Stand up", "Repeat quickly"],
        imageUrl: null,
        animationSteps: ["Standing", "Squat hands down", "Jump back plank", "Jump feet in", "Stand up", "Continuous flow"]
      },
      // Abs Exercises
      {
        name: "Plank Hold",
        description: "Hold a straight plank position, keeping your core tight and back straight. Avoid letting hips sag.",
        targetAreas: ["abs"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Start in push-up position", "Keep body straight", "Engage core muscles", "Don't let hips sag", "Breathe normally", "Hold position"],
        imageUrl: null,
        animationSteps: ["Push-up position", "Lower to forearms", "Keep body straight", "Engage core", "Hold steady", "Breathe normally"]
      },
      {
        name: "Bicycle Crunches",
        description: "Lie on your back, bring opposite elbow to knee in a cycling motion while keeping other leg straight.",
        targetAreas: ["abs"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Lie on back with hands behind head", "Lift shoulders off ground", "Bring right elbow to left knee", "Switch to left elbow to right knee", "Keep alternating", "Don't pull on neck"],
        imageUrl: null,
        animationSteps: ["Lie on back", "Hands behind head", "Right elbow to left knee", "Switch sides", "Left elbow to right knee", "Continue cycling motion"]
      },
      {
        name: "Vertical Leg Crunch",
        description: "Legs extended vertically, crunch upper body toward legs for intense ab workout.",
        targetAreas: ["abs"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Lie on back", "Extend legs straight up", "Hands behind head", "Crunch upper body toward legs", "Keep legs vertical", "Focus on upper abs"],
        imageUrl: "/attached_assets/videoframe_5988_1754057911068.png",
        animationSteps: ["Lie flat on back", "Legs straight up", "Hands behind head", "Crunch up toward legs", "Hold briefly", "Lower with control"]
      },
      {
        name: "Russian Twists",
        description: "Sit with knees bent, lean back slightly and rotate your torso from side to side.",
        targetAreas: ["abs"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Sit with knees bent", "Lean back slightly", "Lift feet off ground", "Rotate torso left and right", "Keep chest up", "Control the movement"],
        imageUrl: null,
        animationSteps: ["Sit with knees bent", "Lean back", "Lift feet up", "Twist to right", "Twist to left", "Keep alternating"]
      },
      {
        name: "Dead Bug",
        description: "Lie on back with arms up and knees bent. Lower opposite arm and leg while keeping back flat.",
        targetAreas: ["abs"],
        difficulty: 2,
        equipment: "none",
        instructions: ["Lie on back", "Arms up, knees bent at 90 degrees", "Lower right arm and left leg", "Return to start", "Switch sides", "Keep back pressed to floor"],
        imageUrl: null,
        animationSteps: ["Lie on back", "Arms up, knees bent", "Lower right arm, left leg", "Return to start", "Lower left arm, right leg", "Keep back flat"]
      },
      // Legs Exercises
      {
        name: "Jump Squats",
        description: "Perform a squat then explode up into a jump, landing softly back into squat position.",
        targetAreas: ["legs"],
        difficulty: 4,
        equipment: "none",
        instructions: ["Start in squat position", "Lower into deep squat", "Explode up into jump", "Land softly", "Immediately go into next squat", "Keep chest up"],
        imageUrl: null,
        animationSteps: ["Squat position", "Lower deep squat", "Explode up jumping", "Land softly", "Return to squat", "Repeat motion"]
      },
      {
        name: "Lunges",
        description: "Step forward into a lunge position, lower back knee toward ground, then push back to start.",
        targetAreas: ["legs"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Stand with feet hip-width apart", "Step forward with right foot", "Lower back knee toward ground", "Push through front heel to return", "Alternate legs", "Keep torso upright"],
        imageUrl: null,
        animationSteps: ["Stand hip-width apart", "Step forward", "Lower back knee", "Push back to start", "Switch legs", "Keep torso upright"]
      },
      {
        name: "Wall Sit",
        description: "Lean against wall with thighs parallel to ground, hold position with back flat against wall.",
        targetAreas: ["legs"],
        difficulty: 3,
        equipment: "wall",
        instructions: ["Stand with back against wall", "Slide down until thighs parallel", "Keep back flat against wall", "Don't let knees go past toes", "Hold position", "Breathe normally"],
        imageUrl: null,
        animationSteps: ["Stand against wall", "Slide down slowly", "Thighs parallel", "Hold position", "Keep back flat", "Breathe steadily"]
      },
      {
        name: "Single Leg Glute Bridges",
        description: "Lie on back, lift one leg, push through heel of planted foot to lift hips up.",
        targetAreas: ["legs"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Lie on back with knees bent", "Lift one leg up", "Push through planted heel", "Lift hips up", "Squeeze glutes at top", "Lower slowly"],
        imageUrl: null,
        animationSteps: ["Lie on back", "Lift one leg", "Push through heel", "Lift hips up", "Squeeze glutes", "Lower slowly"]
      },
      // Upper Body Exercises
      {
        name: "Push-ups",
        description: "Start in plank position, lower chest to ground, push back up to start. Modify on knees if needed.",
        targetAreas: ["upper-body"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Start in plank position", "Lower chest toward ground", "Keep body straight", "Push back up", "Don't let hips sag", "Modify on knees if needed"],
        imageUrl: null,
        animationSteps: ["Plank position", "Lower chest down", "Keep body straight", "Push back up", "Control movement", "Repeat motion"]
      },
      {
        name: "Plank with Arm Lifts",
        description: "Hold plank position and alternate lifting each arm forward while keeping body stable and core engaged.",
        targetAreas: ["upper-body"],
        difficulty: 3,
        equipment: "none",
        instructions: ["Start in plank position", "Keep core tight", "Lift right arm forward", "Hold briefly", "Return to plank", "Alternate with left arm"],
        imageUrl: null,
        animationSteps: ["Plank position", "Lift right arm", "Hold steady", "Return to plank", "Lift left arm", "Keep alternating"]
      },
      {
        name: "Diamond Push-ups",
        description: "Push-ups with hands forming diamond shape, targets triceps. Modify on knees if needed.",
        targetAreas: ["upper-body"],
        difficulty: 4,
        equipment: "none",
        instructions: ["Form diamond with hands", "Start in plank position", "Lower chest to diamond", "Keep elbows close to body", "Push back up", "Modify on knees if needed"],
        imageUrl: null,
        animationSteps: ["Diamond hand position", "Plank stance", "Lower to diamond", "Keep elbows in", "Push back up", "Control movement"]
      },
      {
        name: "Arm Circles",
        description: "Extend arms to sides and make small to large circles forward and backward.",
        targetAreas: ["upper-body"],
        difficulty: 1,
        equipment: "none",
        instructions: ["Extend arms to sides", "Make small circles forward", "Gradually make circles larger", "Reverse direction", "Keep arms straight", "Control the movement"],
        imageUrl: null,
        animationSteps: ["Extend arms out", "Small circles forward", "Larger circles", "Reverse direction", "Keep arms straight", "Control the motion"]
      }
    ];

    exercisesData.forEach(exercise => {
      const id = randomUUID();
      this.exercises.set(id, { ...exercise, id } as Exercise);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      workoutsCompleted: 0,
      totalMinutes: 0,
      currentStreak: 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserProgress(userId: string, workoutsCompleted: number, totalMinutes: number, currentStreak: number): Promise<User> {
    const user = this.users.get(userId);
    if (!user) throw new Error("User not found");
    
    const updatedUser = { ...user, workoutsCompleted, totalMinutes, currentStreak };
    this.users.set(userId, updatedUser);
    return updatedUser;
  }

  async getAllExercises(): Promise<Exercise[]> {
    return Array.from(this.exercises.values());
  }

  async getExercisesByTargetArea(targetArea: string): Promise<Exercise[]> {
    return Array.from(this.exercises.values()).filter(
      exercise => exercise.targetAreas.includes(targetArea)
    );
  }

  async createExercise(insertExercise: InsertExercise): Promise<Exercise> {
    const id = randomUUID();
    const exercise: Exercise = { ...insertExercise, id } as Exercise;
    this.exercises.set(id, exercise);
    return exercise;
  }

  async createWorkout(insertWorkout: InsertWorkout): Promise<Workout> {
    const id = randomUUID();
    const workout: Workout = { 
      ...insertWorkout, 
      id, 
      completedAt: null,
      isFavorite: false,
      createdAt: new Date()
    };
    this.workouts.set(id, workout);
    return workout;
  }

  async getUserWorkouts(userId: string): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(
      workout => workout.userId === userId
    );
  }

  async getFavoriteWorkouts(userId: string): Promise<Workout[]> {
    return Array.from(this.workouts.values()).filter(
      workout => workout.userId === userId && workout.isFavorite
    );
  }

  async toggleWorkoutFavorite(workoutId: string, isFavorite: boolean): Promise<Workout> {
    const workout = this.workouts.get(workoutId);
    if (!workout) throw new Error("Workout not found");
    
    const updatedWorkout = { ...workout, isFavorite };
    this.workouts.set(workoutId, updatedWorkout);
    return updatedWorkout;
  }

  async createWorkoutSession(insertSession: InsertWorkoutSession): Promise<WorkoutSession> {
    const id = randomUUID();
    const session: WorkoutSession = { 
      ...insertSession, 
      id, 
      completedAt: new Date() 
    };
    this.workoutSessions.set(id, session);
    return session;
  }

  async getUserSessions(userId: string): Promise<WorkoutSession[]> {
    return Array.from(this.workoutSessions.values()).filter(
      session => session.userId === userId
    );
  }
}

export const storage = new MemStorage();

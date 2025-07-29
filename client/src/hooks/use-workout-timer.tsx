import { useState, useRef, useCallback, useEffect } from "react";

interface UseWorkoutTimerOptions {
  duration: number; // in seconds
  onComplete?: () => void;
}

export function useWorkoutTimer({ duration, onComplete }: UseWorkoutTimerOptions) {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio context for beep sounds
  useEffect(() => {
    const createBeepSound = (frequency: number, duration: number) => {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.log("Audio not supported");
      }
    };

    audioRef.current = {
      playBeep: () => createBeepSound(800, 0.2),
      playComplete: () => createBeepSound(1000, 0.5),
    } as any;
  }, []);

  const updateTimer = useCallback(() => {
    setTimeRemaining((prev) => {
      const newTime = prev - 1;
      const newProgress = ((duration - newTime) / duration) * 100;
      setProgress(newProgress);

      // Play sound cues
      if (newTime === 3 || newTime === 2 || newTime === 1) {
        audioRef.current?.playBeep?.();
      }

      if (newTime <= 0) {
        setIsActive(false);
        audioRef.current?.playComplete?.();
        onComplete?.();
        return 0;
      }

      return newTime;
    });
  }, [duration, onComplete]);

  const start = useCallback(() => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(updateTimer, 1000);
    }
  }, [isActive, updateTimer]);

  const pause = useCallback(() => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resume = useCallback(() => {
    if (!isActive && timeRemaining > 0) {
      setIsActive(true);
      intervalRef.current = setInterval(updateTimer, 1000);
    }
  }, [isActive, timeRemaining, updateTimer]);

  const reset = useCallback(() => {
    pause();
    setTimeRemaining(duration);
    setProgress(0);
  }, [duration, pause]);

  const skip = useCallback(() => {
    pause();
    setTimeRemaining(0);
    setProgress(100);
    onComplete?.();
  }, [pause, onComplete]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    timeRemaining,
    progress,
    isActive,
    start,
    pause,
    resume,
    reset,
    skip,
  };
}

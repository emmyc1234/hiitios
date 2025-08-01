import { useCallback, useRef } from 'react';

export function useSpeech() {
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number; volume?: number }) => {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set voice options
    utterance.rate = options?.rate || 1.0;
    utterance.pitch = options?.pitch || 1.0;
    utterance.volume = options?.volume || 0.8;
    
    // Try to use a clear, neutral voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && 
      (voice.name.includes('Google') || voice.name.includes('Microsoft') || voice.default)
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, []);

  const announceExercise = useCallback((exerciseName: string) => {
    // Clean up exercise name for better pronunciation
    const cleanName = exerciseName
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
      .replace(/-/g, ' ') // Replace hyphens with spaces
      .toLowerCase();
    
    speak(`Next exercise: ${cleanName}`, { rate: 0.9, volume: 0.9 });
  }, [speak]);

  const announceCountdown = useCallback((seconds: number) => {
    if (seconds <= 3 && seconds > 0) {
      speak(seconds.toString(), { rate: 1.2, volume: 1.0 });
    }
  }, [speak]);

  const announceTransition = useCallback((message: string) => {
    speak(message, { rate: 0.9, volume: 0.8 });
  }, [speak]);

  return {
    speak,
    stop,
    announceExercise,
    announceCountdown,
    announceTransition
  };
}
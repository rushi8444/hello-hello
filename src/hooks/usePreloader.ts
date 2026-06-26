// src/hooks/usePreloader.ts
import { useState, useCallback } from 'react';

export function usePreloader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderVisible(false);
    // Small delay before showing content for smooth transition
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  return {
    isLoaded,
    isPreloaderVisible,
    handlePreloaderComplete,
  };
}
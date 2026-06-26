// src/components/layout/Preloader.tsx
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

const IMAGES = [
  '/preloader/image-01.jpg',
  '/preloader/image-02.jpg',
  '/preloader/image-03.jpg',
  '/preloader/image-04.jpg',
  '/preloader/image-05.jpg',
  '/preloader/image-06.jpg',
];

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cardRotations, setCardRotations] = useState<number[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize random rotations
  useEffect(() => {
    const rotations = IMAGES.map(() => (Math.random() - 0.5) * 30);
    setCardRotations(rotations);
  }, []);

  // Progress counter + image cycling
  useEffect(() => {
    const duration = 2500;
    const steps = 100;
    const stepTime = duration / steps;

    let current = 0;
    intervalRef.current = setInterval(() => {
      current += 1;
      setProgress(current);
      
      // Update the active image less frequently to slow down the switching speed
      if (current % 6 === 0) {
        setCurrentImageIndex((prev) => (prev + 1) % IMAGES.length);
      }

      if (current >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        handleComplete();
      }
    }, stepTime);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Shuffle card rotations
  useEffect(() => {
    const shuffleInterval = setInterval(() => {
      if (!isExiting) {
        setCardRotations(IMAGES.map(() => (Math.random() - 0.5) * 25));
      }
    }, 150);

    return () => clearInterval(shuffleInterval);
  }, [isExiting]);

  const handleComplete = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, 1200);
  }, [onComplete]);

  const formatNumber = (num: number) => num.toString().padStart(3, '0');

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
          initial={{ y: 0 }}
          animate={{ y: isExiting ? '100%' : 0 }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
            delay: isExiting ? 0.2 : 0,
          }}
        >
          {/* OUTFIT Text Layout */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative flex items-center">
              {/* "O" */}
              <motion.span
                className="relative z-[5] text-[#f0ece6] mix-blend-difference text-[120px] md:text-[180px] font-bold leading-none tracking-tighter"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isExiting ? 0 : 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                O
              </motion.span>

              {/* Card Stack */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-[200px] h-[260px] md:w-[240px] md:h-[320px]">
                {IMAGES.map((img, i) => {
                  const isActive = i === currentImageIndex % IMAGES.length;
                  const rotation = cardRotations[i] || 0;

                  return (
                    <motion.div
                      key={i}
                      className="absolute inset-0 rounded-sm overflow-hidden shadow-2xl"
                      style={{
                        backgroundColor:
                          i % 3 === 0 ? '#c41e3a' : i % 3 === 1 ? '#f0ece6' : '#1a1a1a',
                        zIndex: isActive ? 10 : IMAGES.length - i,
                      }}
                      animate={{
                        rotate: isExiting ? rotation * 2 : rotation,
                        scale: isActive ? 1.02 : 1,
                        y: isExiting ? 100 : 0,
                        opacity: isExiting && !isActive ? 0 : 1,
                      }}
                      transition={{
                        rotate: { duration: 0.15, ease: 'linear' },
                        scale: { duration: 0.2 },
                        y: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
                        opacity: { duration: 0.3 },
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                      <div className="absolute inset-0 overflow-hidden">
                        <img
                          src={img}
                          alt=""
                          className="w-full h-full object-cover"
                          style={{ filter: isActive ? 'none' : 'brightness(0.9)' }}
                        />
                      </div>
                      <div className="absolute bottom-3 right-3 text-white/60 text-xs font-mono">
                        ++
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* "UT" */}
              <motion.span
                className="relative z-[5] text-[#f0ece6] mix-blend-difference text-[120px] md:text-[180px] font-bold leading-none tracking-tighter"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isExiting ? 0 : 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                UT
              </motion.span>

              {/* "FIT" */}
              <motion.span
                className="relative z-[5] text-[#f0ece6] mix-blend-difference text-[120px] md:text-[180px] font-bold leading-none tracking-tighter ml-2 md:ml-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: isExiting ? 0 : 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                FIT
              </motion.span>

              {/* ® */}
              <motion.span
                className="relative z-[5] text-[#f0ece6] mix-blend-difference text-[24px] md:text-[32px] font-normal self-start mt-8 md:mt-12 ml-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: isExiting ? 0 : 0.8 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                ®
              </motion.span>
            </div>
          </div>

          {/* Counter */}
          <motion.div
            className="absolute top-8 right-8 md:top-12 md:right-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[#f0ece6] text-[28px] md:text-[36px] font-mono tabular-nums">
              {formatNumber(progress)}
            </span>
          </motion.div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
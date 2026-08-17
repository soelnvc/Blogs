'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './EntranceAnimation.module.css';
import SGEmblem from './SGEmblem';

export default function EntranceAnimation() {
  const [phase, setPhase] = useState('initial'); // 'initial' | 'rotating' | 'unlocking' | 'complete'
  const [isComplete, setIsComplete] = useState(false);

  const playSequence = () => {
    document.documentElement.classList.remove('intro-seen');
    setIsComplete(false);
    setPhase('initial');

    const rotateTimer = setTimeout(() => {
      setPhase('rotating');
    }, 150);

    const openTimer = setTimeout(() => {
      setPhase('unlocking');
    }, 1150);

    const finishTimer = setTimeout(() => {
      setIsComplete(true);
      document.documentElement.classList.add('intro-seen');
      sessionStorage.setItem('hasSeenIntro_v2', 'true');
    }, 2200);

    return () => {
      clearTimeout(rotateTimer);
      clearTimeout(openTimer);
      clearTimeout(finishTimer);
    };
  };

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro_v2');
    if (!hasSeenIntro) {
      playSequence();
    } else {
      document.documentElement.classList.add('intro-seen');
      setIsComplete(true);
    }

    const handleReplay = () => {
      playSequence();
    };

    window.addEventListener('replay-entrance-animation', handleReplay);
    return () => window.removeEventListener('replay-entrance-animation', handleReplay);
  }, []);

  if (isComplete) return null;

  const isDoorsOpen = phase === 'unlocking';

  return (
    <AnimatePresence>
      {!isComplete && (
        <div className={styles.entranceOverlay}>
          {/* Center Vertical 1px Seam Line */}
          <motion.div 
            className={styles.centerSeamLine}
            animate={{ opacity: isDoorsOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />

          {/* Left Door (slides left) */}
          <motion.div
            className={styles.doorLeft}
            initial={{ x: 0 }}
            animate={{ x: isDoorsOpen ? '-100%' : 0 }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Right Door (slides right) */}
          <motion.div
            className={styles.doorRight}
            initial={{ x: 0 }}
            animate={{ x: isDoorsOpen ? '100%' : 0 }}
            transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
          />

          {/* Central Rotating & Dropping Lock Circle - Mathematically Centered Anchor */}
          <div className={styles.centerLockWrapper}>
            <motion.div
              initial={{ rotate: 0, y: 0 }}
              animate={
                isDoorsOpen
                  ? {
                      y: '120vh',
                      rotate: 180,
                      opacity: [1, 1, 0.8, 0],
                    }
                  : phase === 'rotating'
                  ? {
                      rotate: 180,
                    }
                  : {
                      rotate: 0,
                    }
              }
              transition={
                isDoorsOpen
                  ? {
                      y: { duration: 0.7, ease: [0.55, 0.085, 0.68, 0.53] }, // Gravity drop curve
                      rotate: { duration: 0.7, ease: 'easeIn' },
                      opacity: { duration: 0.7, times: [0, 0.6, 0.85, 1] },
                    }
                  : {
                      rotate: { duration: 0.9, ease: [0.65, 0, 0.35, 1] }, // Snappy mechanical lock turn
                    }
              }
            >
              <SGEmblem size={88} />
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

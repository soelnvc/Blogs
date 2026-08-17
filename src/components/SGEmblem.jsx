'use client';

import React from 'react';
import styles from './SGEmblem.module.css';

export default function SGEmblem({ 
  size = 84, 
  className = '', 
  variant = 'white', // 'white' | 'theme' | 'hoverInvert'
  style = {}
}) {
  let variantClass = styles.staticWhite;
  if (variant === 'hoverInvert') {
    variantClass = styles.hoverInvert;
  } else if (variant === 'theme') {
    variantClass = styles.staticStandard;
  }

  return (
    <div 
      className={`${styles.emblemContainer} ${variantClass} ${className}`}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      <span
        className={styles.emblemText}
        style={{
          fontSize: `${size * 0.38}px`,
        }}
      >
        SG
      </span>
    </div>
  );
}

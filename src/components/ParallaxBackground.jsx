import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  const { scrollY } = useScroll();
  
  // Create depth by moving these slower than the scroll
  // Positive values make it move down (slower than scroll), negative makes it move up faster
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, 150]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 450]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      pointerEvents: 'none',
      overflow: 'hidden',
    }}>
      <motion.div 
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '40vw',
          height: '60vh',
          backgroundColor: 'var(--color-shape)',
          opacity: 0.5,
          y: y1,
        }}
      />
      <motion.div 
        style={{
          position: 'absolute',
          top: '40%',
          right: '10%',
          width: '30vw',
          height: '50vh',
          backgroundColor: 'var(--color-shape)',
          opacity: 0.3,
          y: y2,
        }}
      />
      <motion.div 
        style={{
          position: 'absolute',
          top: '70%',
          left: '20%',
          width: '50vw',
          height: '40vh',
          backgroundColor: 'var(--color-shape)',
          opacity: 0.4,
          y: y3,
        }}
      />
    </div>
  );
};

export default ParallaxBackground;

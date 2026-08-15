import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Footer.module.css';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const Footer = () => {
  return (
    <div className={styles.footerRevealWrapper}>
      <motion.footer 
        className={styles.footerSticky}
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }} 
        variants={staggerContainer}
      >
        <motion.div className={styles.footerLogo} variants={fadeUpVariant}>
          <span className="heading-condensed" style={{ fontSize: '2rem', letterSpacing: '0.05em' }}>
            S<span style={{ color: 'var(--color-highlight)' }}>·</span>G
          </span>
        </motion.div>
        <motion.div className={styles.footerCol} variants={fadeUpVariant}>
          <h5 className="text-mono" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>NAVIGATION</h5>
          <Link to="/">Home</Link>
          <Link to="/articles">Articles</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/about">About</Link>
        </motion.div>
        <motion.div className={styles.footerCol} variants={fadeUpVariant}>
          <h5 className="text-mono" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>RESOURCES</h5>
          <Link to="/articles">All Articles</Link>
          <Link to="/topics">Topics</Link>
          <Link to="/search">Search</Link>
        </motion.div>
        <motion.div className={styles.footerCol} variants={fadeUpVariant}>
          <h5 className="text-mono" style={{ fontWeight: 'bold', marginBottom: '1.5rem' }}>ELSEWHERE</h5>
          <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="#" target="_blank" rel="noopener noreferrer">X</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        </motion.div>
        <motion.div className={styles.footerCopyright} variants={fadeUpVariant}>
          <p className="text-mono" style={{ fontSize: '0.75rem', opacity: 0.6 }}>
            &copy; 2026 Siddhesh Goel.<br />All rights reserved.
          </p>
        </motion.div>
      </motion.footer>
    </div>
  );
};

export default Footer;

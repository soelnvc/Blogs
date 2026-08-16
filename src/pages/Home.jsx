import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import InteractiveParticleText from '../components/InteractiveParticleText';
import LiquidHover from '../components/LiquidHover';
import Footer from '../components/Footer';
import { useTheme } from '../context/ThemeContext';
import styles from './Home.module.css';

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

const ImageParallax = ({ src, alt, speed = 0.2, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }} className={className}>
      <motion.div style={{ y, width: '115%', height: '130%', top: '-15%', left: '-7.5%', position: 'absolute' }}>
        <LiquidHover image={src} cursorSize={0.6} cursorPower={0.5} distortionPower={0.5} />
      </motion.div>
    </div>
  );
};

const ParallaxArticleCard = ({ article, index, scrollYProgress, onClick }) => {
  // Parallax velocity offsets (+25% strength):
  // Card 1 (index 0): slowest anchor
  // Card 2 (index 1): faster
  // Card 3 (index 2): even faster
  // Card 4 (index 3): fastest
  const speedOffsets = [
    [12, -12],   // 01: Slowest anchor
    [60, -60],   // 02: Faster (+25%)
    [120, -120], // 03: Faster still (+25%)
    [200, -200]  // 04: Fastest (+25%)
  ];

  const offset = speedOffsets[index] || [25 * (index + 1), -25 * (index + 1)];
  const y = useTransform(scrollYProgress, [0, 1], offset);

  return (
    <motion.div 
      className={styles.latestRow}
      style={{ y, zIndex: index + 1 }}
      onClick={onClick}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.latestId}>
        <span className="heading-condensed" style={{ fontSize: '3rem' }}>{article.id}</span>
      </div>
      <div className={styles.latestCategory}>
        <span className="text-mono">{article.category}</span>
      </div>
      <div className={styles.latestTitleBlock}>
        <h3 className="heading-serif" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{article.title}</h3>
        <p className="text-mono" style={{ fontSize: '0.75rem', opacity: 0.6, maxWidth: '300px' }}>
          The story behind the idea, the architecture, and the lessons that mattered.
        </p>
      </div>
      <div className={styles.latestMeta}>
        <span className="text-mono" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>{article.date}</span>
        <span className="text-mono" style={{ fontSize: '0.75rem', opacity: 0.6 }}>{article.readTime}</span>
      </div>
      <div className={styles.latestArrow}>
        <ArrowRight size={20} className={styles.iconAccent} />
      </div>
    </motion.div>
  );
};

const Home = () => {
  const navigate = useNavigate();

  const latestArticles = [
    { id: '01', category: 'TECHNOLOGY', title: 'How I Built My First AI Agent', date: 'AUG 15, 2026', readTime: '08 MIN READ' },
    { id: '02', category: 'DESIGN', title: 'Why Minimal Interfaces Feel Better', date: 'AUG 11, 2026', readTime: '06 MIN READ' },
    { id: '03', category: 'BUILDING', title: 'What Building in Public Taught Me', date: 'AUG 07, 2026', readTime: '10 MIN READ' },
    { id: '04', category: 'LIFE', title: 'Notes on Focus in a Distracted World', date: 'AUG 02, 2026', readTime: '07 MIN READ' }
  ];

  const topics = [
    { id: '01', title: 'TECHNOLOGY', count: '18 ARTICLES', img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80' },
    { id: '02', title: 'DESIGN', count: '12 ARTICLES', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
    { id: '03', title: 'BUILDING', count: '09 ARTICLES', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { id: '04', title: 'LIFE', count: '07 ARTICLES', img: 'https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=800&q=80' },
    { id: '05', title: 'PHILOSOPHY', count: '05 ARTICLES', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80' },
    { id: '06', title: 'BUSINESS', count: '04 ARTICLES', img: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80' },
    { id: '07', title: 'PHOTOGRAPHY', count: '06 ARTICLES', img: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80' },
    { id: '08', title: 'CINEMA', count: '05 ARTICLES', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80' },
  ];

  const heroScrollRef = useRef(null);
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 1000], ["-10%", "5%"]);
  const { theme } = useTheme();

  // Scroll tracking for Latest Section Deck Parallax
  const latestSectionRef = useRef(null);
  const { scrollYProgress: latestScrollProgress } = useScroll({
    target: latestSectionRef,
    offset: ["start end", "end start"]
  });

  const particleTextColor = theme === 'dark' ? '#F5F5F3' : '#111111';
  const particleSecondaryColor = theme === 'dark' ? '#F40E3F' : (theme === 'red' ? '#111111' : '#F40E3F');
  const particleColorMix = theme === 'red' ? 0 : 10;

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {/* 01 - Hero */}
      <section className={styles.hero} id="hero" ref={heroScrollRef}>
        <motion.div 
          className={styles.heroLeft}
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={fadeUpVariant}
            style={{ width: '100%', height: 'auto', cursor: 'crosshair', zIndex: 10, position: 'relative' }}
          >
            <InteractiveParticleText 
              text={["THOUGHTS,", "IDEAS,", "AND THINGS", "I'VE FIGURED", "OUT."]}
              fontFamily='"Oswald", sans-serif'
              fontWeight="700"
              textColor={particleTextColor}
              secondaryColor={particleSecondaryColor}
              colorMix={particleColorMix}
            />
          </motion.div>
          
          <motion.div 
            className={styles.heroSubtitleWrapper}
            variants={fadeUpVariant}
          >
            <p className={styles.heroSubtitle}>
              A personal archive of things I learn,<br />
              build, question, and discover.
            </p>
            <div className={styles.heroCtaWrapper}>
              <div className={styles.heroCtaArrowContainer}>
                <ArrowUpRight size={20} className={styles.heroCtaArrow} />
                <ArrowUpRight size={20} className={styles.heroCtaArrowClone} />
              </div>
              <Link to="/articles" className={styles.exploreLink}>
                EXPLORE ARTICLES
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.scrollIndicator}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            SCROLL
          </motion.div>
        </motion.div>
        <div className={styles.heroRight}>
          <motion.div style={{ y: heroImageY, height: '130%', width: '120%', top: '-15%', left: '-10%', position: 'absolute' }}>
            <LiquidHover 
               image="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=1200&q=80"
               cursorSize={0.6}
               cursorPower={0.5}
               distortionPower={0.5}
            />
          </motion.div>
          <motion.div 
            className={styles.heroImageCaption}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            DOCUMENTING THE PROCESS.<br />
            NOT JUST THE OUTCOME.<br />
            <div className={styles.captionLine}></div>
          </motion.div>
        </div>
      </section>

      {/* 02 - Featured Article */}
      <section className={styles.featured}>
        <motion.div 
          className={styles.featuredHeader}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        >
          <span className="text-mono">FEATURED</span>
        </motion.div>
        <div className={styles.featuredContent}>
          <motion.div 
            className={styles.featuredImageWrapper}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <ImageParallax src="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80" alt="Architecture and stairs" />
            <div className={styles.featuredReadTime}>
              <span className="heading-condensed" style={{ fontSize: '2rem' }}>08</span><br />
              <span className="text-mono" style={{ fontSize: '0.7rem' }}>MIN READ</span>
              <div className={styles.smallLine}></div>
            </div>
          </motion.div>
          <motion.div 
            className={styles.featuredText}
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
          >
            <div className={styles.featuredMetaTop}>
              <span className="text-mono">TECHNOLOGY</span>
              <span className="text-mono">AUGUST 15, 2026</span>
            </div>
            <h2 className="heading-serif" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
              How I Built<br />My First AI Agent
            </h2>
            <p className="text-mono" style={{ maxWidth: '400px', marginBottom: '3rem' }}>
              A practical story about APIs, hallucinations, failed experiments, and what actually worked.
            </p>
            <Link to="/article/1" className={styles.readArticleLink}>
              READ ARTICLE &rarr;
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 03 - Latest Articles with Staggered Parallax Deck Scroll */}
      <section className={styles.latest} id="articles" ref={latestSectionRef}>
        <motion.div 
          className={styles.latestHeader}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        >
          <span className="text-mono" style={{ letterSpacing: '0.1em' }}>LATEST</span>
          <Link to="/articles" className={styles.viewAllLink}>VIEW ALL ARTICLES &rarr;</Link>
        </motion.div>
        <div className={styles.latestList}>
          {latestArticles.map((article, index) => (
            <ParallaxArticleCard 
              key={article.id}
              article={article}
              index={index}
              total={latestArticles.length}
              scrollYProgress={latestScrollProgress}
              onClick={() => navigate('/article/1')}
            />
          ))}
        </div>
      </section>

      {/* 04 - Topics */}
      <section className={styles.topics} id="topics">
        <motion.div 
          className={styles.latestHeader} style={{ marginBottom: '3rem' }}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUpVariant}
        >
          <span className="text-mono" style={{ letterSpacing: '0.1em' }}>EXPLORE BY TOPIC</span>
          <Link to="/topics" className={styles.viewAllLink}>VIEW ALL TOPICS &rarr;</Link>
        </motion.div>
        <motion.div 
          className={styles.topicGrid}
          variants={staggerContainer}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
        >
          {topics.map((topic) => (
            <motion.div 
              key={topic.id} 
              className={styles.topicCard} 
              variants={fadeUpVariant}
              onClick={() => navigate('/topics')}
            >
              <div className={styles.topicHeader}>
                <span className="heading-condensed" style={{ fontSize: '3.5rem' }}>{topic.id}</span>
              </div>
              <div className={styles.topicInfo}>
                <h4 className="text-mono" style={{ fontWeight: 'bold', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{topic.title}</h4>
                <span className="text-mono" style={{ fontSize: '0.75rem', opacity: 0.6 }}>{topic.count}</span>
              </div>
              <div className={styles.topicImageWrapper}>
                <img src={topic.img} alt={topic.title} />
                <div className={styles.topicArrow}>
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 05 - Personal Statement */}
      <section className={styles.statement} id="about">
        <motion.div 
          className={styles.statementLeft}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUpVariant}
        >
          <h2 className="heading-serif" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.8rem)', lineHeight: 1.2 }}>
            A journal of curiosity,<br />
            experimentation,<br />
            and becoming.
          </h2>
        </motion.div>
        <motion.div 
          className={styles.statementMiddle}
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-mono" style={{ lineHeight: '2.5', opacity: 0.85 }}>
            I write to understand.<br />
            To connect the dots.<br />
            To document the process,<br />
            not just the outcome.
          </p>
          <motion.div 
            className={styles.horizontalLine} style={{ marginTop: '2rem', width: '50px', transformOrigin: 'left' }}
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      </section>
      </main>

      {/* 08 - Footer */}
      <Footer />
    </div>
  );
};

export default Home;

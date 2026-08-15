import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import styles from './Blogs.module.css';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
import LiquidHover from '../components/LiquidHover';
import { useTheme } from '../context/ThemeContext';

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

const archiveData = [
  {
    year: '2026',
    isExpandedDefault: true,
    totalArticles: 18,
    months: [
      {
        month: 'AUGUST',
        articles: [
          {
            id: '01',
            category: 'TECHNOLOGY',
            title: 'How I Built My First AI Agent',
            subtitle: 'The story behind the idea, the architecture, and the lessons that mattered.',
            date: 'AUG 15, 2026',
            readTime: '08 MIN READ',
            link: '/article/1'
          },
          {
            id: '02',
            category: 'DESIGN',
            title: 'Why Minimal Interfaces Feel Better',
            subtitle: 'Exploring clarity, hierarchy and the power of restraint in design.',
            date: 'AUG 11, 2026',
            readTime: '06 MIN READ',
            link: '/article/2'
          },
          {
            id: '03',
            category: 'BUILDING',
            title: 'What Building in Public Taught Me',
            subtitle: 'On shipping consistently, feedback loops and embracing the messy middle.',
            date: 'AUG 07, 2026',
            readTime: '10 MIN READ',
            link: '/article/3'
          },
          {
            id: '04',
            category: 'LIFE',
            title: 'Notes on Focus in a Distracted World',
            subtitle: 'Thoughts on protecting attention and doing deep work in the age of noise.',
            date: 'AUG 02, 2026',
            readTime: '07 MIN READ',
            link: '/article/4'
          }
        ]
      },
      {
        month: 'JULY',
        articles: [
          {
            id: '05',
            category: 'TECHNOLOGY',
            title: 'Understanding Vector Databases',
            subtitle: 'A gentle introduction to embeddings, similarity search and RAG.',
            date: 'JUL 28, 2026',
            readTime: '09 MIN READ',
            link: '/article/5'
          },
          {
            id: '06',
            category: 'DESIGN',
            title: 'The Aesthetics of Good Systems',
            subtitle: 'Why beauty in systems isn\'t decoration - it\'s structure.',
            date: 'JUL 21, 2026',
            readTime: '05 MIN READ',
            link: '/article/6'
          },
          {
            id: '07',
            category: 'PHILOSOPHY',
            title: 'On Learning, Unlearning and Relearning',
            subtitle: 'A short note on staying curious as everything changes.',
            date: 'JUL 14, 2026',
            readTime: '06 MIN READ',
            link: '/article/7'
          }
        ]
      }
    ]
  },
  {
    year: '2025',
    isExpandedDefault: false,
    totalArticles: 24,
    months: []
  },
  {
    year: '2024',
    isExpandedDefault: false,
    totalArticles: 31,
    months: []
  },
  {
    year: '2023',
    isExpandedDefault: false,
    totalArticles: 17,
    months: []
  },
  {
    year: '2022',
    isExpandedDefault: false,
    totalArticles: 9,
    months: []
  }
];

const filters = ['ALL', 'TECHNOLOGY', 'DESIGN', 'BUILDING', 'LIFE', 'PHILOSOPHY', 'BUSINESS', 'PHOTOGRAPHY'];

const ArticleRow = ({ article }) => {
  return (
    <motion.div 
      className={styles.articleRow}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className={styles.articleNumberWrapper}>
        <span className="heading-medium" style={{fontSize: '1.25rem', opacity: 0.8}}>{article.id}</span>
      </div>
      
      <div className={styles.articleMainContent}>
        <span className={`${styles.articleCategory} text-mono`}>{article.category}</span>
        <Link to={article.link} className={styles.articleTitleLink}>
          <h4 className="heading-medium" style={{fontSize: '1.5rem', marginBottom: '0.75rem', marginTop: '0.5rem'}}>{article.title}</h4>
        </Link>
        <p className={`${styles.articleSubtitle} text-mono`} style={{textTransform: 'none'}}>{article.subtitle}</p>
      </div>

      <div className={styles.articleMetaWrapper}>
        <div className={`${styles.articleMeta} text-mono`}>
          <span>{article.date}</span>
          <span>{article.readTime}</span>
        </div>
        <ArrowRight size={20} className={styles.articleArrow} />
      </div>
    </motion.div>
  );
};

const MonthBlock = ({ year, month, articles, isFirstMonth }) => {
  return (
    <div className={styles.monthBlock}>
      <div className={styles.leftCol}>
        <div className={styles.stickyContainer}>
          {isFirstMonth && <h2 className={`${styles.stickyYear} heading-medium`}>{year}</h2>}
          <div className={styles.monthLabelWrapper}>
            <h3 className={`${styles.stickyMonth} text-mono`}>{month}</h3>
            <div className={styles.monthDash}></div>
          </div>
        </div>
      </div>
      <div className={styles.rightCol}>
        <div className={styles.articlesList}>
          {articles.map((article) => (
            <ArticleRow key={article.id} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CollapsibleYear = ({ yearData }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.collapsibleYearWrapper}>
      <div 
        className={styles.collapsibleYearHeader} 
        onClick={() => setExpanded(!expanded)}
      >
        <div className={styles.collapsibleYearLeft}>
          <span className="heading-medium" style={{fontSize: '1.5rem'}}>{yearData.year}</span>
        </div>
        <div className={styles.collapsibleYearLine}></div>
        <div className={styles.collapsibleYearRight}>
          <span className={styles.collapsibleYearIcon}>
            {expanded ? <Minus size={16} /> : <Plus size={16} />}
          </span>
        </div>
      </div>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={styles.collapsibleYearContent}
          >
            {yearData.months.length > 0 ? (
              yearData.months.map((monthData, idx) => (
                <MonthBlock 
                  key={idx} 
                  year={yearData.year} 
                  month={monthData.month} 
                  articles={monthData.articles} 
                  isFirstMonth={idx === 0}
                />
              ))
            ) : (
              <div className={styles.emptyYearMessage}>
                <p className="text-mono">Articles for {yearData.year} are currently being archived.</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Blogs = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const { theme } = useTheme();
  const waveStroke = theme === 'red' 
    ? 'rgba(17, 17, 17, 0.85)' 
    : (theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)');

  return (
    <div className={styles.pageWrapper}>
      <main className={styles.mainContent}>
        <WavesBackground strokeColor={waveStroke} spacing={8}>
          <div className={styles.heroSectionWrapper}>
            <div className={styles.container} style={{ paddingBottom: '0', minHeight: 'auto' }}>
            {/* 01 - Header Section */}
            <header className={styles.journalHeader}>
              <div className={styles.journalHeaderLeft}>
          <motion.span 
            className="text-mono"
            style={{ fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '2rem', display: 'block' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            JOURNAL
          </motion.span>
          <motion.h1 
            className="heading-medium"
            style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: '1.1', maxWidth: '800px' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            An archive of thoughts,<br/>
            experiments, observations,<br/>
            and things worth remembering.
          </motion.h1>
        </div>
        <motion.div 
          className={styles.journalHeaderRight}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <LiquidHover 
              image="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80" 
              cursorSize={0.6} 
              cursorPower={0.5} 
              distortionPower={0.5} 
            />
          </div>
        </motion.div>
      </header>
        </div>
      </div>
      </WavesBackground>

      <div className={styles.container} style={{ paddingTop: '2rem', paddingBottom: '0', minHeight: 'auto' }}>
        {/* 02 - Filters */}
        <motion.div 
          className={styles.filtersWrapper}
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
        >
          {filters.map((f) => (
          <motion.div key={f} className={styles.filterItem} variants={fadeUpVariant}>
            <button 
              className={`${styles.filterBtn} text-mono ${activeFilter === f ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
            {activeFilter === f && (
              <motion.div layoutId="activeFilter" className={styles.filterActiveBar}></motion.div>
            )}
          </motion.div>
        ))}
        </motion.div>
        <div className={styles.divider}></div>
      </div>
      
      <div className={styles.container} style={{ paddingTop: '2rem' }}>
        {/* 03 - Timeline */}
      <motion.div 
        className={styles.timelineContainer}
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
      >
        {archiveData.map((yearData) => {
          if (yearData.isExpandedDefault) {
            return (
              <div key={yearData.year} className={styles.expandedYearWrapper}>
                {yearData.months.map((monthData, idx) => (
                  <MonthBlock 
                    key={idx} 
                    year={yearData.year} 
                    month={monthData.month} 
                    articles={monthData.articles} 
                    isFirstMonth={idx === 0}
                  />
                ))}
              </div>
            );
          } else {
            return <CollapsibleYear key={yearData.year} yearData={yearData} />;
          }
        })}
      </motion.div>
      </div>
      </main>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
};

export default Blogs;

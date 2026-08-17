'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import styles from './Blogs.module.css';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
import LiquidHover from '../components/LiquidHover';
import { useTheme } from '../context/ThemeContext';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const allArticles = [
  {
    id: '01',
    category: 'TECHNOLOGY',
    title: 'How I Built My First AI Agent',
    subtitle: 'The story behind the idea, the architecture, and the lessons that mattered.',
    date: 'AUG 15, 2026',
    readTime: '08 MIN READ',
    year: '2026',
    month: 'AUGUST',
    link: '/article/1'
  },
  {
    id: '02',
    category: 'DESIGN',
    title: 'Why Minimal Interfaces Feel Better',
    subtitle: 'Exploring clarity, hierarchy and the power of restraint in design.',
    date: 'AUG 11, 2026',
    readTime: '06 MIN READ',
    year: '2026',
    month: 'AUGUST',
    link: '/article/2'
  },
  {
    id: '03',
    category: 'BUILDING',
    title: 'What Building in Public Taught Me',
    subtitle: 'On shipping consistently, feedback loops and embracing the messy middle.',
    date: 'AUG 07, 2026',
    readTime: '10 MIN READ',
    year: '2026',
    month: 'AUGUST',
    link: '/article/3'
  },
  {
    id: '04',
    category: 'LIFE',
    title: 'Notes on Focus in a Distracted World',
    subtitle: 'Thoughts on protecting attention and doing deep work in the age of noise.',
    date: 'AUG 02, 2026',
    readTime: '07 MIN READ',
    year: '2026',
    month: 'AUGUST',
    link: '/article/4'
  },
  {
    id: '05',
    category: 'TECHNOLOGY',
    title: 'Understanding Vector Databases',
    subtitle: 'A gentle introduction to embeddings, similarity search and RAG.',
    date: 'JUL 28, 2026',
    readTime: '09 MIN READ',
    year: '2026',
    month: 'JULY',
    link: '/article/5'
  },
  {
    id: '06',
    category: 'DESIGN',
    title: 'The Aesthetics of Good Systems',
    subtitle: 'Why beauty in systems isn\'t decoration - it\'s structure.',
    date: 'JUL 21, 2026',
    readTime: '05 MIN READ',
    year: '2026',
    month: 'JULY',
    link: '/article/6'
  },
  {
    id: '07',
    category: 'PHILOSOPHY',
    title: 'On Learning, Unlearning and Relearning',
    subtitle: 'A short note on staying curious as everything changes.',
    date: 'JUL 14, 2026',
    readTime: '06 MIN READ',
    year: '2026',
    month: 'JULY',
    link: '/article/7'
  },
  {
    id: '08',
    category: 'BUSINESS',
    title: 'Bootstrapping vs Venture Capital in 2026',
    subtitle: 'Evaluating optionality, leverage, and sustainable cashflow in modern tech.',
    date: 'JUN 28, 2026',
    readTime: '11 MIN READ',
    year: '2026',
    month: 'JUNE',
    link: '/article/8'
  },
  {
    id: '09',
    category: 'PHOTOGRAPHY',
    title: 'Seeing in Monochromatic High Contrast',
    subtitle: 'How stripping color reveals structure, texture, and light narrative.',
    date: 'JUN 15, 2026',
    readTime: '04 MIN READ',
    year: '2026',
    month: 'JUNE',
    link: '/article/9'
  },
  {
    id: '10',
    category: 'TECHNOLOGY',
    title: 'Autonomous Code Generation Pipelines',
    subtitle: 'Building resilient automated developer loops with tool calling.',
    date: 'MAY 30, 2026',
    readTime: '12 MIN READ',
    year: '2026',
    month: 'MAY',
    link: '/article/10'
  },
  {
    id: '11',
    category: 'BUILDING',
    title: 'From Zero to Scaled Microservices',
    subtitle: 'Pragmatic distributed architectures without over-engineering.',
    date: 'MAY 18, 2026',
    readTime: '09 MIN READ',
    year: '2026',
    month: 'MAY',
    link: '/article/11'
  },
  {
    id: '12',
    category: 'LIFE',
    title: 'The Art of Deliberate Solitude',
    subtitle: 'Why undistracted thinking time is the greatest multiplier for creativity.',
    date: 'MAY 04, 2026',
    readTime: '05 MIN READ',
    year: '2026',
    month: 'MAY',
    link: '/article/12'
  },
  {
    id: '13',
    category: 'PHILOSOPHY',
    title: 'Determinism and Emergence in Complex Code',
    subtitle: 'Exploring how simple rules produce unpredictably rich behaviors.',
    date: 'APR 20, 2026',
    readTime: '08 MIN READ',
    year: '2026',
    month: 'APRIL',
    link: '/article/13'
  },
  {
    id: '14',
    category: 'BUSINESS',
    title: 'Pricing Digital Artifacts and Software',
    subtitle: 'Moving beyond commodity subscriptions to value-anchored models.',
    date: 'APR 08, 2026',
    readTime: '07 MIN READ',
    year: '2026',
    month: 'APRIL',
    link: '/article/14'
  },
  {
    id: '15',
    category: 'PHOTOGRAPHY',
    title: 'Architectural Shadows and Brutalist Geometry',
    subtitle: 'Visual studies of concrete, negative space, and light gradients.',
    date: 'MAR 22, 2026',
    readTime: '06 MIN READ',
    year: '2026',
    month: 'MARCH',
    link: '/article/15'
  }
];

const filters = ['ALL', 'TECHNOLOGY', 'DESIGN', 'BUILDING', 'LIFE', 'PHILOSOPHY', 'BUSINESS', 'PHOTOGRAPHY'];

const ArticleRow = ({ article }) => {
  return (
    <motion.div 
      className={styles.articleRow}
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.articleNumberWrapper}>
        <span className="heading-medium" style={{ fontSize: '1.25rem', opacity: 0.8 }}>{article.id}</span>
      </div>
      
      <div className={styles.articleMainContent}>
        <span className={`${styles.articleCategory} text-mono`}>{article.category}</span>
        <Link href={article.link} className={styles.articleTitleLink}>
          <h4 className="heading-medium" style={{ fontSize: '1.5rem', marginBottom: '0.75rem', marginTop: '0.5rem' }}>{article.title}</h4>
        </Link>
        <p className={`${styles.articleSubtitle} text-mono`} style={{ textTransform: 'none' }}>{article.subtitle}</p>
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
          <AnimatePresence mode="popLayout">
            {articles.map((article) => (
              <ArticleRow key={article.id} article={article} />
            ))}
          </AnimatePresence>
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
          <span className="heading-medium" style={{ fontSize: '1.5rem' }}>{yearData.year}</span>
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

const BlogsContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTopic = searchParams.get('topic') || searchParams.get('q') || 'ALL';
  
  const [activeFilter, setActiveFilter] = useState(() => {
    const found = filters.find(f => f.toUpperCase() === initialTopic.toUpperCase());
    return found || 'ALL';
  });

  const { theme } = useTheme();
  const waveStroke = theme === 'red' 
    ? 'rgba(17, 17, 17, 0.85)' 
    : (theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)');

  // Sync state if URL query params change
  useEffect(() => {
    const topicParam = searchParams.get('topic') || searchParams.get('q');
    if (topicParam) {
      const match = filters.find(f => f.toUpperCase() === topicParam.toUpperCase());
      if (match) setActiveFilter(match);
    }
  }, [searchParams]);

  const handleFilterSelect = (filterName) => {
    setActiveFilter(filterName);
    if (filterName === 'ALL') {
      router.push('/articles', { scroll: false });
    } else {
      router.push(`/articles?topic=${encodeURIComponent(filterName)}`, { scroll: false });
    }
  };

  // Calculate count per category
  const categoryCounts = useMemo(() => {
    const counts = { ALL: allArticles.length };
    filters.forEach(f => {
      if (f !== 'ALL') {
        counts[f] = allArticles.filter(a => a.category.toUpperCase() === f.toUpperCase()).length;
      }
    });
    return counts;
  }, []);

  // Filtered articles
  const filteredArticles = useMemo(() => {
    if (activeFilter === 'ALL') return allArticles;
    return allArticles.filter(a => a.category.toUpperCase() === activeFilter.toUpperCase());
  }, [activeFilter]);

  // Group filtered articles into Year / Month blocks
  const groupedData = useMemo(() => {
    const monthsOrder = ['AUGUST', 'JULY', 'JUNE', 'MAY', 'APRIL', 'MARCH', 'FEBRUARY', 'JANUARY'];
    const yearMap = {};

    filteredArticles.forEach((art) => {
      if (!yearMap[art.year]) yearMap[art.year] = {};
      if (!yearMap[art.year][art.month]) yearMap[art.year][art.month] = [];
      yearMap[art.year][art.month].push(art);
    });

    const years = ['2026', '2025', '2024', '2023', '2022'];
    return years.map((y) => {
      const monthObj = yearMap[y] || {};
      const sortedMonths = Object.keys(monthObj).sort((a, b) => monthsOrder.indexOf(a) - monthsOrder.indexOf(b));
      const months = sortedMonths.map((m) => ({
        month: m,
        articles: monthObj[m]
      }));

      return {
        year: y,
        isExpandedDefault: y === '2026',
        totalArticles: months.reduce((acc, curr) => acc + curr.articles.length, 0),
        months
      };
    }).filter(y => y.year === '2026' || y.months.length > 0 || activeFilter === 'ALL');
  }, [filteredArticles, activeFilter]);

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

        <div className={styles.container} style={{ paddingTop: '2.5rem', paddingBottom: '0', minHeight: 'auto' }}>
          {/* 02 - Filters */}
          <motion.div 
            className={styles.filtersWrapper}
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer}
          >
            {filters.map((f) => {
              const isActive = activeFilter === f;
              const count = categoryCounts[f] || 0;

              return (
                <motion.div key={f} className={styles.filterItem} variants={fadeUpVariant}>
                  <button 
                    className={`${styles.filterBtn} text-mono ${isActive ? styles.filterBtnActive : ''}`}
                    onClick={() => handleFilterSelect(f)}
                    aria-label={`Filter by ${f} (${count} articles)`}
                  >
                    <span className={styles.filterText}>{f}</span>
                    <span className={styles.filterCount}>
                      {count < 10 ? `0${count}` : count}
                    </span>
                    {isActive && (
                      <motion.div 
                        layoutId="activeFilterUnderline" 
                        className={styles.filterActiveBar}
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Filter Status Meta */}
          <div className={styles.filterStatusMeta}>
            <span className="text-mono">
              {activeFilter === 'ALL' 
                ? `SHOWING ALL ${filteredArticles.length} ARTICLES` 
                : `FILTER: [ ${activeFilter} ] — ${filteredArticles.length} ${filteredArticles.length === 1 ? 'ARTICLE' : 'ARTICLES'}`}
            </span>
            {activeFilter !== 'ALL' && (
              <button 
                className={`${styles.clearFilterBtn} text-mono`}
                onClick={() => handleFilterSelect('ALL')}
              >
                CLEAR FILTER &times;
              </button>
            )}
          </div>

          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.container} style={{ paddingTop: '1.5rem', paddingBottom: '5rem' }}>
          {/* 03 - Timeline */}
          {filteredArticles.length > 0 ? (
            <motion.div 
              className={styles.timelineContainer}
              layout
            >
              {groupedData.map((yearData) => {
                if (yearData.isExpandedDefault) {
                  return (
                    <div key={yearData.year} className={styles.expandedYearWrapper}>
                      {yearData.months.map((monthData) => (
                        <MonthBlock 
                          key={monthData.month} 
                          year={yearData.year} 
                          month={monthData.month} 
                          articles={monthData.articles} 
                          isFirstMonth={monthData.month === yearData.months[0]?.month}
                        />
                      ))}
                    </div>
                  );
                } else {
                  return <CollapsibleYear key={yearData.year} yearData={yearData} />;
                }
              })}
            </motion.div>
          ) : (
            <motion.div 
              className={styles.emptyStateWrapper}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="heading-medium" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
                NO ARTICLES FOUND
              </h3>
              <p className="text-mono" style={{ opacity: 0.6, marginBottom: '2rem' }}>
                There are currently no published articles under the topic "{activeFilter}".
              </p>
              <button 
                className={`${styles.resetFilterBtn} text-mono`}
                onClick={() => handleFilterSelect('ALL')}
              >
                VIEW ALL ARTICLES &rarr;
              </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
};

const Blogs = () => {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />}>
      <BlogsContent />
    </Suspense>
  );
};

export default Blogs;

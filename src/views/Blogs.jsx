'use client';

import React, { useState, useMemo, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import styles from './Blogs.module.css';
import WavesBackground from '../components/WavesBackground';
import Footer from '../components/Footer';
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
          <h4 className={styles.articleTitle}>{article.title}</h4>
        </Link>
        <p className={styles.articleSubtitle}>{article.subtitle}</p>
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

const BlogsContent = ({ articles = [] }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchQuery = searchParams.get('q') || '';
  const topicParam = searchParams.get('topic') || '';
  
  const resultsRef = useRef(null);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Full list of topics (with dynamically included ones)
  const filters = useMemo(() => {
    const defaultTopics = ['ALL', 'WORK', 'TECH', 'DESIGN & COLORS', 'LIFE', 'ART AND PICS', 'BUILDING', 'OTHERS'];
    const articleCategories = articles.map(a => a.category?.toUpperCase()).filter(Boolean);
    const combined = new Set([...defaultTopics, ...articleCategories]);
    return Array.from(combined);
  }, [articles]);

  const [activeFilter, setActiveFilter] = useState(() => {
    if (topicParam) {
      const found = filters.find(f => f.toUpperCase() === topicParam.toUpperCase());
      return found || 'ALL';
    }
    return 'ALL';
  });

  const { theme } = useTheme();
  const waveStroke = theme === 'red' 
    ? 'rgba(17, 17, 17, 0.85)' 
    : (theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)');

  // Sync state if topic param changes
  useEffect(() => {
    if (topicParam) {
      const match = filters.find(f => f.toUpperCase() === topicParam.toUpperCase());
      if (match) setActiveFilter(match);
    } else if (!searchQuery) {
      setActiveFilter('ALL');
    }
  }, [topicParam, searchQuery, filters]);

  const scrollToResults = () => {
    if (resultsRef.current) {
      const yOffset = -90; // Offset for navbar
      const y = resultsRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Listen for search submissions to always re-scroll
  useEffect(() => {
    const handleEvent = () => {
      setTimeout(scrollToResults, 60);
    };
    window.addEventListener('scroll-to-search-results', handleEvent);
    return () => window.removeEventListener('scroll-to-search-results', handleEvent);
  }, []);

  // Perform semantic search via API if ?q= is present
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`)
        .then(res => res.json())
        .then(data => {
          setSearchResults(data.results || []);
          setIsSearching(false);

          // Auto smooth scroll directly to results skipping hero section
          setTimeout(scrollToResults, 120);
        })
        .catch(err => {
          console.error('Search fetch error:', err);
          setIsSearching(false);
        });
    } else {
      setSearchResults(null);
    }
  }, [searchQuery]);

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
    const counts = { ALL: articles.length };
    filters.forEach(f => {
      if (f !== 'ALL') {
        counts[f] = articles.filter(a => a.category?.toUpperCase() === f.toUpperCase()).length;
      }
    });
    return counts;
  }, [articles, filters]);

  // Filtered articles (or search results)
  const filteredArticles = useMemo(() => {
    if (searchQuery && searchResults !== null) {
      if (activeFilter === 'ALL') return searchResults;
      return searchResults.filter(a => a.category?.toUpperCase() === activeFilter.toUpperCase());
    }
    if (activeFilter === 'ALL') return articles;
    return articles.filter(a => a.category?.toUpperCase() === activeFilter.toUpperCase());
  }, [activeFilter, articles, searchQuery, searchResults]);

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
                    style={{ fontSize: '0.75rem', letterSpacing: '0.15em', marginBottom: '2rem', display: 'block', textAlign: 'center' }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    JOURNAL
                  </motion.span>
                  <div className={styles.heroTitleWrapper}>
                    <svg className={styles.sparkleLeft} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                    </svg>
                    <svg className={styles.sparkleRight} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
                    </svg>

                    <motion.h1 
                      className={styles.journalHeroTitle}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                    >
                      an aRchive of thOughts,<br/>
                      expeRiments, obseRvations,<br/>
                      and things <span className={styles.eyeCutout} title="Oculus Vision">
                        <img src="/eye_closed.png" alt="Eye Closed" className={styles.eyeClosed} />
                        <img src="/eye_open.png" alt="Eye Open" className={styles.eyeOpen} />
                      </span> WoRth remembeRing.
                    </motion.h1>
                  </div>
                </div>
              </header>
            </div>
          </div>
        </WavesBackground>

        <div ref={resultsRef} className={styles.container} style={{ paddingTop: '2.5rem', paddingBottom: '0', minHeight: 'auto' }}>
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
              {searchQuery ? (
                isSearching 
                  ? `SEMANTIC SEARCHING FOR: "${searchQuery}"...`
                  : `SEARCH RESULTS FOR: "${searchQuery}" — ${filteredArticles.length} ${filteredArticles.length === 1 ? 'RESULT' : 'RESULTS'}`
              ) : activeFilter === 'ALL' 
                ? `SHOWING ALL ${filteredArticles.length} ARTICLES` 
                : `FILTER: [ ${activeFilter} ] — ${filteredArticles.length} ${filteredArticles.length === 1 ? 'ARTICLE' : 'ARTICLES'}`}
            </span>
            {(activeFilter !== 'ALL' || searchQuery) && (
              <button 
                className={`${styles.clearFilterBtn} text-mono`}
                onClick={() => router.push('/articles')}
              >
                {searchQuery ? 'CLEAR SEARCH \u00d7' : 'CLEAR FILTER \u00d7'}
              </button>
            )}
          </div>

          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.container} style={{ paddingTop: '1.5rem', paddingBottom: '5rem' }}>
          {/* 03 - Timeline or Direct Search Results */}
          {filteredArticles.length > 0 ? (
            searchQuery ? (
              <motion.div 
                className={styles.articlesList}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: '100%', borderTop: '1px solid var(--color-border)' }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredArticles.map((article) => (
                    <ArticleRow key={article.id} article={article} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
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
            )
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
                {searchQuery 
                  ? `No articles matched your search query "${searchQuery}".`
                  : `There are currently no published articles under the topic "${activeFilter}".`}
              </p>
              <button 
                className={`${styles.resetFilterBtn} text-mono`}
                onClick={() => router.push('/articles')}
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

const Blogs = ({ articles = [] }) => {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: 'var(--color-bg)' }} />}>
      <BlogsContent articles={articles} />
    </Suspense>
  );
};

export default Blogs;

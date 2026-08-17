'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  Share2, 
  Bookmark, 
  Check, 
  Copy, 
  Volume2
} from 'lucide-react';
import styles from './Article.module.css';
import Footer from '../components/Footer';

// Article Metadata Skeleton
const articleSkeleton = {
  code: '01',
  category: 'TECHNOLOGY',
  tags: ['AI Agents', 'LLMs', 'System Architecture', 'Prompt Engineering'],
  toc: [
    { id: 'section-1', label: '01. Section Heading' },
    { id: 'section-2', label: '02. Section Heading' },
    { id: 'section-3', label: '03. Section Heading' },
    { id: 'section-4', label: '04. Section Heading' }
  ]
};

const Article = ({ frontmatter = {}, children }) => {
  const { id } = useParams();

  // Top Reading Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // State & Interactivity
  const [activeSection, setActiveSection] = useState(articleSkeleton.toc[0]?.id || '');
  const [isCopied, setIsCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [readingPercent, setReadingPercent] = useState(0);

  // Update reading percentage
  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setReadingPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleScrollToSection = (e, sectionId) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el && window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -90, duration: 1.4 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Top Fixed Reading Progress Bar */}
      <div className={styles.progressBarContainer}>
        <motion.div className={styles.progressBar} style={{ scaleX }} />
      </div>

      <main>
        {/* Minimal Skeleton Header Bar */}
        <div className={styles.container}>
          <div className={styles.skeletonHeaderNav}>
            <Link href="/articles" className={styles.backLink}>
              <ArrowLeft size={16} />
              <span>ARCHIVE / ALL ARTICLES</span>
            </Link>
            <span className={styles.categoryBadge}>
              {frontmatter.category || '01 // TECHNOLOGY'}
            </span>
          </div>
        </div>

        {/* Main Three-Column Editorial Grid Skeleton */}
        <div className={styles.container}>
          <div className={styles.articleBodyGrid}>
            
            {/* Left Column: Sticky Telemetry & TOC */}
            <aside className={styles.leftColumn}>
              <div className={styles.stickySidebar}>
                
                {/* Table of Contents */}
                <div>
                  <div className={styles.sidebarSectionTitle}>TABLE OF CONTENTS</div>
                  <nav className={styles.tocList}>
                    {articleSkeleton.toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={(e) => handleScrollToSection(e, item.id)}
                        className={`${styles.tocItem} ${activeSection === item.id ? styles.tocItemActive : ''}`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Quick Actions Bar */}
                <div>
                  <div className={styles.sidebarSectionTitle}>ACTIONS</div>
                  <div className={styles.actionsBar}>
                    <button 
                      className={styles.actionBtn}
                      onClick={handleCopyLink}
                      title="Copy Article Link"
                    >
                      {isCopied ? <Check size={18} color="var(--color-highlight)" /> : <Copy size={18} />}
                      <AnimatePresence>
                        {isCopied && (
                          <motion.span 
                            className={styles.toast}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            COPIED!
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </button>

                    <button 
                      className={styles.actionBtn}
                      onClick={handleCopyLink}
                      title="Share Article"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Live Reading Telemetry */}
                <div className={styles.telemetryBox}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>READ PROGRESS</span>
                    <span style={{ fontWeight: 700, color: 'var(--color-highlight)' }}>{readingPercent}%</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>EST. REMAINING</span>
                    <span>{Math.max(1, Math.round(8 * (1 - readingPercent / 100)))} MIN</span>
                  </div>
                </div>

              </div>
            </aside>

            {/* Center Column: Clean Blank Canvas Slot for CMS */}
            <article className={styles.centerCanvas}>
              <div className={styles.cmsCanvasSlot} id="cms-canvas-root">
                {children}
              </div>
            </article>

            {/* Right Column: Contextual Margins */}
            <aside className={styles.rightColumn}>
              <div className={styles.stickyMarginNotes}>
                
                {/* Tag Pills */}
                <div>
                  <div className={styles.sidebarSectionTitle}>TOPIC INDEX</div>
                  <div className={styles.tagsWrapper}>
                    {(frontmatter.topics || articleSkeleton.tags).map((tag, idx) => (
                      <span key={idx} className={styles.tagPill}>#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Margin Notes */}
                <div className={styles.marginNote}>
                  <strong>EDITORIAL NOTE:</strong><br />
                  This piece is part of the ongoing Journal archive on systems engineering and architectural discipline.
                </div>

                <div className={styles.marginNote}>
                  <strong>CITATIONS & REFS:</strong><br />
                  1. Dual-loop orchestration patterns<br />
                  2. Swiss Grid typography standards<br />
                  3. Autonomous agent sandboxing
                </div>

              </div>
            </aside>

          </div>
        </div>
      </main>

      {/* Global Shared Footer */}
      <Footer />
    </div>
  );
};

export default Article;

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, X, Sun, Moon, Sparkles } from 'lucide-react';
import styles from './Navbar.module.css';
import { useTheme } from '../context/ThemeContext';
import SGEmblem from './SGEmblem';

const GithubIcon = ({ size = 14, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 14, className }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const WaveText = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span key={index} className={styles.charWrapper}>
          <span className={styles.char} style={{ transitionDelay: `${index * 0.03}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
          <span className={styles.charClone} style={{ transitionDelay: `${index * 0.03}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </>
  );
};

const RollingLink = ({ href, text, onClick }) => (
  <Link href={href} className={styles.navLink} onClick={onClick}>
    <WaveText text={text} />
  </Link>
);

const CelestialToggleIcon = ({ theme }) => {
  return (
    <AnimatePresence mode="wait">
      {theme === 'light' && (
        <motion.svg
          key="sun"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: -120, scale: 0.3, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 120, scale: 0.3, opacity: 0 }}
          transition={{ type: "spring", stiffness: 450, damping: 24 }}
          className={styles.themeIconSvg}
        >
          {/* Detailed Modern Sun */}
          <circle cx="12" cy="12" r="4.5" fill="none" />
          <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
        </motion.svg>
      )}

      {theme === 'red' && (
        <motion.svg
          key="eclipse"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: -120, scale: 0.3, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 120, scale: 0.3, opacity: 0 }}
          transition={{ type: "spring", stiffness: 450, damping: 24 }}
          className={styles.themeIconSvg}
        >
          {/* Solar Eclipse Ring Aura */}
          <circle cx="12" cy="12" r="8" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="5" fill="currentColor" />
          <path d="M12 1.5v1.5M12 21v1.5M1.5 12h1.5M21 12h1.5" />
        </motion.svg>
      )}

      {theme === 'dark' && (
        <motion.svg
          key="moon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: -120, scale: 0.3, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 120, scale: 0.3, opacity: 0 }}
          transition={{ type: "spring", stiffness: 450, damping: 24 }}
          className={styles.themeIconSvg}
        >
          {/* Crisp Detailed Crescent Moon with Orbit Spark */}
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          <circle cx="18" cy="6" r="1" fill="currentColor" stroke="none" />
        </motion.svg>
      )}
    </AnimatePresence>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  // Slow 3D Parallax Scroll: Navbar moves slower than page content
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 1000], [0, 350]);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleCycleTheme = () => {
    if (theme === 'light') toggleTheme('red');
    else if (theme === 'red') toggleTheme('dark');
    else toggleTheme('light');
  };

  const currentThemeLabel = theme === 'light' ? 'Sun (Light)' : theme === 'red' ? 'Solar Eclipse (Red)' : 'Crescent Moon (Dark)';
  const nextThemeLabel = theme === 'light' ? 'Solar Eclipse' : theme === 'red' ? 'Crescent Moon' : 'Sun';

  const handleToggleSearch = () => {
    setIsSearchOpen(prev => !prev);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    const cleanQ = searchQuery.trim();
    if (cleanQ) {
      router.push(`/articles?q=${encodeURIComponent(cleanQ)}`);
      // Re-trigger smooth scroll even if query string didn't change
      window.dispatchEvent(new CustomEvent('scroll-to-search-results'));
    } else {
      router.push('/articles');
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  const handleNavClick = (e, targetHash) => {
    if (pathname === '/') {
      e.preventDefault();
      // Keep URL clean so page reloads always open at the Hero top
      window.history.replaceState(null, '', '/');
      if (targetHash === '#top' || targetHash === '#hero') {
        window.__lenis?.scrollTo(0, { duration: 1.5 });
      } else {
        const el = document.querySelector(targetHash);
        if (el) {
          window.__lenis?.scrollTo(el, { offset: -80, duration: 1.5 });
        }
      }
    } else {
      if (targetHash === '#top' || targetHash === '#hero') {
        router.push('/');
      } else {
        router.push(`/${targetHash}`);
      }
    }
  };

  const handleLogoClick = (e) => {
    handleNavClick(e, '#top');
    window.dispatchEvent(new CustomEvent('replay-entrance-animation'));
  };

  return (
    <motion.header className={styles.headerWrapper} style={{ y: navY }}>
      <nav className={styles.navbar}>
        {/* Cell 1: Monogram / Logo */}
        <div className={styles.cellLogo}>
          <Link 
            href="/" 
            onClick={handleLogoClick}
            className={styles.logoLink}
            title="Replay Entrance Animation & Go Home"
          >
            <SGEmblem size={38} variant="hoverInvert" />
          </Link>
        </div>

        {/* Cell 2: Status / Micro-Text */}
        <div className={styles.cellStatus}>
          <div className={styles.statusLine}>MAKING THINGS PRETTY.</div>
          <div className={styles.statusLine}>HOLD ON</div>
          <div className={styles.statusLine}>FETCHING SOME INTERESTING STUFF</div>
          <div className={styles.statusLine}>RUNNING SOME CLEVER ALGORITHMS</div>
        </div>

        {/* Cell 3: Main Navigation */}
        <div className={styles.cellNav}>
          <RollingLink href="/" text="HOME" onClick={(e) => handleNavClick(e, '#top')} />
          <RollingLink href="/articles" text="ARTICLES" />
          <RollingLink href="/#topics" text="TOPICS" onClick={(e) => handleNavClick(e, '#topics')} />
          <RollingLink href="/#about" text="ABOUT" onClick={(e) => handleNavClick(e, '#about')} />
        </div>

        {/* Cell 4: Stacked Icons (GitHub & LinkedIn) */}
        <div className={styles.cellIconStack}>
          <a href="https://github.com/soelnvc" target="_blank" rel="noopener noreferrer" className={styles.iconBox} title="GitHub Profile">
            <GithubIcon size={14} className={styles.icon} />
          </a>
          <a href="https://www.linkedin.com/in/siddheshgoel/" target="_blank" rel="noopener noreferrer" className={styles.iconBox} title="LinkedIn Profile">
            <LinkedinIcon size={14} className={styles.icon} />
          </a>
        </div>

        {/* Cell 5: Celestial Theme Toggle */}
        <div className={styles.cellTheme}>
          <button 
            type="button"
            className={styles.themeSingleBtn} 
            onClick={handleCycleTheme}
            aria-label={`Current: ${currentThemeLabel}. Click for ${nextThemeLabel}.`}
            title={`${currentThemeLabel} → Click for ${nextThemeLabel}`}
          >
            <CelestialToggleIcon theme={theme} />
          </button>
        </div>

        {/* Cell 6: Editorial Serif Block with Search Drawer */}
        <div className={styles.cellRightSection}>
          <div className={styles.cellEditorial}>
            <div className={styles.editorialTop}>
              <span>Writing &amp; building systems globally.</span>
            </div>
            <Link href="/articles" className={styles.editorialBottom}>
              <span>Available for collaborations &rarr; <strong className={styles.editorialAction}>Read blog</strong></span>
            </Link>
          </div>

          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                className={styles.searchDrawer}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "100%", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              >
                <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                  <button 
                    type="submit" 
                    className={styles.drawerSearchSubmitBtn}
                    title="Search"
                    aria-label="Submit search"
                  >
                    <Search size={16} className={styles.drawerSearchIcon} />
                  </button>
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="TYPE TO SEARCH ARTICLES..."
                    className={styles.searchInput}
                  />
                  <div className={styles.drawerActions}>
                    {searchQuery && (
                      <button 
                        type="button" 
                        onClick={() => setSearchQuery('')}
                        className={styles.clearBtn}
                        title="Clear"
                      >
                        CLEAR
                      </button>
                    )}
                    <span 
                      className={styles.escBadge} 
                      onClick={() => setIsSearchOpen(false)}
                      title="Press ESC to close"
                    >
                      ESC
                    </span>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cell 7: Search Button */}
        <div className={styles.cellSearch}>
          <button 
            type="button"
            onClick={handleToggleSearch}
            className={`${styles.searchBtn} ${isSearchOpen ? styles.searchBtnActive : ''}`} 
            title={isSearchOpen ? "Close Search" : "Open Search Drawer"}
            aria-label={isSearchOpen ? "Close Search" : "Open Search"}
          >
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={18} className={styles.searchIcon} />
                </motion.div>
              ) : (
                <motion.div
                  key="search"
                  initial={{ rotate: 90, scale: 0.5 }}
                  animate={{ rotate: 0, scale: 1 }}
                  exit={{ rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Search size={18} className={styles.searchIcon} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;

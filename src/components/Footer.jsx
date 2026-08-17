'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp } from 'lucide-react';
import styles from './Footer.module.css';
import SGEmblem from './SGEmblem';

const WaveText = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span key={index} className={styles.charWrapper}>
          <span className={styles.char} style={{ transitionDelay: `${index * 0.025}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
          <span className={styles.charClone} style={{ transitionDelay: `${index * 0.025}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </>
  );
};

const RollingFooterLink = ({ href, text, onClick }) => (
  <Link href={href} className={styles.rollingLink} onClick={onClick}>
    <WaveText text={text} />
  </Link>
);

const RollingExternalLink = ({ href, text }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={styles.rollingLink}>
    <WaveText text={text} />
    <ArrowUpRight size={12} className={styles.externalArrow} />
  </a>
);

const Footer = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }) + ' UTC'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.6 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footerWrapper}>
      {/* Top Segmented Grid */}
      <div className={styles.footerGrid}>
        {/* Cell 1: Brand & Identity */}
        <div className={styles.cellBrand}>
          <Link href="/" onClick={scrollToTop} className={styles.logoLink} title="Siddhesh Goel">
            <SGEmblem size={52} variant="theme" />
          </Link>
          <div className={styles.brandTagline}>
            <span className={styles.brandTitle}>CURATED ARCHIVE &amp; SYSTEM ENGINEERING</span>
            <span className={styles.brandSubtitle}>Writing at the intersection of systems, algorithms, and design aesthetics.</span>
          </div>
        </div>

        {/* Cell 2: Navigation Directory */}
        <div className={styles.cellColumn}>
          <div className={styles.columnHeader}>[01] DIRECTORY</div>
          <div className={styles.linkStack}>
            <RollingFooterLink href="/" text="HOME" onClick={scrollToTop} />
            <RollingFooterLink href="/articles" text="ARTICLES" />
            <RollingFooterLink href="/#topics" text="TOPICS" />
            <RollingFooterLink href="/#about" text="ABOUT" />
          </div>
        </div>

        {/* Cell 3: Elsewhere / Socials */}
        <div className={styles.cellColumn}>
          <div className={styles.columnHeader}>[02] ELSEWHERE</div>
          <div className={styles.linkStack}>
            <RollingExternalLink href="https://github.com" text="GITHUB" />
            <RollingExternalLink href="https://linkedin.com" text="LINKEDIN" />
            <RollingExternalLink href="https://x.com" text="X / TWITTER" />
            <RollingExternalLink href="https://instagram.com" text="INSTAGRAM" />
          </div>
        </div>

        {/* Cell 4: System Telemetry */}
        <div className={styles.cellTelemetry}>
          <div className={styles.columnHeader}>[03] TELEMETRY</div>
          <div className={styles.telemetryStack}>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>LOCAL TIME</span>
              <span className={styles.telemetryValue}>{timeString || '12:00:00 UTC'}</span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>COORDINATES</span>
              <span className={styles.telemetryValue}>28.6139° N, 77.2090° E</span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>SYSTEM</span>
              <span className={styles.telemetryStatus}>
                <span className={styles.statusDot} /> ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>
        </div>

        {/* Cell 5: Back to Top Trigger */}
        <div className={styles.cellBackToTop}>
          <button 
            type="button"
            onClick={scrollToTop} 
            className={styles.backToTopBtn}
            title="Scroll to Top"
            aria-label="Scroll to top of page"
          >
            <ArrowUp size={22} className={styles.arrowIcon} />
            <span className={styles.backToTopText}>BACK TO TOP</span>
          </button>
        </div>
      </div>

      {/* Bottom Segmented Meta Bar */}
      <div className={styles.bottomMetaBar}>
        <div className={styles.metaCell}>
          &copy; {new Date().getFullYear()} SIDDHESH GOEL. ALL RIGHTS RESERVED.
        </div>
        <div className={styles.metaCell}>
          BUILT WITH NEXT.JS &bull; FRAMER MOTION &bull; SWISS BRUTALISM
        </div>
        <div className={styles.metaCell}>
          RELEASE V2.5.0
        </div>
      </div>
    </footer>
  );
};

export default Footer;

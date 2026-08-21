'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowUp, Heart } from 'lucide-react';
import styles from './Footer.module.css';
import SGEmblem from './SGEmblem';
import pkg from '../../package.json';

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
            <p className={styles.brandQuoteLead}>
              &ldquo;You are made of stardust—the remnants of stars that died billions of years ago.
            </p>
            <p className={styles.brandQuoteBody}>
              You are not ordinary, so <strong>do not dream ordinary dreams.</strong> Work your ass off like it’s your last day—<strong>you get one shot. Be crazy. Be stupid. Be curious. Leave something behind for humanity.&rdquo;</strong>
            </p>
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
            <RollingExternalLink href="https://github.com/soelnvc" text="GITHUB" />
            <RollingExternalLink href="https://www.linkedin.com/in/siddheshgoel/" text="LINKEDIN" />
            <RollingExternalLink href="https://www.instagram.com/su.sid.al?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" text="INSTAGRAM" />
            <RollingExternalLink href="mailto:soelnvc@gmail.com" text="EMAIL" />
          </div>
        </div>

        {/* Cell 4: System Telemetry */}
        <div className={styles.cellTelemetry}>
          <div className={styles.columnHeader}>[03] TELEMETRY</div>
          <div className={styles.telemetryStack}>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>CURRENTLY</span>
              <span className={styles.telemetryValue}>BUILDING THINGS</span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>LAST UPDATED</span>
              <span className={styles.telemetryValue}>20.08.2026</span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>LOCATION</span>
              <span className={styles.telemetryValue}>BENGALURU, INDIA</span>
            </div>
            <div className={styles.telemetryItem}>
              <span className={styles.telemetryLabel}>STATUS</span>
              <span className={styles.telemetryValue}>STILL FIGURING IT OUT</span>
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
          <span>BUILT WITH LOVE FOR EVERYONE</span>
          <Heart size={13} className={styles.heartIcon} />
        </div>
        <div className={styles.metaCell}>
          RELEASE V{pkg.version}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

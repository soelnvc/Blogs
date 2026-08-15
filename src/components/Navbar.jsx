import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import styles from './Navbar.module.css';

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

const SearchWaveText = ({ text }) => {
  return (
    <>
      {text.split('').map((char, index) => (
        <span key={index} className={styles.searchCharWrapper}>
          <span className={styles.searchChar} style={{ transitionDelay: `${index * 0.03}s` }}>
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </>
  );
};

const RollingLink = ({ to, text }) => (
  <Link to={to} className={styles.navLink}>
    <WaveText text={text} />
  </Link>
);

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--color-text)' }}>
          S<span style={{ color: 'var(--color-highlight)' }}>·</span>G
        </Link>
      </div>

      <div className={styles.links}>
        <RollingLink to="/" text="Home" />
        <RollingLink to="/articles" text="Articles" />
        <RollingLink to="/topics" text="Topics" />
        <RollingLink to="/about" text="About" />
      </div>

      <div className={styles.search}>
        <div className={styles.searchTextWrapper}>
          <SearchWaveText text="Search" />
        </div>
        <Search size={16} className={styles.searchIcon} />
      </div>
    </nav>
  );
};

export default Navbar;

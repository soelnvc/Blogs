import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import styles from './Navbar.module.css';
import { useTheme } from '../context/ThemeContext';

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

const RollingLink = ({ to, text, onClick }) => (
  <Link to={to} className={styles.navLink} onClick={onClick}>
    <WaveText text={text} />
  </Link>
);

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleNavClick = (e, targetHash) => {
    if (location.pathname === '/') {
      e.preventDefault();
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
        navigate('/');
      } else {
        navigate(`/${targetHash}`);
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link 
          to="/" 
          onClick={(e) => handleNavClick(e, '#top')}
          style={{ textDecoration: 'none', color: 'var(--color-text)' }}
        >
          S<span style={{ color: 'var(--color-highlight)' }}>·</span>G
        </Link>
      </div>

      <div className={styles.links}>
        <RollingLink to="/" text="Home" onClick={(e) => handleNavClick(e, '#top')} />
        <RollingLink to="/articles" text="Articles" />
        <RollingLink to="/#topics" text="Topics" onClick={(e) => handleNavClick(e, '#topics')} />
        <RollingLink to="/#about" text="About" onClick={(e) => handleNavClick(e, '#about')} />
      </div>

      <div className={styles.rightGroup}>
        <div className={styles.themeToggle}>
          <button 
            className={`${styles.themeBtn} ${theme === 'light' ? styles.activeLight : ''}`} 
            onClick={() => toggleTheme('light')}
            aria-label="Light Mode"
          >
            <div className={styles.themeDotLight}></div>
          </button>
          <button 
            className={`${styles.themeBtn} ${theme === 'red' ? styles.activeRed : ''}`} 
            onClick={() => toggleTheme('red')}
            aria-label="Red Mode"
          >
            <div className={styles.themeDotRed}></div>
          </button>
          <button 
            className={`${styles.themeBtn} ${theme === 'dark' ? styles.activeDark : ''}`} 
            onClick={() => toggleTheme('dark')}
            aria-label="Dark Mode"
          >
            <div className={styles.themeDotDark}></div>
          </button>
        </div>

        <Link to="/articles" className={styles.search}>
          <div className={styles.searchTextWrapper}>
            <SearchWaveText text="Search" />
          </div>
          <Search size={16} className={styles.searchIcon} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

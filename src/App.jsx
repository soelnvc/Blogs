import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import ParallaxBackground from './components/ParallaxBackground';
import Navbar from './components/Navbar';

// Create a separate component for scroll to encapsulate useLocation
const ScrollWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.__lenis = lenis;

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Default to top of page on reload/navigation
    lenis.scrollTo(0, { immediate: true });

    if (location.hash && location.hash !== '#top') {
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          lenis.scrollTo(el, { offset: -80, duration: 1.5 });
        }
      }, 150);
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      window.__lenis = null;
    };
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      {/* Fixed Left & Right Black Sidebars */}
      <div className="site-frame-left" aria-hidden="true" />
      <div className="site-frame-right" aria-hidden="true" />

      <div className="site-canvas">
        <div className="site-sheet">
          <ScrollWrapper>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/articles" element={<Blogs />} />
              <Route path="/topics" element={<Blogs />} />
              <Route path="/about" element={<Blogs />} />
              <Route path="/search" element={<Blogs />} />
            </Routes>
          </ScrollWrapper>
        </div>
      </div>
    </Router>
  );
}

export default App;

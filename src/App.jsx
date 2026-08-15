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
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    let rafId;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Scroll to top on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [location.pathname]);

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <ScrollWrapper>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Blogs />} />
          <Route path="/topics" element={<Blogs />} />
          <Route path="/about" element={<Blogs />} />
        </Routes>
      </ScrollWrapper>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import { FaArrowUp } from 'react-icons/fa';
import Admin from './components/Admin';
import Login from './components/Login';  // Import your Login component
import './App.css';

function App() {
  const [showButton, setShowButton] = useState(false);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);  // Add authentication state

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    const updateNavbarHeight = () => {
      const navbar = document.querySelector('.navbar');
      if (navbar) {
        setNavbarHeight(navbar.offsetHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateNavbarHeight);

    // Initial update
    updateNavbarHeight();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Custom function to protect routes
  const requireAuth = (Component) => {
    return isAuthenticated ? Component : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content" style={{ paddingTop: `${navbarHeight}px` }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />  {/* Add login route */}
            <Route path="/admin" element={requireAuth(<Admin />)} />  {/* Protect admin route */}
          </Routes>
        </main>
        <Footer />
        {showButton && (
          <button className="back-to-top" onClick={scrollToTop} aria-label="Scroll to top">
            <FaArrowUp />
          </button>
        )}
      </div>
      <ScrollToTop />
    </Router>
  );
}

export default App;
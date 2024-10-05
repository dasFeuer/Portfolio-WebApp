import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          Barun
        </Link>
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          <Link
            className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`}
            to="/"
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            className={`navbar-item ${location.pathname === '/about' ? 'active' : ''}`}
            to="/about"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            className={`navbar-item ${location.pathname === '/projects' ? 'active' : ''}`}
            to="/projects"
            onClick={closeMenu}
          >
            Projects
          </Link>
          <Link
            className={`navbar-item ${location.pathname === '/contact' ? 'active' : ''}`}
            to="/contact"
            onClick={closeMenu}
          >
            Contact
          </Link>
        </div>
        <button className="navbar-burger" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
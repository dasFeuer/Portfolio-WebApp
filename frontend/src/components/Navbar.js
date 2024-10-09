import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaCode, FaEnvelope } from 'react-icons/fa';
import '../css/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false); // Keep scrolled as we might use it for a sticky navbar
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50); // Simple scroll check
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

  const navItems = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/about', name: 'About', icon: <FaUser /> },
    { path: '/projects', name: 'Projects', icon: <FaCode /> },
    { path: '/contact', name: 'Contact', icon: <FaEnvelope /> },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <Link className="navbar-brand" to="/" onClick={closeMenu}>
          <div className="logo">
            <span className="logo-bracket">{`{`}</span>
            <span className="logo-text">BPS</span>
            <span className="logo-bracket">{`}`}</span>
          </div>
        </Link>
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
              to={item.path}
              onClick={closeMenu}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="navbar-actions">
          <button className="theme-toggle">
            {/* Theme toggle logic here */}
          </button>
          <button className="navbar-burger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
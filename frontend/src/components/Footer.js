import React, { useContext } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { ThemeContext } from './ThemeContext';
import '../css/Footer.css';

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className={`footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Barun Panthi Sharma</h3>
            <p>Java Developer & Problem Solver</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/projects">Projects</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="footer-social">
              <a href="https://github.com/dasFeuer" target="_blank" rel="noopener noreferrer">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/barun-panthi-sharma-0080b7286/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin />
              </a>
              <a href="mailto:barunpanthisharma11@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Barun Panthi Sharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
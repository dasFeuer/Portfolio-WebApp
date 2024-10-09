import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../css/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/projects", text: "Projects" },
    { href: "/contact", text: "Contact" }
  ];

  const socialLinks = [
    { href: "https://github.com/dasFeuer", icon: FaGithub, label: "GitHub" },
    { href: "https://www.linkedin.com/in/barun-panthi-sharma-0080b7286/", icon: FaLinkedin, label: "LinkedIn" },
    { href: "mailto:barunpanthisharma11@gmail.com", icon: FaEnvelope, label: "Email" }
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Barun Panthi Sharma</h3>
            <p>Java Developer & Problem Solver</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-section">
            <h3>Connect</h3>
            <div className="footer-social">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  <link.icon />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {currentYear} Barun Panthi Sharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
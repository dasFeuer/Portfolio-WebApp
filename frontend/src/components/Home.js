import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../css/Home.css';

function Home() {
  const skills = ['Java', 'Spring Boot', 'MySQL', 'Git'];

  const handleDownloadCV = () => {
    // Replace 'path_to_your_cv.pdf' with the actual path to your CV file
    const link = document.createElement('a');
    link.href = '/path_to_your_cv.pdf';
    link.download = 'Barun_Panthi_Sharma_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-hero">
          <h1 className="home-title">Barun Panthi Sharma</h1>
          <h2 className="home-subtitle">Java Developer & Problem Solver</h2>
          <p className="home-description">
            Passionate about building scalable applications and creating efficient solutions using Spring Boot and MySQL.
          </p>
          <div className="home-cta">
            <Link to="/projects" className="home-button primary">View Projects</Link>
            <button onClick={handleDownloadCV} className="home-button secondary">Download CV</button>
          </div>
        </div>
        <div className="home-skills">
          <h3 className="skills-title">Tech Stack</h3>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
        <div className="home-social">
          <a href="https://github.com/dasFeuer" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/barun-panthi-sharma-0080b7286/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FaLinkedin />
          </a>
          <a href="mailto:barunpanthisharma11@gmail.com" className="social-link">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
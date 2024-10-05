import React from 'react';
import {FaGraduationCap, FaBriefcase, FaCode } from 'react-icons/fa';
import '../css/About.css';

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h2 className="about-title">About Me</h2>
        <div className="about-intro">
          <img src="/BarunProfile.jpeg" alt="Profile" className="about-image" />
          <p className="about-description">
            Hi, My name Barun Panthi Sharma and I am a passionate Java lerner
            with beginner level experience in Spring Boot and MySQL.
            I specialize in building scalable applications and thrive on solving complex problems.
            My goal is to create efficient, maintainable, and user-friendly software solutions.
          </p>
        </div>
        <div className="about-section">
          <h3 className="section-title"><FaGraduationCap /> Education</h3>
          <div className="timeline">
            <div className="timeline-item">
              <h4>Higher secondary school</h4>
              <p>Advance academy, 2019-2021</p>
            </div>
            <div className="timeline-item">
              <h4>Secondary school</h4>
              <p>Janjayoti school, 2008-2019</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h3 className="section-title"><FaBriefcase /> Work Experience</h3>
          <div className="timeline">
            <div className="timeline-item">
              <h4>Java Backend Developer</h4>
              <p>Beginner, 2024 - Present</p>
            </div>
          </div>
          <div className="timeline">
            <div className="timeline-item">
              <h4>Nepal Secretariat of Skills and Training (NSST)</h4>
              <p>Team assistant, 2023 July - Present</p>
            </div>
          </div>
        </div>

        <div className="about-section">
          <h3 className="section-title"><FaCode /> Skills</h3>
          <div className="skills-container">
            {['Java', 'Spring Boot', 'Git'].map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>

        <button className="about-button">Download Resume</button>
      </div>
    </div>
  );
}

export default About;

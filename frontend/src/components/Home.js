import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaCode, FaDatabase, FaDesktop } from 'react-icons/fa';
import '../css/Home.css';

export default function Home() {
  const skills = ['Java', 'Spring Boot', 'MySQL', 'Git', 'RESTful APIs', 'React', 'JavaScript', 'HTML/CSS'];

  const texts = useMemo(() => [
    "Hello, I'm Barun Panthi Sharma",
    "I'm a Java Backend Developer",
    "I build scalable applications",
    "I love solving complex problems"
  ], []);

  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const handleTyping = useCallback(() => {
    const i = loopNum % texts.length;
    const fullText = texts[i];

    setTypedText(isDeleting
      ? fullText.substring(0, typedText.length - 1)
      : fullText.substring(0, typedText.length + 1)
    );

    setTypingSpeed(isDeleting ? 30 : 150);

    if (!isDeleting && typedText === fullText) {
      setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && typedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setTypingSpeed(500);
    }
  }, [typedText, isDeleting, loopNum, texts]);

  useEffect(() => {
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [handleTyping, typingSpeed]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">Barun Panthi Sharma</h1>
        <h2 className="home-subtitle">Java Developer & Problem Solver</h2>
      </header>

      <main className="home-main">
        <section className="home-hero">
          <div className="profile-image">
            <img src="/BarunProfile.jpeg" alt="Barun Panthi Sharma" loading="lazy" />
          </div>
          <div className="typing-container">
            <p className="typing-text" aria-live="polite">{typedText}<span className="cursor"></span></p>
          </div>
        </section>

        <section className="home-about">
          <h3 className="section-title">About Me</h3>
          <div className="section-content">
            <p className="home-description">
              As a passionate Java Backend Developer, I thrive on creating robust, scalable solutions that drive business success. With a strong foundation in Spring Boot and MySQL, I specialize in developing high-performance applications that meet and exceed client expectations.
            </p>
            <p className="home-description">
              My approach combines technical expertise with a keen eye for detail, allowing me to tackle complex problems and deliver efficient, maintainable code. I'm constantly exploring new technologies and best practices to stay at the forefront of backend development.
            </p>
          </div>
        </section>

        <section className="home-expertise">
          <h3 className="section-title">My Expertise</h3>
          <div className="expertise-grid">
            {[
              { icon: FaCode, title: "Backend Development", description: "Proficient in Java and Spring Boot, creating efficient and scalable backend solutions." },
              { icon: FaDatabase, title: "Database Management", description: "Experienced in designing and optimizing MySQL databases for high-performance applications." },
              { icon: FaDesktop, title: "Frontend Development", description: "Skilled in creating responsive and interactive user interfaces using React and modern JavaScript." }
            ].map((item, index) => (
              <div key={index} className="expertise-item">
                <item.icon className="expertise-icon" aria-hidden="true" />
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="home-skills">
          <h3 className="section-title">Tech Stack</h3>
          <div className="skills-list">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>

        <section className="home-cta">
          <h3 className="section-title">Let's Work Together</h3>
          <div className="section-content">
            <p>Ready to bring your ideas to life? Let's collaborate and create something amazing!</p>
            <div className="cta-buttons">
              <a href="/projects" className="home-button primary">View Projects</a>
              <a href="/contact" className="home-button secondary">Contact Me</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
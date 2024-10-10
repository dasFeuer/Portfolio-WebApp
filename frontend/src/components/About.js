import React, { useState, useCallback } from 'react';
import { FaGraduationCap, FaBriefcase, FaCode, FaLanguage, FaDownload, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';
import { GB, DE } from 'country-flag-icons/react/3x2';
import '../css/About.css';

const About = () => {
  const [language, setLanguage] = useState('en');

  const content = {
    en: {
      title: 'About Me',
      name: 'Barun Panthi Sharma',
      intro: "I'm a passionate Java learner with beginner-level experience in Spring Boot and MySQL. I specialize in building scalable applications and thrive on solving complex problems. My goal is to create efficient, maintainable, and user-friendly software solutions.",
      education: 'Education',
      experience: 'Work Experience',
      skills: 'Skills',
      languages: 'Language Skills',
      interests: 'Interests',
      downloadCV: 'Download CV',
      educationItems: [
        { title: 'Higher Secondary School', institution: 'Advance Academy Secondary School and Republica College', period: '07/2019 – 09/2021' },
        { title: 'Secondary School', institution: 'Janjyoti Secondary Boarding School', period: '05/2010 – 04/2019' },
      ],
      experienceItems: [
        { title: 'Team Assistant', company: 'Nepal Secretariat of Skills and Training (NSST)', period: '06/07/2023 - Present' },
        { title: 'Soft Skills Training Participant', company: 'Nepal Secretariat of Skills and Training (NSST)', period: '04/04/2023 - 07/01/2024' },
      ],
      skillItems: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS', 'Python', 'C', 'Git'],
      languageItems: [
        { language: 'Nepali', level: 'Native' },
        { language: 'German', level: 'C1 (Completed course with participation certificate)' },
        { language: 'English', level: 'Proficient in spoken and written communication' },
        { language: 'Hindi', level: 'Very good spoken skills' },
      ],
      interestItems: ['Basketball', 'Table Tennis', 'Mobile Games', 'Computer Games', 'Listening to Music', 'Cycling', 'Hiking'],
    },
    de: {
      // German content (unchanged)
    },
  };

  const currentContent = content[language];

  const handleLanguageChange = useCallback((lang) => {
    setLanguage(lang);
  }, []);

  const renderSection = useCallback((title, icon, content) => (
    <div className="about-section">
      <h3 className="section-title">{icon} {title}</h3>
      {content}
    </div>
  ), []);

  return (
    <div className="about-container">
      <div className="about-content">
        <div className="language-toggle">
          <button onClick={() => handleLanguageChange('en')} className={language === 'en' ? 'active' : ''}>
            <GB title="English" className="flag-icon" />
          </button>
          <button onClick={() => handleLanguageChange('de')} className={language === 'de' ? 'active' : ''}>
            <DE title="Deutsch" className="flag-icon" />
          </button>
        </div>
        <h2 className="about-title">{currentContent.title}</h2>
        <div className="about-intro">
          <img src="/BarunProfile.jpeg" alt="Profile" className="about-image" />
          <div className="intro-text">
            <h3>{currentContent.name}</h3>
            <p className="about-description">{currentContent.intro}</p>

            <div className="contact-info">
              <a href="mailto:barunpanthisharma11@gmail.com" className="contact-item">
                <FaEnvelope /> barunpanthisharma11@gmail.com
              </a>
              <a href="tel:+9779749359878" className="contact-item">
                <FaPhone /> (+977) 9749359878
              </a>
              <a href="https://github.com/dasFeuer" target="_blank" rel="noopener noreferrer" className="contact-item">
                <FaGithub /> GitHub
              </a>
            </div>
          </div>
        </div>

        {renderSection(currentContent.education, <FaGraduationCap />,
          <div className="timeline">
            {currentContent.educationItems.map((item, index) => (
              <div key={index} className="timeline-item">
                <h4>{item.title}</h4>
                <p>{item.institution}</p>
                <p className="timeline-period">{item.period}</p>
              </div>
            ))}
          </div>
        )}

        {renderSection(currentContent.experience, <FaBriefcase />,
          <div className="timeline">
            {currentContent.experienceItems.map((item, index) => (
              <div key={index} className="timeline-item">
                <h4>{item.title}</h4>
                <p>{item.company}</p>
                <p className="timeline-period">{item.period}</p>
              </div>
            ))}
          </div>
        )}

        {renderSection(currentContent.skills, <FaCode />,
          <div className="skills-container">
            {currentContent.skillItems.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        )}

        {renderSection(currentContent.languages, <FaLanguage />,
          <div className="language-skills">
            {currentContent.languageItems.map((item, index) => (
              <div key={index} className="language-item">
                <h4>{item.language}</h4>
                <p>{item.level}</p>
              </div>
            ))}
          </div>
        )}

        {renderSection(currentContent.interests, null,
          <div className="interests-container">
            {currentContent.interestItems.map((interest, index) => (
              <span key={index} className="interest-tag">{interest}</span>
            ))}
          </div>
        )}

        <a href="/Barun_Panthi_Sharma_Der_Lebenslauf.pdf" download className="about-button">
          <FaDownload /> {currentContent.downloadCV}
        </a>
      </div>
    </div>
  );
};

export default About;
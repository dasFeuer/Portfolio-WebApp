import React, { useEffect, useState } from 'react';
import { FaLightbulb, FaCode, FaRocket } from 'react-icons/fa';
import ApiService from '../services/ApiService';
import '../css/Projects.css';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await ApiService.getProjects();
      console.log("Fetched projects:", response.data);
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the projects!", error);
      setError("Failed to load projects. Please try again later.");
      setLoading(false);
    }
  };

  const ProjectCard = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className={`project-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={project.imageUrl || '/placeholder.svg?height=200&width=300'}
          alt={project.name || 'Project'}
          className="project-image"
        />
        <div className="project-content">
          <h3 className="project-name">{project.name || 'Untitled Project'}</h3>
          <p className="project-description">{project.description || 'No description available.'}</p>
          <a href={project.link || '#'} target="_blank" rel="noopener noreferrer" className="project-link">View Project</a>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="loader-container" aria-live="polite">
        <div className="loader" aria-hidden="true"></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container" aria-live="polite">
        <p>{error}</p>
        <button onClick={fetchProjects} className="retry-btn">Retry</button>
      </div>
    );
  }

  // Check if there are any valid projects
  const hasValidProjects = projects.some(project => project.name && project.description);

  const projectIdeas = [
    { Icon: FaLightbulb, title: "Innovative Ideas", description: "Brainstorming cutting-edge concepts" },
    { Icon: FaCode, title: "Coding in Progress", description: "Turning ideas into reality" },
    { Icon: FaRocket, title: "Launch Preparation", description: "Getting ready to showcase my work" }
  ];

  return (
    <div className="projects-container">
      <h2 className="projects-title">My Projects</h2>
      {hasValidProjects ? (
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="no-projects">
          <h3>Exciting Projects Coming Soon!</h3>
          <p>I'm currently working on some amazing projects. Stay tuned for updates!</p>
          <div className="project-ideas">
            {projectIdeas.map((idea, index) => (
              <div key={index} className="idea-card">
                <idea.Icon className="idea-icon" aria-label={idea.title} />
                <h4>{idea.title}</h4>
                <p>{idea.description}</p>
              </div>
            ))}
          </div>
          <a href="/contact" className="start-project-btn">Let's Collaborate</a>
        </div>
      )}
    </div>
  );
}

export default Projects;

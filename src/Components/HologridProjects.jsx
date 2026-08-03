import { useState } from 'react'
import { spaceAudio } from '../utils/SpaceAudio'

const projectsData = [
  {
    id: 1,
    title: 'Fake Job & Intern Detector',
    timeline: 'Jan 2026 - Apr 2026',
    tag: 'ML & NLP SYSTEM',
    description:
      'Developed a Fake Job and Internship Detection System using Machine Learning and NLP techniques to identify fraudulent job postings based on textual patterns and job-related features.',
    details:
      'Implemented data preprocessing, TF-IDF vectorization, and Logistic Regression for prediction, along with an interactive interface to analyze job descriptions and improve safe job searching.',
    tech: ['Python', 'NLP', 'ML', 'TF-IDF', 'Logistic Regression'],
  },
  {
    id: 2,
    title: 'Online Job Application Portal',
    timeline: 'Jul 2025 - Nov 2025',
    tag: 'FULL STACK WEBAPP',
    description:
      'Developed an Online Job Application Portal to simplify the recruitment process for job seekers and recruiters.',
    details:
      'Developed responsive interfaces and CRUD functionalities for both recruiters and job seekers with secure database integration and custom control panels.',
    tech: ['React', 'Node.js', 'Express', 'SQL', 'Authentication'],
  },
  {
    id: 3,
    title: 'Personal Budget Manager',
    timeline: 'Feb 2025 - Jun 2025',
    tag: 'FINTECH UTILITY',
    description:
      'Developed a Personal Budget Manager web application to track income, expenses, and savings efficiently.',
    details:
      'Implemented expense categorization, budget management, and financial analysis using graphical visualizations such as income vs expense charts and monthly spending reports.',
    tech: ['Javascript', 'Chart.js', 'Node.js', 'SQL', 'REST API'],
  },
]

export default function HologridProjects() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length)
    spaceAudio.playClickFeedback()
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length)
    spaceAudio.playClickFeedback()
  }

  const handleSelectCard = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index)
      spaceAudio.playClickFeedback()
    }
  }

  const handleHover = () => {
    spaceAudio.playHoverBlip()
  }

  return (
    <div className="hologrid-carousel-container reveal-on-scroll">
      <div className="hologrid-header">
        <h4>HOLOGRAM DECK PROJECT VIEWPORT</h4>
        <p className="description-text">
          Drag/Select cards or use HUD navigation controls to rotate modules in 3D.
        </p>
      </div>

      <div className="carousel-stage">
        <div className="carousel-inner-3d">
          {projectsData.map((project, idx) => {
            // Calculate 3D transformations for each card relative to activeIndex
            let offset = idx - activeIndex
            // Handle wrapping
            if (offset < -1) offset += projectsData.length
            if (offset > 1) offset -= projectsData.length

            let transformStyle = ''
            let opacity = 1
            let zIndex = 2
            let activeClass = ''

            if (offset === 0) {
              // Centered Active Card
              transformStyle = 'translate3d(0, 0, 80px) rotateY(0deg) scale(1)'
              zIndex = 10
              activeClass = 'active'
            } else if (offset === 1 || (idx === 0 && activeIndex === projectsData.length - 1)) {
              // Right Card
              transformStyle = 'translate3d(105%, 0, -100px) rotateY(-40deg) scale(0.85)'
              zIndex = 5
              activeClass = 'side-card right'
            } else {
              // Left Card
              transformStyle = 'translate3d(-105%, 0, -100px) rotateY(40deg) scale(0.85)'
              zIndex = 5
              activeClass = 'side-card left'
            }

            return (
              <article
                key={project.id}
                className={`project-holo-card glass-panel ${activeClass}`}
                style={{
                  transform: transformStyle,
                  zIndex: zIndex,
                  opacity: opacity,
                }}
                onClick={() => handleSelectCard(idx)}
                onMouseEnter={handleHover}
              >
                <div className="project-holo-header">
                  <span className="project-holo-tag">{project.tag}</span>
                  <span className="project-holo-time">{project.timeline}</span>
                </div>

                <div className="project-holo-content">
                  <h3>{project.title}</h3>
                  <p className="holo-desc">{project.description}</p>
                  <p className="holo-details">{project.details}</p>
                </div>

                <div className="project-holo-tech">
                  {project.tech.map((techItem) => (
                    <span key={techItem} className="tech-badge">
                      {techItem}
                    </span>
                  ))}
                </div>

                <div className="holo-panel-decorations">
                  <div className="decor-corner top-left" />
                  <div className="decor-corner top-right" />
                  <div className="decor-corner bottom-left" />
                  <div className="decor-corner bottom-right" />
                </div>
              </article>
            )
          })}
        </div>
      </div>

      <div className="hologrid-controls">
        <button className="carousel-btn prev glass-panel" onClick={handlePrev} onMouseEnter={handleHover}>
          &lt; PREV CELL
        </button>
        <span className="carousel-indicator">
          {activeIndex + 1} / {projectsData.length}
        </span>
        <button className="carousel-btn next glass-panel" onClick={handleNext} onMouseEnter={handleHover}>
          NEXT CELL &gt;
        </button>
      </div>
    </div>
  )
}

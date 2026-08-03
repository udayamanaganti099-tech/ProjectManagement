import { useEffect, useState } from 'react'

const roles = ['React Developer', 'UI Designer', 'Frontend Engineer']

function Hero({ mousePosition, darkMode }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [introVisible, setIntroVisible] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false })

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }, 2200)

    const timer = window.setTimeout(() => setIntroVisible(true), 250)

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(timer)
    }
  }, [])

  const handleCardMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2

    setTilt({ x, y, active: true })
  }
  
  const handleCardLeave = () => {
    setTilt({ x: 0, y: 0, active: false })
  }

  const tiltStyle = {
    transform: `perspective(1800px) rotateX(${(-mousePosition.y * 4 - tilt.y * 8).toFixed(1)}deg) rotateY(${(mousePosition.x * 4 + tilt.x * 8).toFixed(1)}deg) translate3d(${tilt.active ? (tilt.x * 12).toFixed(1) : '0'}px, ${tilt.active ? (tilt.y * -12).toFixed(1) : '0'}px, ${tilt.active ? '36px' : '0px'})`,
    transition: tilt.active ? 'transform 0.08s ease-out' : 'transform 0.45s ease-out',
    boxShadow: tilt.active
      ? '0 30px 90px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255,255,255,0.22)'
      : '0 24px 70px rgba(0, 0, 0, 0.28)',
  }

  return (
    <main className={`hero ${darkMode ? 'theme-dark' : 'theme-light'} ${introVisible ? 'show' : ''}`}>
      <section
        id="home"
        className="hero-card"
        style={tiltStyle}
        onMouseMove={handleCardMove}
        onMouseLeave={handleCardLeave}
      >
        <div className="hero-copy">
          <p className="eyebrow">Software Engineer & Frontend Developer</p>
          <h1>
            Hi, I&apos;m <span>Uday</span>
          </h1>
          <h2>I build {roles[roleIndex]} experiences.</h2>
          <p className="description">
            I design reliable, scalable user interfaces with clean architecture, strong UX,
            and a focus on performance and product quality.
          </p>
          <div className="hero-actions">
            <a href="mailto:uday@example.com" className="btn btn-primary">
              Contact Me
            </a>
            <a href="#projects" className="btn btn-secondary">
              See Projects
            </a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="stats-card">
            <p>Experience</p>
            <strong>2+ Years</strong>
          </div>
          <div className="stats-card">
            <p>Specialty</p>
            <strong>React & UI</strong>
          </div>
          <div className="stats-card">
            <p>Status</p>
            <strong>Open to work</strong>
          </div>
        </aside>
      </section>

      <section id="about" className="content-section about-section">
        <div className="section-heading">
          <p className="eyebrow">About</p>
          <h3>Building thoughtful software with engineering discipline.</h3>
        </div>
        <div className="about-grid">
          <article>
            <p>
              I enjoy turning product ideas into well-structured interfaces that feel polished,
              responsive, and easy to maintain.
            </p>
          </article>
          <article>
            <ul className="skill-list">
              <li>React and modern JavaScript</li>
              <li>Responsive UI/UX implementation</li>
              <li>State management and component architecture</li>
            </ul>
          </article>
        </div>
      </section>

      <section id="projects" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h3>Selected work that blends design and engineering.</h3>
        </div>
        <div className="project-strip">
          <article>
            <h4>Neon Commerce</h4>
            <p>Animated storefront with cinematic product reveals.</p>
          </article>
          <article>
            <h4>Canvas Studio</h4>
            <p>Editorial landing pages with immersive motion systems.</p>
          </article>
          <article>
            <h4>Nova Dashboard</h4>
            <p>Data-rich interfaces designed for clarity and speed.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Hero

import { spaceAudio } from '../utils/SpaceAudio'

const technicalSkills = [
  { name: 'Java', level: 85, freq: '4.8 GHz', temp: '42°C', status: 'STABLE CORE' },
  { name: 'Javascript', level: 90, freq: '5.2 GHz', temp: '45°C', status: 'OPTIMIZED' },
  { name: 'Node.js', level: 80, freq: '3.6 GHz', temp: '48°C', status: 'ACTIVE' },
  { name: 'SQL', level: 80, freq: '2.8 GHz', temp: '39°C', status: 'STABLE CORE' },
  { name: 'Html & Css', level: 92, freq: '1.2 GHz', temp: '35°C', status: 'SYNCHRONIZED' },
]

export default function SkillsSystem() {
  const handleHover = () => {
    spaceAudio.playHoverBlip()
  }

  return (
    <div className="skills-grid-container reveal-on-scroll">
      <div className="reactor-grid-header">
        <h4>REACTOR SYSTEMS MONITOR</h4>
        <span className="grid-sub">POWER MODULATION RATE: 450 GW</span>
      </div>

      <div className="reactor-grid">
        {technicalSkills.map((skill) => (
          <div
            key={skill.name}
            className="reactor-cell glass-panel"
            onMouseEnter={handleHover}
          >
            {/* Cell top details */}
            <div className="cell-top">
              <span className="core-tag">{skill.status}</span>
              <span className="core-temp">{skill.temp}</span>
            </div>

            {/* Glowing ring/circle representation */}
            <div className="core-graphic-wrapper">
              <div 
                className="core-radial-glow" 
                style={{ 
                  boxShadow: `0 0 20px rgba(${
                    skill.level > 88 ? '6, 182, 212' : '139, 92, 246'
                  }, 0.35)` 
                }}
              />
              <div className="core-circle-info">
                <span className="core-percent">{skill.level}%</span>
                <span className="core-label">CAPACITY</span>
              </div>
            </div>

            {/* Reactor telemetry */}
            <div className="cell-body">
              <h5>{skill.name}</h5>
              <div className="core-metrics">
                <div>
                  <span className="met-lbl">FREQ:</span>
                  <span className="met-val">{skill.freq}</span>
                </div>
                <div>
                  <span className="met-lbl">GRID:</span>
                  <span className="met-val">SEC-9</span>
                </div>
              </div>

              {/* Progress visual */}
              <div className="core-loader-track">
                <div 
                  className="core-loader-fill" 
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

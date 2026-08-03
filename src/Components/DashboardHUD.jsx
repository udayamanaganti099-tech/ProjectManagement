import { useState, useEffect } from 'react'
import { spaceAudio } from '../utils/SpaceAudio'

export default function DashboardHUD({ activeSection, mousePosition, soundMuted, onToggleSound }) {
  const [coordinates, setCoordinates] = useState({ lat: '17.3850° N', lng: '78.4867° E' }) // Hyderabad coordinates
  const [time, setTime] = useState('')

  useEffect(() => {
    // Dynamic coordinate micro-jitter to simulate live telemetry
    const interval = setInterval(() => {
      const jitterLat = (Math.random() - 0.5) * 0.0005
      const jitterLng = (Math.random() - 0.5) * 0.0005
      setCoordinates({
        lat: `${(17.3850 + jitterLat).toFixed(4)}° N`,
        lng: `${(78.4867 + jitterLng).toFixed(4)}° E`,
      })
    }, 1200)

    // Time ticker
    const timeInterval = setInterval(() => {
      const date = new Date()
      setTime(date.toUTCString().replace('GMT', 'UTC'))
    }, 1000)
    return () => {
      clearInterval(interval)
      clearInterval(timeInterval)
    }
  }, [])
  const handleSoundClick = () => {
    onToggleSound()
    spaceAudio.playClickFeedback()
  }

  const handleNavHover = () => {
    spaceAudio.playHoverBlip()
  }
  const deckName = {
    home: 'BRIDGE (HOME)',
    about: 'LOGBOOK (ABOUT)',
    projects: 'HOLOGRAM GRID (PROJECTS)',
    contact: 'COMM-LINK (CONTACT)',
  }[activeSection] || 'NAV COMPUTER'

  return (
    <div className="hud-overlay">
      {/* Outer borders and indicators */}
      <header className="hud-header glass-panel">
        <div className="hud-brand">
          <div className="telemetry-node active" />
          <span className="hud-title">DEEP-SPACE PORTFOLIO v2.6</span>
        </div>

        <div className="hud-coordinates">
          <span className="telemetry-label">SYSTEM LOCALIZATION:</span>
          <span className="telemetry-value">HYDERABAD, IN</span>
        </div>

        <div className="hud-coordinates">
          <span className="telemetry-label">COORDS:</span>
          <span className="telemetry-value">{coordinates.lat} | {coordinates.lng}</span>
        </div>

        <div className="hud-clock">
          <span className="telemetry-value">{time || 'STARDATE CLOCK'}</span>
        </div>
      </header>

      {/* Side HUD widgets */}
      <aside className="hud-sidebar-left">
        <div className="hud-widget glass-panel" onMouseEnter={handleNavHover}>
          <div className="widget-header">SYSTEM METRICS</div>
          <div className="metric-row">
            <span className="metric-label">WARP FLUX:</span>
            <div className="metric-bar-container">
              <div className="metric-bar cyan" style={{ width: '85%' }} />
            </div>
            <span className="metric-val">85%</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">SHIELD CAP:</span>
            <div className="metric-bar-container">
              <div className="metric-bar violet" style={{ width: '94%' }} />
            </div>
            <span className="metric-val">94%</span>
          </div>
          <div className="metric-row">
            <span className="metric-label">CPU CORE:</span>
            <div className="metric-bar-container">
              <div className="metric-bar pink" style={{ width: '42%' }} />
            </div>
            <span className="metric-val">42%</span>
          </div>
        </div>

        <div className="hud-widget glass-panel info-logs">
          <div className="widget-header">CREW LOG</div>
          <p className="log-text">&gt; Pilot: Uday Kiran Reddy</p>
          <p className="log-text">&gt; Role: CSE Engineer</p>
          <p className="log-text">&gt; Objective: Build reliable web products</p>
          <p className="log-text glow-pulse">&gt; Status: Ready to Launch</p>
        </div>
      </aside>

      <aside className="hud-sidebar-right">
        {/* Spatial Radar Widget */}
        <div className="hud-widget glass-panel radar-widget">
          <div className="widget-header">RADAR TELEMETRY</div>
          <div className="radar-circle">
            <div className="radar-sweep" />
            <div 
              className="radar-target" 
              style={{
                left: `calc(50% + ${mousePosition.x * 35}px)`,
                top: `calc(50% + ${mousePosition.y * 35}px)`,
              }}
            />
            <div className="radar-center" />
          </div>
          <div className="radar-metrics">
            <span>TX: {(mousePosition.x * 100).toFixed(0)}</span>
            <span>TY: {(mousePosition.y * -100).toFixed(0)}</span>
          </div>
        </div>

        {/* Audio Console Control */}
        <div className="hud-widget glass-panel sound-widget">
          <button 
            className={`audio-btn ${soundMuted ? 'muted' : 'active'}`}
            onClick={handleSoundClick}
            aria-label="Toggle Space Synth Audio"
            onMouseEnter={handleNavHover}
          >
            <div className="sound-waves">
              <span className={`wave-bar ${soundMuted ? 'stopped' : 'playing'}`} />
              <span className={`wave-bar ${soundMuted ? 'stopped' : 'playing'}`} />
              <span className={`wave-bar ${soundMuted ? 'stopped' : 'playing'}`} />
              <span className={`wave-bar ${soundMuted ? 'stopped' : 'playing'}`} />
            </div>
            <span className="btn-label">{soundMuted ? 'AMBIENT AUDIO OFF' : 'AMBIENT AUDIO ON'}</span>
          </button>
        </div>
      </aside>

      <footer className="hud-footer glass-panel">
        <div className="deck-info">
          <span className="telemetry-label">NAV COMPUTER STATE: </span>
          <span className="active-deck-name">{deckName}</span>
        </div>
        <div className="footer-deco-lines">
          <div className="deco-notch" />
          <div className="deco-notch" />
        </div>
        <div className="fuel-cells">
          <span className="telemetry-label">SYS ENERGY:</span>
          <div className="cell-blocks">
            <div className="cell active" />
            <div className="cell active" />
            <div className="cell active" />
            <div className="cell active" />
            <div className="cell active" />
            <div className="cell active" />
            <div className="cell" />
          </div>
        </div>
      </footer>
    </div>
  )
}

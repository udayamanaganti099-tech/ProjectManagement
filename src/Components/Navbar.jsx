import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ onOpenResumeGuide, onOpenNewProject, onOpenLogin }) => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header style={{
      background: '#ffffff',
      padding: '0 28px',
      height: '58px',
      borderBottom: '1px solid #dde3ec',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 50,
      flexShrink: 0
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '34px', height: '34px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #3b5bdb, #74c0fc)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '800', fontSize: '1rem', color: '#fff'
          }}>P</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1a2236' }}>ProjectFlow</div>
            <div style={{ fontSize: '0.68rem', color: '#6b7280' }}>Java 17 · Spring Boot 3 · React 18</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder="Search projects, tasks..."
            className="form-input"
            style={{ width: '240px', paddingLeft: '34px', height: '34px', fontSize: '0.8rem' }}
          />
          <span style={{ position: 'absolute', left: '10px', top: '9px', fontSize: '0.85rem', color: '#9ca3af' }}>🔍</span>
        </div>
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

        <button onClick={onOpenNewProject} className="btn btn-primary btn-sm">
          + New Project
        </button>

        {isAuthenticated ? (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '4px 10px', borderRadius: '8px',
                background: '#f4f6f9', border: '1px solid #dde3ec',
                cursor: 'pointer'
              }}
            >

              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#1a2236' }}>{user?.fullName}</div>
                <div><span className={`badge badge-${user?.role?.toLowerCase()}`}>{user?.role?.replace('_',' ')}</span></div>
              </div>
              <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>▾</span>
            </button>

            {showProfileMenu && (
              <div style={{
                position: 'absolute', right: 0, top: '46px',
                width: '200px', background: '#fff',
                border: '1px solid #dde3ec', borderRadius: '10px',
                padding: '10px', zIndex: 200,
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Switch Role (Demo)
                </p>
                {['ADMIN', 'PROJECT_MANAGER', 'DEVELOPER'].map(role => (
                  <button
                    key={role}
                    onClick={() => { switchRole(role); setShowProfileMenu(false); }}
                    className="btn btn-secondary btn-sm"
                    style={{
                      width: '100%', justifyContent: 'flex-start', marginBottom: '5px',
                      background: user?.role === role ? '#e8eeff' : undefined,
                      borderColor: user?.role === role ? '#3b5bdb' : undefined,
                      color: user?.role === role ? '#3b5bdb' : '#1a2236'
                    }}
                  >{role.replace('_',' ')}</button>
                ))}
                <hr style={{ border: 'none', borderTop: '1px solid #dde3ec', margin: '8px 0' }} />
                <button
                  onClick={() => { logout(); setShowProfileMenu(false); }}
                  className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'flex-start', color: '#c92a2a' }}
                >🚪 Logout</button>
              </div>
            )}
          </div>
        ) : (
          <button onClick={onOpenLogin} className="btn btn-secondary btn-sm">
            🔑 Sign In
          </button>
        )}
      </div>
    </header>
  );
};

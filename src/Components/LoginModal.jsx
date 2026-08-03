import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const LoginModal = ({ onClose }) => {
  const { login, register } = useAuth();
  const [tab,         setTab]         = useState('login');
  const [loginForm,   setLoginForm]   = useState({ username: 'dev_rahul', password: 'password123' });
  const [regForm,     setRegForm]     = useState({ username: '', email: '', password: '', fullName: '', role: 'DEVELOPER' });
  const [error,       setError]       = useState('');
  const [jwtToken,    setJwtToken]    = useState('');

  const presets = [
    { label: '👨‍💻 Developer', user: 'dev_rahul'  },
    { label: '👩‍💼 PM',        user: 'pm_sarah'   },
    { label: '🛡️ Admin',     user: 'admin'      },
  ];

  const handleLogin = async e => {
    e.preventDefault();
    setError('');
    const res = await login(loginForm.username, loginForm.password);
    if (res.success) { setJwtToken(res.token); setTimeout(onClose, 700); }
    else setError(res.error || 'Authentication failed.');
  };

  const handleRegister = async e => {
    e.preventDefault();
    setError('');
    if (!regForm.username || !regForm.email || !regForm.password || !regForm.fullName) {
      setError('All fields are required.'); return;
    }
    const res = await register(regForm);
    if (!res.success) setError(res.error || 'Registration failed.');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b5bdb', textTransform: 'uppercase', marginBottom: '3px' }}>
              Spring Security 6 · JWT Auth
            </p>
            <h2 style={{ fontSize: '1.15rem' }}>{tab === 'login' ? 'Sign In' : 'Create Account'}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Tab toggle */}
        <div style={{ display: 'flex', background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '3px', gap: '4px', marginBottom: '18px' }}>
          {['login','register'].map(t => (
            <button key={t} type="button" onClick={() => { setTab(t); setError(''); }}
              className={tab === t ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
              style={{ flex: 1, justifyContent: 'center' }}>
              {t === 'login' ? '🔑 Sign In' : '📝 Register'}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #ffa8a8', color: '#c92a2a', padding: '9px 12px', borderRadius: '7px', fontSize: '0.8rem', marginBottom: '14px' }}>
            ⚠️ {error}
          </div>
        )}
        {jwtToken && (
          <div style={{ background: '#ebfbee', border: '1px solid #b2f2bb', color: '#2f9e44', padding: '9px 12px', borderRadius: '7px', fontSize: '0.8rem', marginBottom: '14px' }}>
            ✅ JWT Token Issued: <code style={{ fontSize: '0.72rem' }}>{jwtToken.substring(0,30)}...</code>
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            {/* Quick presets */}
            <div style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '10px', marginBottom: '14px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b5bdb', textTransform: 'uppercase', marginBottom: '7px' }}>⚡ Quick Demo</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                {presets.map(p => (
                  <button key={p.user} type="button"
                    onClick={() => setLoginForm({ username: p.user, password: 'password123' })}
                    className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', fontSize: '0.71rem' }}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Username</label>
              <input type="text" required value={loginForm.username}
                onChange={e => setLoginForm({ ...loginForm, username: e.target.value })} className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" required value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="form-input" />
            </div>
            <p style={{ fontSize: '0.73rem', color: '#6b7280', marginBottom: '14px' }}>
              🔒 Authenticates against <code style={{ color: '#3b5bdb' }}>POST /api/v1/auth/login</code>
            </p>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Sign In & Generate JWT →
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" required placeholder="e.g. Rahul Verma" value={regForm.fullName}
                onChange={e => setRegForm({ ...regForm, fullName: e.target.value })} className="form-input" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input type="text" required placeholder="rahul_dev" value={regForm.username}
                  onChange={e => setRegForm({ ...regForm, username: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" required placeholder="rahul@company.com" value={regForm.email}
                  onChange={e => setRegForm({ ...regForm, email: e.target.value })} className="form-input" />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input type="password" required placeholder="••••••••" value={regForm.password}
                  onChange={e => setRegForm({ ...regForm, password: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <select value={regForm.role} onChange={e => setRegForm({ ...regForm, role: e.target.value })} className="form-select">
                  <option value="DEVELOPER">Developer</option>
                  <option value="PROJECT_MANAGER">Project Manager</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '6px' }}>
              Create Account →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

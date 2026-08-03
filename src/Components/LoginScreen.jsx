import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const LoginScreen = () => {
  const { login, register } = useAuth();
  const [tab,       setTab]       = useState('login');
  const [loginForm, setLoginForm] = useState({ username: 'dev_rahul', password: 'password123' });
  const [regForm,   setRegForm]   = useState({ username: '', email: '', password: '', fullName: '', role: 'DEVELOPER', designation: 'Java Full Stack Engineer' });
  const [error,     setError]     = useState('');
  const [loading,   setLoading]   = useState(false);

  const presets = [
    { label: '👨‍💻 Developer', user: 'dev_rahul' },
    { label: '👩‍💼 PM',        user: 'pm_sarah'  },
    { label: '🛡️ Admin',     user: 'admin'     },
  ];

  const handleLogin = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    const res = await login(loginForm.username, loginForm.password);
    setLoading(false);
    if (!res.success) setError(res.error || 'Login failed. Check your credentials.');
  };

  const handleRegister = async e => {
    e.preventDefault(); setError('');
    if (!regForm.username || !regForm.email || !regForm.password || !regForm.fullName) {
      setError('All fields are required.'); return;
    }
    setLoading(true);
    const res = await register(regForm);
    setLoading(false);
    if (!res.success) setError(res.error || 'Registration failed.');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f4f6f9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', background: '#ffffff', border: '1px solid #dde3ec', borderRadius: '14px', padding: '32px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>

        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b5bdb, #74c0fc)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.3rem', color: '#fff', marginBottom: '10px' }}>
            P
          </div>
          <h1 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1a2236' }}>ProjectFlow</h1>
          <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '3px' }}>Java 17 · Spring Boot 3 · React 18</p>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '3px', gap: '4px', marginBottom: '20px' }}>
          {['login','register'].map(t => (
            <button key={t} type="button" onClick={() => { setTab(t); setError(''); }}
              className={tab === t ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
              style={{ flex: 1, justifyContent: 'center' }}>
              {t === 'login' ? '🔑 Sign In' : '📝 Sign Up'}
            </button>
          ))}
        </div>

        {error && (
          <div style={{ background: '#fff5f5', border: '1px solid #ffa8a8', borderRadius: '8px', padding: '10px 13px', marginBottom: '14px' }}>
            <p style={{ color: '#c92a2a', fontSize: '0.82rem', marginBottom: error.toLowerCase().includes('sign up') || error.toLowerCase().includes('not found') ? '8px' : '0' }}>
              ⚠️ {error}
            </p>
            {/* Show Sign Up shortcut when user doesn't exist */}
            {(error.toLowerCase().includes('not found') || error.toLowerCase().includes('sign up')) && (
              <button
                type="button"
                onClick={() => { setTab('register'); setError(''); }}
                style={{ fontSize: '0.78rem', fontWeight: 700, color: '#3b5bdb', background: '#e8eeff', border: '1px solid #c5d0f5', borderRadius: '6px', padding: '4px 12px', cursor: 'pointer' }}
              >
                → Create an account now
              </button>
            )}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            {/* Quick Demo Presets */}
            <div style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '10px', marginBottom: '16px' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b5bdb', textTransform: 'uppercase', marginBottom: '7px' }}>
                ⚡ Quick Demo Accounts
              </p>
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
            <div className="form-group" style={{ marginBottom: '18px' }}>
              <label className="form-label">Password</label>
              <input type="password" required value={loginForm.password}
                onChange={e => setLoginForm({ ...loginForm, password: e.target.value })} className="form-input" />
            </div>
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
              {loading ? 'Signing in...' : 'Sign In to Dashboard →'}
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
                <input type="email" required placeholder="you@company.com" value={regForm.email}
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
            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: '4px' }}>
              {loading ? 'Creating...' : 'Create Account & Sign In →'}
            </button>
          </form>
        )}


      </div>
    </div>
  );
};

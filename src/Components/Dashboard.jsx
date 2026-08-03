import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const StatCard = ({ label, value, icon, iconBg, iconColor, sub }) => (
  <div className="glass-card metric-card">
    <div>
      <p style={{ fontSize: '0.73rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</p>
      <p className="metric-val">{value}</p>
      {sub && <p style={{ fontSize: '0.73rem', color: '#6b7280', marginTop: '2px' }}>{sub}</p>}
    </div>
    <div className="metric-icon-box" style={{ background: iconBg, color: iconColor }}>{icon}</div>
  </div>
);

export const Dashboard = ({ onSelectProject, onOpenNewProject }) => {
  const [stats, setStats]       = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    Promise.all([apiService.getDashboardStats(), apiService.getProjects()])
      .then(([s, p]) => { setStats(s); setProjects(p); setLoading(false); });
  }, []);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: '#6b7280' }}>
      Loading dashboard...
    </div>
  );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Spring Boot 3 + React 18 Project Management System</p>
        </div>
        <button onClick={onOpenNewProject} className="btn btn-primary">+ New Project</button>
      </div>

      {/* Stats */}
      <div className="metrics-grid">
        <StatCard label="Active Projects"  value={`${stats?.activeProjects}/${stats?.totalProjects}`}
          icon="📁" iconBg="#e8eeff" iconColor="#3b5bdb"
          sub="100% on-time delivery" />
        <StatCard label="Total Tasks"      value={stats?.totalTasks}
          icon="📋" iconBg="#e3fafc" iconColor="#0c8599"
          sub={`${stats?.completedTasks} done · ${stats?.inProgressTasks} in progress`} />
        <StatCard label="Completion Rate"  value={`${stats?.overallCompletionRate}%`}
          icon="📈" iconBg="#ebfbee" iconColor="#2f9e44"
          sub="Sprint velocity on track" />
        <StatCard label="Budget Allocated" value={`$${((stats?.totalBudget||0)/1000).toFixed(0)}k`}
          icon="💰" iconBg="#fff9db" iconColor="#e67700"
          sub={`${stats?.totalTeamMembers} engineers assigned`} />
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>

        {/* Project List */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Active Projects</h3>
            <span style={{ fontSize: '0.8rem', color: '#6b7280' }}>{projects.length} total</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {projects.map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p.id)}
                style={{
                  padding: '14px', borderRadius: '8px',
                  border: '1px solid #dde3ec', background: '#f4f6f9',
                  cursor: 'pointer', transition: 'border-color 0.15s'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#3b5bdb'}
                onMouseLeave={e => e.currentTarget.style.borderColor = '#dde3ec'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#3b5bdb' }}>[{p.projectKey}]</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1a2236' }}>{p.name}</span>
                  </div>
                  <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status.replace('_',' ')}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '8px' }}>{p.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginBottom: '8px' }}>
                  <span>Manager: <strong style={{ color: '#1a2236' }}>{p.managerName}</strong></span>
                  <span>Budget: <strong style={{ color: '#e67700' }}>${p.budget?.toLocaleString()}</strong></span>
                  <span>Tasks: <strong style={{ color: '#2f9e44' }}>{p.completedTasks}/{p.totalTasks}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${p.progress}%` }}></div>
                  </div>
                  <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#374151', flexShrink: 0 }}>{p.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card">
            <h3 style={{ marginBottom: '14px' }}>⚙️ Tech Stack</h3>
            <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse' }}>
              <tbody>
                {[
                  ['Language',   'Java 17 LTS',          '#3b5bdb'],
                  ['Framework',  'Spring Boot 3.2',       '#0c8599'],
                  ['Security',   'Spring Security 6 JWT', '#2f9e44'],
                  ['Database',   'Spring Data JPA / H2',  '#e67700'],
                  ['API Docs',   'OpenAPI / Swagger 3',   '#7048e8'],
                  ['Frontend',   'React 18 + Vite',       '#3b5bdb'],
                ].map(([k, v, c]) => (
                  <tr key={k} style={{ borderBottom: '1px solid #f0f2f5' }}>
                    <td style={{ padding: '7px 0', color: '#6b7280' }}>{k}</td>
                    <td style={{ padding: '7px 0', fontWeight: 600, color: c, textAlign: 'right' }}>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>
      </div>
    </div>
  );
};

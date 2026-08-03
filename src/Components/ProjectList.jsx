import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

export const ProjectList = ({ onSelectProject, onOpenNewProject }) => {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    apiService.getProjects().then(d => { setProjects(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects Workspace</h1>
          <p className="page-subtitle">All Spring Boot microservice projects in one place</p>
        </div>
        <button onClick={onOpenNewProject} className="btn btn-primary">+ New Project</button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>Loading projects...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '18px' }}>
          {projects.map(p => (
            <div key={p.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {/* Card top */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#3b5bdb' }}>[{p.projectKey}]</span>
                  <span className={`badge badge-${p.status.toLowerCase()}`}>{p.status.replace('_',' ')}</span>
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '6px' }}>{p.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '14px', lineHeight: 1.4 }}>
                  {p.description}
                </p>

                {/* Info table */}
                <div style={{ background: '#f4f6f9', borderRadius: '8px', border: '1px solid #dde3ec', padding: '10px 12px', marginBottom: '14px' }}>
                  {[
                    ['Manager',  p.managerName,              '#1a2236'],
                    ['Budget',   `$${p.budget?.toLocaleString()}`, '#e67700'],
                    ['Timeline', `${p.startDate} → ${p.endDate}`, '#374151'],
                  ].map(([k, v, c]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                      <span style={{ color: '#6b7280' }}>{k}</span>
                      <strong style={{ color: c }}>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card bottom */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280', marginBottom: '5px' }}>
                  <span>Progress</span>
                  <strong style={{ color: '#1a2236' }}>{p.completedTasks}/{p.totalTasks} tasks ({p.progress}%)</strong>
                </div>
                <div className="progress-bar-bg" style={{ marginBottom: '14px' }}>
                  <div className="progress-bar-fill" style={{ width: `${p.progress}%` }}></div>
                </div>
                <button onClick={() => onSelectProject(p.id)} className="btn btn-secondary btn-sm"
                  style={{ width: '100%', justifyContent: 'center' }}>
                  Open Kanban Board →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

export const TeamList = () => {
  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiService.getUsers().then(d => { setUsers(d); setLoading(false); });
  }, []);

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Members</h1>
          <p className="page-subtitle">Developers, Project Managers, and System Admins</p>
        </div>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>Loading team...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '18px' }}>
          {users.map(u => (
            <div key={u.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <img
                src={u.avatarUrl}
                alt={u.fullName}
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #e8eeff', marginBottom: '12px' }}
              />
              <h3 style={{ fontSize: '0.98rem', marginBottom: '3px' }}>{u.fullName}</h3>
              <p style={{ fontSize: '0.78rem', color: '#3b5bdb', fontWeight: 600, marginBottom: '10px' }}>{u.designation}</p>
              <span className={`badge badge-${u.role.toLowerCase()}`} style={{ marginBottom: '12px' }}>
                {u.role.replace('_',' ')}
              </span>
              <div style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '7px', padding: '7px 10px', width: '100%', fontSize: '0.75rem', color: '#374151' }}>
                📧 {u.email}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard',          icon: '📊' },
  { id: 'kanban',    label: 'Kanban Board',        icon: '📋' },
  { id: 'projects',  label: 'Projects',            icon: '📁' },
  { id: 'team',      label: 'Team Members',        icon: '👥' },
];

export const Sidebar = ({ activeTab, setActiveTab, onOpenResumeGuide }) => (
  <aside style={{
    width: '220px',
    background: '#ffffff',
    borderRight: '1px solid #dde3ec',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '20px 12px',
    flexShrink: 0
  }}>
    <nav>
      <p style={{ fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.06em', paddingLeft: '12px', marginBottom: '10px' }}>
        Menu
      </p>
      {navItems.map(item => {
        const active = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: 'none',
              background: active ? '#e8eeff' : 'transparent',
              color: active ? '#3b5bdb' : '#374151',
              fontWeight: active ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              marginBottom: '2px',
              textAlign: 'left',
              transition: 'background 0.12s, color 0.12s'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>


  </aside>
);

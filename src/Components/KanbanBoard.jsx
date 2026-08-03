import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

const COLUMNS = [
  { id: 'BACKLOG',     label: 'Backlog',      icon: '📥', color: '#6b7280' },
  { id: 'IN_PROGRESS', label: 'In Progress',  icon: '⚙️', color: '#3b5bdb' },
  { id: 'IN_REVIEW',   label: 'In Review',    icon: '🔍', color: '#7048e8' },
  { id: 'COMPLETED',   label: 'Completed',    icon: '✅', color: '#2f9e44' },
];

export const KanbanBoard = ({ onSelectTask, onOpenNewTask, selectedProjectId }) => {
  const [tasks,          setTasks]          = useState([]);
  const [projects,       setProjects]       = useState([]);
  const [currentProject, setCurrentProject] = useState(selectedProjectId || '');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [search,         setSearch]         = useState('');
  const [loading,        setLoading]        = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    const [t, p] = await Promise.all([apiService.getTasks(currentProject), apiService.getProjects()]);
    setTasks(t); setProjects(p); setLoading(false);
  };
  useEffect(() => { fetchAll(); }, [currentProject]);

  const moveTo = async (taskId, newStatus, e) => {
    e.stopPropagation();
    await apiService.updateTaskStatus(taskId, newStatus);
    fetchAll();
  };

  const filtered = tasks.filter(t => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === 'ALL' || t.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Kanban Board</h1>
          <p className="page-subtitle">Manage sprint tasks and track workflow transitions</p>
        </div>
        <button onClick={onOpenNewTask} className="btn btn-primary">+ Add Task</button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Project:</label>
          <select value={currentProject} onChange={e => setCurrentProject(e.target.value)}
            className="form-select" style={{ width: '200px', height: '34px', fontSize: '0.8rem' }}>
            <option value="">All Projects</option>
            {projects.map(p => <option key={p.id} value={p.id}>[{p.projectKey}] {p.name}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Priority:</label>
          <select value={filterPriority} onChange={e => setFilterPriority(e.target.value)}
            className="form-select" style={{ width: '120px', height: '34px', fontSize: '0.8rem' }}>
            {['ALL','LOW','MEDIUM','HIGH','URGENT'].map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
        <input type="text" placeholder="Filter tasks..." value={search} onChange={e => setSearch(e.target.value)}
          className="form-input" style={{ width: '180px', height: '34px', fontSize: '0.8rem' }} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#6b7280', padding: '40px' }}>Loading board...</div>
      ) : (
        <div className="kanban-grid">
          {COLUMNS.map(col => {
            const colTasks = filtered.filter(t => t.status === col.id);
            const colIdx = COLUMNS.findIndex(c => c.id === col.id);
            return (
              <div key={col.id} className="kanban-column">
                {/* Column Header */}
                <div className="column-header">
                  <span className="column-title">
                    {col.icon}
                    <span style={{ color: col.color }}>{col.label}</span>
                  </span>
                  <span className="task-count-pill">{colTasks.length}</span>
                </div>

                {/* Tasks */}
                {colTasks.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '24px 10px', color: '#9ca3af', fontSize: '0.78rem', border: '1px dashed #dde3ec', borderRadius: '8px', marginTop: '8px' }}>
                    No tasks here
                  </div>
                ) : colTasks.map(task => (
                  <div key={task.id} className="task-card" onClick={() => onSelectTask(task)}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span>
                      <span style={{ fontSize: '0.7rem', color: '#9ca3af', fontWeight: 600 }}>#{task.id}</span>
                    </div>
                    <h4 style={{ fontSize: '0.87rem', marginBottom: '4px' }}>{task.title}</h4>
                    <p style={{ fontSize: '0.76rem', color: '#6b7280', marginBottom: '8px',
                      display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {task.description}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: '#3b5bdb', fontWeight: 600, marginBottom: '10px' }}>📁 {task.projectName}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      borderTop: '1px solid #f0f2f5', paddingTop: '8px', fontSize: '0.73rem', color: '#6b7280' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <img src={task.assigneeAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80'}
                          alt="" style={{ width: '20px', height: '20px', borderRadius: '50%', objectFit: 'cover' }} />
                        <span>{task.assigneeName?.split(' ')[0] || 'Unassigned'}</span>
                      </div>
                      <span>⏱ {task.estimatedHours}h</span>
                    </div>
                    {/* Move buttons */}
                    <div style={{ display: 'flex', gap: '4px', marginTop: '8px', paddingTop: '7px', borderTop: '1px dashed #e5e7eb' }}>
                      {colIdx > 0 && (
                        <button onClick={e => moveTo(task.id, COLUMNS[colIdx-1].id, e)}
                          className="btn btn-secondary btn-sm" style={{ flex: 1, justifyContent: 'center', padding: '3px' }}>
                          ← Back
                        </button>
                      )}
                      {colIdx < COLUMNS.length - 1 && (
                        <button onClick={e => moveTo(task.id, COLUMNS[colIdx+1].id, e)}
                          className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center', padding: '3px' }}>
                          Next →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';

export const NewTaskModal = ({ onClose, onRefresh }) => {
  const [projects, setProjects] = useState([]);
  const [users,    setUsers]    = useState([]);
  const [form, setForm] = useState({ title: '', description: '', status: 'BACKLOG', priority: 'MEDIUM', projectId: '', assigneeId: '', estimatedHours: 8 });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    Promise.all([apiService.getProjects(), apiService.getUsers()]).then(([p, u]) => {
      setProjects(p); setUsers(u);
      setForm(f => ({ ...f, projectId: p[0]?.id || '', assigneeId: u[0]?.id || '' }));
    });
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setBusy(true);
    await apiService.createTask(form);
    setBusy(false);
    onRefresh();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Task Title</label>
            <input type="text" required placeholder="e.g. Implement JWT Refresh Token" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })} className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea rows="3" placeholder="Acceptance criteria and notes..." value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })} className="form-textarea" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Project</label>
              <select value={form.projectId} onChange={e => setForm({ ...form, projectId: e.target.value })} className="form-select">
                {projects.map(p => <option key={p.id} value={p.id}>[{p.projectKey}] {p.name}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Assignee</label>
              <select value={form.assigneeId} onChange={e => setForm({ ...form, assigneeId: e.target.value })} className="form-select">
                {users.map(u => <option key={u.id} value={u.id}>{u.fullName}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="form-select">
                <option value="BACKLOG">Backlog</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })} className="form-select">
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Hours</label>
              <input type="number" value={form.estimatedHours} onChange={e => setForm({ ...form, estimatedHours: e.target.value })} className="form-input" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" disabled={busy} className="btn btn-primary">
              {busy ? 'Adding...' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

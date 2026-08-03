import React, { useState } from 'react';
import { apiService } from '../services/api';

export const NewProjectModal = ({ onClose, onRefresh }) => {
  const [form, setForm] = useState({ projectKey: '', name: '', description: '', status: 'PLANNING', budget: 100000, managerId: 2 });
  const [busy, setBusy] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setBusy(true);
    await apiService.createProject(form);
    setBusy(false);
    onRefresh();
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h2>Create New Project</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Project Key</label>
              <input type="text" required placeholder="e.g. FIN" value={form.projectKey}
                onChange={e => setForm({ ...form, projectKey: e.target.value.toUpperCase() })}
                className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input type="text" required placeholder="e.g. Banking Gateway" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea rows="3" placeholder="Project overview and goals..." value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              className="form-textarea" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} className="form-select">
                <option value="PLANNING">Planning</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ON_HOLD">On Hold</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Budget ($)</label>
              <input type="number" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })} className="form-input" />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '8px' }}>
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" disabled={busy} className="btn btn-primary">
              {busy ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

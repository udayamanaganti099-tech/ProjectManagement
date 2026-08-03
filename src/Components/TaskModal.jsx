import React, { useEffect, useState } from 'react';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const TaskModal = ({ task, onClose, onRefresh }) => {
  const { user } = useAuth();
  const [comments,        setComments]        = useState([]);
  const [newComment,      setNewComment]      = useState('');
  const [status,          setStatus]          = useState(task?.status || 'BACKLOG');
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    if (!task) return;
    setStatus(task.status);
    apiService.getComments(task.id).then(d => { setComments(d); setLoadingComments(false); });
  }, [task]);

  if (!task) return null;

  const handleStatusChange = async e => {
    setStatus(e.target.value);
    await apiService.updateTaskStatus(task.id, e.target.value);
    onRefresh();
  };

  const handleAddComment = async e => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const c = await apiService.addComment({ taskId: task.id, authorId: user?.id || 3, content: newComment });
    setComments([c, ...comments]);
    setNewComment('');
    onRefresh();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b5bdb', marginBottom: '3px' }}>
              📁 {task.projectName} · #{task.id}
            </p>
            <h2 style={{ fontSize: '1.15rem' }}>{task.title}</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Details grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <p className="form-label">Description</p>
            <p style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '12px', fontSize: '0.85rem', color: '#374151', lineHeight: 1.5 }}>
              {task.description || 'No description provided.'}
            </p>
          </div>
          <div style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <p className="form-label">Status</p>
              <select value={status} onChange={handleStatusChange} className="form-select" style={{ fontSize: '0.82rem' }}>
                <option value="BACKLOG">Backlog</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="IN_REVIEW">In Review</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div>
              <p className="form-label">Priority</p>
              <span className={`badge badge-${task.priority.toLowerCase()}`}>{task.priority}</span>
            </div>
            <div>
              <p className="form-label">Assignee</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <img src={task.assigneeAvatar} alt="" style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }} />
                <span style={{ fontSize: '0.83rem', fontWeight: 600, color: '#1a2236' }}>{task.assigneeName}</span>
              </div>
            </div>
            <div>
              <p className="form-label">Estimate</p>
              <span style={{ fontSize: '0.83rem', color: '#374151' }}>⏱ {task.estimatedHours} hours</span>
            </div>
          </div>
        </div>

        {/* Discussion */}
        <div style={{ borderTop: '1px solid #dde3ec', paddingTop: '16px' }}>
          <h4 style={{ marginBottom: '12px' }}>💬 Discussion ({comments.length})</h4>
          <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
            <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment..." className="form-input" style={{ flex: 1 }} />
            <button type="submit" className="btn btn-primary btn-sm">Post</button>
          </form>
          {loadingComments ? (
            <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>Loading comments...</p>
          ) : (
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {comments.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>No comments yet. Be the first!</p>
              ) : comments.map(c => (
                <div key={c.id} style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '10px 12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <img src={c.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80'}
                        alt="" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} />
                      <strong style={{ fontSize: '0.78rem', color: '#3b5bdb' }}>{c.authorName}</strong>
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#9ca3af' }}>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.81rem', color: '#374151' }}>{c.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

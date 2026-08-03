import React, { useState } from 'react';

const resumeBullets = [
  {
    category: 'Backend — Java 17 & Spring Boot 3',
    bullets: [
      'Built a full-stack Project Management System using Java 17, Spring Boot 3, and REST API (MVC architecture with Controller → Service → Repository layers).',
      'Implemented Spring Security 6 with stateless JWT authentication using OncePerRequestFilter and SecurityFilterChain — replacing the deprecated WebSecurityConfigurerAdapter.',
      'Applied Role-Based Access Control (RBAC) with three user roles: ADMIN, PROJECT_MANAGER, and DEVELOPER.',
      'Designed Spring Data JPA entities with @OneToMany / @ManyToOne relationships, optimized queries with @Query and JOIN FETCH to avoid N+1 issues.',
      'Integrated SpringDoc OpenAPI (Swagger 3) for automated REST API documentation accessible at /swagger-ui.html.',
      'Built a global exception handler with @RestControllerAdvice for consistent JSON error responses.',
    ]
  },
  {
    category: 'Frontend — React 18',
    bullets: [
      'Developed a responsive React 18 SPA with Context API for JWT session management, role-based UI rendering, and mock data fallback.',
      'Built an interactive Kanban board with drag-less task status transitions: Backlog → In Progress → In Review → Completed.',
      'Created a centralized API service layer (apiService.js) with Bearer token injection and offline mock mode.',
    ]
  },
  {
    category: 'Database & DevOps',
    bullets: [
      'Designed H2 / MySQL relational schema with seed data SQL script and foreign key constraints.',
      'Used @Transactional(readOnly = true) for read queries and full transactions for writes with automatic rollback.',
    ]
  }
];

const interviewQA = [
  {
    q: 'Q1. What changed in Spring Security 6?',
    a: 'WebSecurityConfigurerAdapter was removed. You now define a SecurityFilterChain @Bean directly using the HttpSecurity lambda DSL with methods like authorizeHttpRequests() and csrf().'
  },
  {
    q: 'Q2. How did you implement JWT authentication?',
    a: 'Created JwtTokenProvider (sign + validate HS256 tokens) and JwtAuthFilter extending OncePerRequestFilter — it reads the Authorization header, validates the token, and sets the authentication in SecurityContextHolder.'
  },
  {
    q: 'Q3. Why use DTOs instead of JPA Entities directly?',
    a: 'To avoid Jackson circular reference errors, to hide sensitive fields like passwords, and to decouple the API contract from the database schema.'
  },
  {
    q: 'Q4. How do you handle N+1 queries in JPA?',
    a: 'Using JOIN FETCH in JPQL (@Query annotation) or @EntityGraph on repository methods to load lazy associations in a single SQL query.'
  },
  {
    q: 'Q5. What does @Transactional do?',
    a: 'Wraps the method in a database transaction. readOnly=true optimizes reads. On unchecked exceptions, it auto-rollbacks. Ensures atomicity for operations that span multiple repository calls.'
  },
];

const architecture = [
  { title: 'Request Flow', color: '#3b5bdb', content: 'React → HTTP Bearer Token → JwtAuthFilter → SecurityContext → @RestController → @Service (@Transactional) → @Repository (JPA) → Database' },
  { title: 'Entity Relationships', color: '#2f9e44', content: 'User (1) ─── manages ───→ Project (N)\nProject (1) ─── has ───────→ Task (N)\nTask (1) ─── has ──────────→ Comment (N)\nUser (1) ─── assignedTo ──→ Task (N)' },
];

export const ResumeGuideModal = ({ onClose }) => {
  const [tab, setTab] = useState('resume');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '760px', width: '92vw' }}>
        <div className="modal-header">
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#3b5bdb', textTransform: 'uppercase', marginBottom: '3px' }}>
              TCS · Infosys · Wipro · Accenture
            </p>
            <h2 style={{ fontSize: '1.2rem' }}>Java Full Stack Resume & Interview Kit</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', borderBottom: '1px solid #dde3ec', paddingBottom: '12px' }}>
          {[
            { id: 'resume',       label: '📄 Resume Bullets' },
            { id: 'qa',           label: '❓ Interview Q&A' },
            { id: 'architecture', label: '🏗️ Architecture' },
          ].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={tab === t.id ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Resume Bullets */}
        {tab === 'resume' && (
          <div>
            <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '14px' }}>
              Copy these bullet points into your resume under the <strong style={{ color: '#1a2236' }}>Projects</strong> section:
            </p>
            {resumeBullets.map((cat, i) => (
              <div key={i} style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '14px', marginBottom: '12px' }}>
                <h4 style={{ color: '#3b5bdb', marginBottom: '10px', fontSize: '0.88rem' }}>{cat.category}</h4>
                <ul style={{ paddingLeft: '18px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                  {cat.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.5 }}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Interview Q&A */}
        {tab === 'qa' && (
          <div>
            <p style={{ fontSize: '0.82rem', color: '#6b7280', marginBottom: '14px' }}>
              Most common technical interview questions at service-based MNCs:
            </p>
            {interviewQA.map((qa, i) => (
              <div key={i} style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '14px', marginBottom: '10px' }}>
                <h4 style={{ color: '#e67700', fontSize: '0.86rem', marginBottom: '6px' }}>{qa.q}</h4>
                <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.5 }}>{qa.a}</p>
              </div>
            ))}
          </div>
        )}

        {/* Architecture */}
        {tab === 'architecture' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {architecture.map((a, i) => (
              <div key={i} style={{ background: '#f4f6f9', border: '1px solid #dde3ec', borderRadius: '8px', padding: '16px' }}>
                <h4 style={{ color: a.color, marginBottom: '8px', fontSize: '0.88rem' }}>{a.title}</h4>
                <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.7, fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{a.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

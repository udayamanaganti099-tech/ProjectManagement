-- ============================================================
-- Seed Data for ProjectFlow (MySQL)
-- Uses INSERT IGNORE so re-runs on restart don't fail
-- Password for all users: password123 (BCrypt encoded)
-- ============================================================

-- 1. Users
INSERT INTO users (id, username, email, password, full_name, role, avatar_url, designation) VALUES
(1, 'admin',      'admin@techcorp.com',         '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Vikram Sharma',  'ADMIN',           'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', 'Engineering Director'),
(2, 'pm_sarah',   'sarah.jenkins@techcorp.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Sarah Jenkins',  'PROJECT_MANAGER', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150', 'Senior Delivery Lead'),
(3, 'dev_rahul',  'rahul.verma@techcorp.com',   '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Rahul Verma',    'DEVELOPER',       'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Java Lead Developer'),
(4, 'dev_ananya', 'ananya.roy@techcorp.com',    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'Ananya Roy',     'DEVELOPER',       'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', 'Senior React Engineer')
ON CONFLICT (id) DO UPDATE SET password = EXCLUDED.password;

-- 2. Projects
INSERT INTO projects (id, project_key, name, description, status, budget, start_date, end_date, manager_id, progress) VALUES
(101, 'PM-SYS',       'Cloud Banking Migration Platform', 'Migrating core monolithic banking services to Spring Boot microservices on AWS Cloud with OAuth2 security.', 'IN_PROGRESS', 150000.00, '2026-01-15', '2026-10-31', 2, 65),
(102, 'HEALTH-APP',   'TeleHealth Mobile & Web Portal',   'HIPAA compliant patient portal with video consultations, prescriptions management, and appointment scheduler.', 'IN_PROGRESS', 95000.00,  '2026-03-01', '2026-08-30', 2, 40),
(103, 'AI-ANALYTICS', 'Customer Insights AI Dashboard',   'Real-time telemetry and predictive churn analysis pipeline with React UI & Spring Security REST API.', 'PLANNING', 120000.00, '2026-09-01', '2026-12-15', 1, 15)
ON CONFLICT (id) DO NOTHING;

-- 3. Tasks
INSERT INTO tasks (id, title, description, status, priority, project_id, reporter_id, assignee_id, due_date, estimated_hours) VALUES
(1001, 'Implement Spring Security 6 JWT Auth',           'Setup SecurityFilterChain, JwtTokenProvider, and custom UserDetailsService with role validation.',    'COMPLETED',   'HIGH',   101, 2, 3, '2026-04-10', 16),
(1002, 'Design JPA Entity Relational Model',             'Create User, Project, Task, Comment entities with JPA annotations and DB indexing.',                  'COMPLETED',   'MEDIUM', 101, 2, 3, '2026-04-15', 12),
(1003, 'Develop Kanban Board Frontend Component',        'Build React Kanban interface with status column filters and priority badges.',                         'IN_PROGRESS', 'URGENT', 101, 2, 4, '2026-08-10', 24),
(1004, 'Setup Docker Containerization & CI/CD Pipeline', 'Create Dockerfile, docker-compose.yml for Spring Boot backend and React frontend build.',              'IN_REVIEW',   'HIGH',   101, 1, 3, '2026-08-15', 18),
(1005, 'Integrate Swagger / OpenAPI Documentation',      'Add springdoc-openapi dependency and document all REST controller endpoints.',                         'BACKLOG',     'LOW',    101, 2, 4, '2026-08-25', 8),
(1006, 'Patient Appointment Video Consultation API',     'REST API for WebRTC session initialization and token generation for virtual doctor visits.',           'IN_PROGRESS', 'URGENT', 102, 2, 3, '2026-08-20', 30)
ON CONFLICT (id) DO NOTHING;

-- 4. Comments
INSERT INTO comments (id, task_id, author_id, content, created_at) VALUES
(501, 1001, 3, 'Spring Security 6 configuration completed. Using stateless sessions with Bearer JWT filter.',    NOW()),
(502, 1003, 4, 'Kanban board layout done. Status transition buttons added for Backlog to In Progress to Review.', NOW())
ON CONFLICT (id) DO NOTHING;

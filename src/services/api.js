// Centralized API Client with Spring Boot REST integration & Mock Fallback Mode

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

// Initial Mock Data Fallback
const MOCK_USERS = [
  { id: 1, username: 'admin', email: 'admin@techcorp.com', fullName: 'Vikram Sharma', role: 'ADMIN', designation: 'Engineering Director', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' },
  { id: 2, username: 'pm_sarah', email: 'sarah.jenkins@techcorp.com', fullName: 'Sarah Jenkins', role: 'PROJECT_MANAGER', designation: 'Senior Delivery Lead', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150' },
  { id: 3, username: 'dev_rahul', email: 'rahul.verma@techcorp.com', fullName: 'Rahul Verma', role: 'DEVELOPER', designation: 'Java Lead Developer', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: 4, username: 'dev_ananya', email: 'ananya.roy@techcorp.com', fullName: 'Ananya Roy', role: 'DEVELOPER', designation: 'Senior React Engineer', avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150' }
];

let MOCK_PROJECTS = [
  { id: 101, projectKey: 'PM-SYS', name: 'Cloud Banking Migration Platform', description: 'Migrating core monolithic banking legacy services to Spring Boot microservices on AWS Cloud with OAuth2 security.', status: 'IN_PROGRESS', budget: 150000.00, startDate: '2026-01-15', endDate: '2026-10-31', managerId: 2, managerName: 'Sarah Jenkins', progress: 65, totalTasks: 5, completedTasks: 2 },
  { id: 102, projectKey: 'HEALTH-APP', name: 'TeleHealth Mobile & Web Portal', description: 'HIPAA compliant patient portal with video consultations, prescriptions management, and appointment scheduler.', status: 'IN_PROGRESS', budget: 95000.00, startDate: '2026-03-01', endDate: '2026-08-30', managerId: 2, managerName: 'Sarah Jenkins', progress: 40, totalTasks: 3, completedTasks: 1 },
  { id: 103, projectKey: 'AI-ANALYTICS', name: 'Customer Insights AI Dashboard', description: 'Real-time telemetry and predictive churn analysis pipeline with React UI & Spring Security REST API integrations.', status: 'PLANNING', budget: 120000.00, startDate: '2026-09-01', endDate: '2026-12-15', managerId: 1, managerName: 'Vikram Sharma', progress: 15, totalTasks: 2, completedTasks: 0 }
];

let MOCK_TASKS = [
  { id: 1001, title: 'Implement Spring Security 6 JWT Auth', description: 'Setup SecurityFilterChain, JwtTokenProvider, and custom UserDetailsService with role validation.', status: 'COMPLETED', priority: 'HIGH', projectId: 101, projectName: 'Cloud Banking Migration Platform', reporterId: 2, reporterName: 'Sarah Jenkins', assigneeId: 3, assigneeName: 'Rahul Verma', assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', dueDate: '2026-04-10', estimatedHours: 16, commentCount: 1 },
  { id: 1002, title: 'Design JPA Entity Relational Model', description: 'Create User, Project, Task, Comment entities with JPA annotations and DB indexing.', status: 'COMPLETED', priority: 'MEDIUM', projectId: 101, projectName: 'Cloud Banking Migration Platform', reporterId: 2, reporterName: 'Sarah Jenkins', assigneeId: 3, assigneeName: 'Rahul Verma', assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', dueDate: '2026-04-15', estimatedHours: 12, commentCount: 0 },
  { id: 1003, title: 'Develop Kanban Board Frontend Component', description: 'Build drag and drop React Kanban interface with status column filters and priority badges.', status: 'IN_PROGRESS', priority: 'URGENT', projectId: 101, projectName: 'Cloud Banking Migration Platform', reporterId: 2, reporterName: 'Sarah Jenkins', assigneeId: 4, assigneeName: 'Ananya Roy', assigneeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', dueDate: '2026-08-10', estimatedHours: 24, commentCount: 1 },
  { id: 1004, title: 'Setup Docker Containerization & CI/CD Pipeline', description: 'Create Dockerfile, docker-compose.yml for Spring Boot backend and React frontend build.', status: 'IN_REVIEW', priority: 'HIGH', projectId: 101, projectName: 'Cloud Banking Migration Platform', reporterId: 1, reporterName: 'Vikram Sharma', assigneeId: 3, assigneeName: 'Rahul Verma', assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', dueDate: '2026-08-15', estimatedHours: 18, commentCount: 0 },
  { id: 1005, title: 'Integrate Swagger / OpenAPI Documentation', description: 'Add springdoc-openapi dependency and document all REST controller endpoints.', status: 'BACKLOG', priority: 'LOW', projectId: 101, projectName: 'Cloud Banking Migration Platform', reporterId: 2, reporterName: 'Sarah Jenkins', assigneeId: 4, assigneeName: 'Ananya Roy', assigneeAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', dueDate: '2026-08-25', estimatedHours: 8, commentCount: 0 },
  { id: 1006, title: 'Patient Appointment Video Consultation API', description: 'REST API for WebRTC session initialization and token generation for virtual doctor visits.', status: 'IN_PROGRESS', priority: 'URGENT', projectId: 102, projectName: 'TeleHealth Mobile & Web Portal', reporterId: 2, reporterName: 'Sarah Jenkins', assigneeId: 3, assigneeName: 'Rahul Verma', assigneeAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', dueDate: '2026-08-20', estimatedHours: 30, commentCount: 0 }
];

let MOCK_COMMENTS = [
  { id: 501, taskId: 1001, authorId: 3, authorName: 'Rahul Verma', authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', content: 'Spring Security 6 configuration completed with Stateless Session Creation Policy and Bearer JWT filter.', createdAt: '2026-04-10T14:30:00' },
  { id: 502, taskId: 1003, authorId: 4, authorName: 'Ananya Roy', authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150', content: 'React Kanban layout structure finalized. Added micro-animations for task card interactions.', createdAt: '2026-08-01T11:15:00' }
];

// Helper to make fetch with JWT header
// Returns: parsed JSON on success, { httpError, status, message } on HTTP errors, null on network failure
async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });

    if (!response.ok) {
      // HTTP error (401, 400, 409 etc.) — read the error body if possible
      let message = `Error ${response.status}`;
      try {
        const errBody = await response.json();
        message = errBody.message || errBody.error || message;
      } catch (_) {}
      // Return a special error object — NOT null (null means backend offline → use mock)
      return { httpError: true, status: response.status, message };
    }

    return await response.json();
  } catch (err) {
    // Network error — backend is offline, fall through to mock
    console.warn(`Backend offline at ${endpoint}, using mock data.`, err.message);
    return null;
  }
}

export const apiService = {
  // ── Login ─────────────────────────────────────────────────────
  login: async (username, password) => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    // Backend is running and returned an HTTP error (wrong credentials, user not found)
    if (res && res.httpError) {
      if (res.status === 401 || res.status === 403) {
        return { authError: true, message: 'enter valid credentials' };
      }
      if (res.status === 404) {
        return { authError: true, message: 'User not found. Please sign up first.' };
      }
      return { authError: true, message: res.message || 'Login failed.' };
    }

    // Backend returned a valid JWT response
    if (res && res.token) return res;

    // Backend is offline → fallback mock (only for demo purposes)
    const mockUser = MOCK_USERS.find(u => u.username === username);
    if (!mockUser) {
      return { authError: true, message: 'User not found. Please sign up first.' };
    }
    return {
      token: 'mock-jwt-token-xyz-998877',
      tokenType: 'Bearer',
      id: mockUser.id,
      username: mockUser.username,
      email: mockUser.email,
      fullName: mockUser.fullName,
      role: mockUser.role,
      designation: mockUser.designation,
      avatarUrl: mockUser.avatarUrl
    };
  },

  // ── Register ──────────────────────────────────────────────────
  // Saves new user to MySQL via POST /api/v1/auth/register
  register: async (userData) => {
    const res = await request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        username:    userData.username,
        email:       userData.email,
        password:    userData.password,
        fullName:    userData.fullName,
        role:        userData.role        || 'DEVELOPER',
        designation: userData.designation || 'Software Engineer'
      })
    });

    // Backend running — HTTP error (e.g. username/email already taken)
    if (res && res.httpError) {
      if (res.status === 409 || res.status === 400) {
        return { regError: true, message: res.message || 'Username or email already exists.' };
      }
      return { regError: true, message: res.message || 'Registration failed.' };
    }

    // Success — user saved in MySQL
    if (res && res.id) return res;

    // Backend offline → fallback mock
    const alreadyExists = MOCK_USERS.find(u => u.username === userData.username || u.email === userData.email);
    if (alreadyExists) {
      return { regError: true, message: 'Username or email already exists.' };
    }
    const mockUser = {
      id:          Date.now(),
      username:    userData.username,
      email:       userData.email,
      fullName:    userData.fullName,
      role:        userData.role || 'DEVELOPER',
      designation: userData.designation || 'Software Engineer',
      avatarUrl:   'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    };
    MOCK_USERS.push(mockUser);
    return mockUser;
  },


  // Dashboard Telemetry
  getDashboardStats: async () => {
    const res = await request('/dashboard/stats');
    if (res) return res;

    // Calculate mock stats
    const totalProjects = MOCK_PROJECTS.length;
    const activeProjects = MOCK_PROJECTS.filter(p => p.status === 'IN_PROGRESS').length;
    const totalTasks = MOCK_TASKS.length;
    const completedTasks = MOCK_TASKS.filter(t => t.status === 'COMPLETED').length;
    const inProgressTasks = MOCK_TASKS.filter(t => t.status === 'IN_PROGRESS').length;
    const backlogTasks = MOCK_TASKS.filter(t => t.status === 'BACKLOG').length;
    const totalBudget = MOCK_PROJECTS.reduce((acc, p) => acc + p.budget, 0);

    return {
      totalProjects,
      activeProjects,
      totalTasks,
      completedTasks,
      inProgressTasks,
      backlogTasks,
      totalTeamMembers: MOCK_USERS.length,
      totalBudget,
      overallCompletionRate: Math.round((completedTasks / totalTasks) * 100)
    };
  },

  // Projects
  getProjects: async () => {
    const res = await request('/projects');
    return res || MOCK_PROJECTS;
  },

  createProject: async (projectData) => {
    const res = await request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData)
    });
    if (res) return res;

    const manager = MOCK_USERS.find(u => u.id === Number(projectData.managerId)) || MOCK_USERS[1];
    const newProj = {
      id: Date.now(),
      projectKey: projectData.projectKey || 'PROJ-' + Math.floor(Math.random() * 900 + 100),
      name: projectData.name,
      description: projectData.description,
      status: projectData.status || 'PLANNING',
      budget: Number(projectData.budget) || 50000,
      startDate: projectData.startDate || new Date().toISOString().split('T')[0],
      endDate: projectData.endDate || '2026-12-31',
      managerId: manager.id,
      managerName: manager.fullName,
      progress: 0,
      totalTasks: 0,
      completedTasks: 0
    };
    MOCK_PROJECTS.unshift(newProj);
    return newProj;
  },

  // Tasks & Kanban
  getTasks: async (projectId) => {
    const endpoint = projectId ? `/tasks?projectId=${projectId}` : '/tasks';
    const res = await request(endpoint);
    if (res) return res;

    if (projectId) {
      return MOCK_TASKS.filter(t => t.projectId === Number(projectId));
    }
    return MOCK_TASKS;
  },

  updateTaskStatus: async (taskId, newStatus) => {
    const res = await request(`/tasks/${taskId}/status?status=${newStatus}`, { method: 'PATCH' });
    if (res) return res;

    const taskIndex = MOCK_TASKS.findIndex(t => t.id === Number(taskId));
    if (taskIndex !== -1) {
      MOCK_TASKS[taskIndex].status = newStatus;
      return MOCK_TASKS[taskIndex];
    }
    return null;
  },

  createTask: async (taskData) => {
    const res = await request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
    if (res) return res;

    const project = MOCK_PROJECTS.find(p => p.id === Number(taskData.projectId)) || MOCK_PROJECTS[0];
    const assignee = MOCK_USERS.find(u => u.id === Number(taskData.assigneeId)) || MOCK_USERS[2];

    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      status: taskData.status || 'BACKLOG',
      priority: taskData.priority || 'MEDIUM',
      projectId: project.id,
      projectName: project.name,
      assigneeId: assignee.id,
      assigneeName: assignee.fullName,
      assigneeAvatar: assignee.avatarUrl,
      dueDate: taskData.dueDate || new Date().toISOString().split('T')[0],
      estimatedHours: Number(taskData.estimatedHours) || 8,
      commentCount: 0,
      createdAt: new Date().toISOString()
    };
    MOCK_TASKS.unshift(newTask);
    return newTask;
  },

  // Comments
  getComments: async (taskId) => {
    const res = await request(`/comments/task/${taskId}`);
    if (res) return res;
    return MOCK_COMMENTS.filter(c => c.taskId === Number(taskId));
  },

  addComment: async (commentData) => {
    const res = await request('/comments', {
      method: 'POST',
      body: JSON.stringify(commentData)
    });
    if (res) return res;

    const author = MOCK_USERS.find(u => u.id === Number(commentData.authorId)) || MOCK_USERS[2];
    const newComment = {
      id: Date.now(),
      taskId: Number(commentData.taskId),
      authorId: author.id,
      authorName: author.fullName,
      authorAvatar: author.avatarUrl,
      content: commentData.content,
      createdAt: new Date().toISOString()
    };
    MOCK_COMMENTS.unshift(newComment);
    
    // Increment comment count on task
    const task = MOCK_TASKS.find(t => t.id === Number(commentData.taskId));
    if (task) task.commentCount += 1;

    return newComment;
  },

  // Users
  getUsers: async () => {
    const res = await request('/users');
    return res || MOCK_USERS;
  }
};

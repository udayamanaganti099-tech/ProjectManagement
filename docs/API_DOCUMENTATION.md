# Project Management REST API Documentation

**Base URL**: `http://localhost:8080/api/v1`  
**Authentication**: Bearer Token (`Authorization: Bearer <JWT_TOKEN>`)

---

## 🔐 1. Authentication Endpoints

### `POST /auth/login`
Authenticates user and returns JWT token.
- **Request Body**:
  ```json
  {
    "username": "dev_rahul",
    "password": "password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "tokenType": "Bearer",
    "id": 3,
    "username": "dev_rahul",
    "email": "rahul.verma@techcorp.com",
    "fullName": "Rahul Verma",
    "role": "DEVELOPER",
    "designation": "Java Lead Developer",
    "avatarUrl": "https://..."
  }
  ```

---

## 📊 2. Telemetry & Projects Endpoints

### `GET /dashboard/stats`
Returns aggregated dashboard metrics.

### `GET /projects`
Retrieves all enterprise projects with task counts and progress.

### `POST /projects`
Creates a new project.
- **Request Body**:
  ```json
  {
    "projectKey": "FIN-APP",
    "name": "Financial Gateway Service",
    "description": "Payment gateway processing microservices",
    "status": "PLANNING",
    "budget": 120000.00,
    "managerId": 2
  }
  ```

---

## 📋 3. Task Management & Kanban Endpoints

### `GET /tasks?projectId={id}`
Returns tasks for a given project or all tasks.

### `POST /tasks`
Creates a new task.

### `PATCH /tasks/{id}/status?status={STATUS}`
Updates task status (`BACKLOG`, `IN_PROGRESS`, `IN_REVIEW`, `COMPLETED`).

---

## 💬 4. Comment Endpoints

### `GET /comments/task/{taskId}`
Returns discussion thread for a task.

### `POST /comments`
Adds a comment to a task.

import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { Navbar } from './Components/Navbar.jsx';
import { Sidebar } from './Components/Sidebar.jsx';
import { Dashboard } from './Components/Dashboard.jsx';
import { KanbanBoard } from './Components/KanbanBoard.jsx';
import { ProjectList } from './Components/ProjectList.jsx';
import { TeamList } from './Components/TeamList.jsx';
import { TaskModal } from './Components/TaskModal.jsx';
import { NewProjectModal } from './Components/NewProjectModal.jsx';
import { NewTaskModal } from './Components/NewTaskModal.jsx';

import { LoginModal } from './Components/LoginModal.jsx';
import { LoginScreen } from './Components/LoginScreen.jsx';
// CSS is loaded globally via main.jsx

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const [showNewProject, setShowNewProject] = useState(false);
  const [showNewTask, setShowNewTask] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    setActiveTab('kanban');
  };

  // If user is not logged in, display the Login & Sign Up Screen!
  if (!isAuthenticated) {
    return (
      <>
        <LoginScreen />
      </>
    );
  }

  return (
    <div className="app-container">
      {/* Left Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
      />

      {/* Main Content Area */}
      <div className="main-content">
        <Navbar 
          onOpenNewProject={() => setShowNewProject(true)}
          onOpenLogin={() => setShowLoginModal(true)}
        />

        <div className="content-body">
          {activeTab === 'dashboard' && (
            <Dashboard 
              onSelectProject={handleSelectProject}
              onOpenNewProject={() => setShowNewProject(true)}
            />
          )}

          {activeTab === 'kanban' && (
            <KanbanBoard 
              selectedProjectId={selectedProjectId}
              onSelectTask={(task) => setSelectedTask(task)}
              onOpenNewTask={() => setShowNewTask(true)}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectList 
              onSelectProject={handleSelectProject}
              onOpenNewProject={() => setShowNewProject(true)}
            />
          )}

          {activeTab === 'team' && <TeamList />}
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}


      
      {showNewProject && (
        <NewProjectModal 
          onClose={() => setShowNewProject(false)}
          onRefresh={() => setActiveTab(activeTab === 'projects' ? 'projects' : 'dashboard')}
        />
      )}

      {showNewTask && (
        <NewTaskModal 
          onClose={() => setShowNewTask(false)}
          onRefresh={() => setActiveTab('kanban')}
        />
      )}

      {selectedTask && (
        <TaskModal 
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onRefresh={() => {}}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
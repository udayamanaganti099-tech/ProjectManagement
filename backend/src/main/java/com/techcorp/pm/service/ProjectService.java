package com.techcorp.pm.service;

import com.techcorp.pm.dto.DashboardStatsDTO;
import com.techcorp.pm.dto.ProjectDTO;
import com.techcorp.pm.entity.Project;
import com.techcorp.pm.entity.User;
import com.techcorp.pm.enums.ProjectStatus;
import com.techcorp.pm.enums.TaskStatus;
import com.techcorp.pm.exception.ResourceNotFoundException;
import com.techcorp.pm.repository.ProjectRepository;
import com.techcorp.pm.repository.TaskRepository;
import com.techcorp.pm.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TaskRepository taskRepository;

    public ProjectService(ProjectRepository projectRepository, UserRepository userRepository, TaskRepository taskRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
    }

    @Transactional(readOnly = true)
    public List<ProjectDTO> getAllProjects() {
        return projectRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        return convertToDTO(project);
    }

    @Transactional
    public ProjectDTO createProject(ProjectDTO projectDTO) {
        Project project = new Project();
        project.setProjectKey(projectDTO.getProjectKey());
        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        project.setStatus(projectDTO.getStatus() != null ? projectDTO.getStatus() : ProjectStatus.PLANNING);
        project.setBudget(projectDTO.getBudget() != null ? projectDTO.getBudget() : BigDecimal.ZERO);
        project.setStartDate(projectDTO.getStartDate());
        project.setEndDate(projectDTO.getEndDate());

        if (projectDTO.getManagerId() != null) {
            User manager = userRepository.findById(projectDTO.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", projectDTO.getManagerId()));
            project.setManager(manager);
        }

        Project savedProject = projectRepository.save(project);
        return convertToDTO(savedProject);
    }

    @Transactional
    public ProjectDTO updateProject(Long id, ProjectDTO projectDTO) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));

        project.setName(projectDTO.getName());
        project.setDescription(projectDTO.getDescription());
        if (projectDTO.getStatus() != null) project.setStatus(projectDTO.getStatus());
        if (projectDTO.getBudget() != null) project.setBudget(projectDTO.getBudget());
        project.setStartDate(projectDTO.getStartDate());
        project.setEndDate(projectDTO.getEndDate());

        if (projectDTO.getManagerId() != null) {
            User manager = userRepository.findById(projectDTO.getManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("User", "id", projectDTO.getManagerId()));
            project.setManager(manager);
        }

        Project updatedProject = projectRepository.save(project);
        return convertToDTO(updatedProject);
    }

    @Transactional
    public void deleteProject(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Project", "id", id));
        projectRepository.delete(project);
    }

    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        long totalProjects = projectRepository.count();
        long activeProjects = projectRepository.countActiveProjects();
        long totalTasks = taskRepository.count();
        long completedTasks = taskRepository.countByStatus(TaskStatus.COMPLETED);
        long inProgressTasks = taskRepository.countByStatus(TaskStatus.IN_PROGRESS);
        long backlogTasks = taskRepository.countByStatus(TaskStatus.BACKLOG);
        long totalTeamMembers = userRepository.count();

        BigDecimal totalBudget = projectRepository.findAll().stream()
                .map(p -> p.getBudget() != null ? p.getBudget() : BigDecimal.ZERO)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        double completionRate = totalTasks > 0 ? ((double) completedTasks / totalTasks) * 100.0 : 0.0;

        return new DashboardStatsDTO(
                totalProjects, activeProjects, totalTasks, completedTasks,
                inProgressTasks, backlogTasks, totalTeamMembers, totalBudget, Math.round(completionRate * 10.0) / 10.0
        );
    }

    private ProjectDTO convertToDTO(Project project) {
        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setProjectKey(project.getProjectKey());
        dto.setName(project.getName());
        dto.setDescription(project.getDescription());
        dto.setStatus(project.getStatus());
        dto.setBudget(project.getBudget());
        dto.setStartDate(project.getStartDate());
        dto.setEndDate(project.getEndDate());
        dto.setProgress(project.getProgress());

        if (project.getManager() != null) {
            dto.setManagerId(project.getManager().getId());
            dto.setManagerName(project.getManager().getFullName());
        }

        long totalTasks = taskRepository.countTotalTasksByProject(project.getId());
        long completedTasks = taskRepository.countCompletedTasksByProject(project.getId());
        dto.setTotalTasks(totalTasks);
        dto.setCompletedTasks(completedTasks);

        if (totalTasks > 0) {
            int calculatedProgress = (int) Math.round(((double) completedTasks / totalTasks) * 100.0);
            dto.setProgress(calculatedProgress);
        }

        return dto;
    }
}

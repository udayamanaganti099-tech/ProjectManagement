package com.techcorp.pm.repository;

import com.techcorp.pm.entity.Project;
import com.techcorp.pm.enums.ProjectStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByProjectKey(String projectKey);
    List<Project> findByStatus(ProjectStatus status);
    List<Project> findByManagerId(Long managerId);
    
    @Query("SELECT COUNT(p) FROM Project p WHERE p.status = 'IN_PROGRESS'")
    long countActiveProjects();
}

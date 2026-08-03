package com.techcorp.pm.dto;

import java.math.BigDecimal;

public class DashboardStatsDTO {

    private long totalProjects;
    private long activeProjects;
    private long totalTasks;
    private long completedTasks;
    private long inProgressTasks;
    private long backlogTasks;
    private long totalTeamMembers;
    private BigDecimal totalBudget;
    private double overallCompletionRate;

    public DashboardStatsDTO() {}

    public DashboardStatsDTO(long totalProjects, long activeProjects, long totalTasks, long completedTasks, long inProgressTasks, long backlogTasks, long totalTeamMembers, BigDecimal totalBudget, double overallCompletionRate) {
        this.totalProjects = totalProjects;
        this.activeProjects = activeProjects;
        this.totalTasks = totalTasks;
        this.completedTasks = completedTasks;
        this.inProgressTasks = inProgressTasks;
        this.backlogTasks = backlogTasks;
        this.totalTeamMembers = totalTeamMembers;
        this.totalBudget = totalBudget;
        this.overallCompletionRate = overallCompletionRate;
    }

    public long getTotalProjects() { return totalProjects; }
    public void setTotalProjects(long totalProjects) { this.totalProjects = totalProjects; }

    public long getActiveProjects() { return activeProjects; }
    public void setActiveProjects(long activeProjects) { this.activeProjects = activeProjects; }

    public long getTotalTasks() { return totalTasks; }
    public void setTotalTasks(long totalTasks) { this.totalTasks = totalTasks; }

    public long getCompletedTasks() { return completedTasks; }
    public void setCompletedTasks(long completedTasks) { this.completedTasks = completedTasks; }

    public long getInProgressTasks() { return inProgressTasks; }
    public void setInProgressTasks(long inProgressTasks) { this.inProgressTasks = inProgressTasks; }

    public long getBacklogTasks() { return backlogTasks; }
    public void setBacklogTasks(long backlogTasks) { this.backlogTasks = backlogTasks; }

    public long getTotalTeamMembers() { return totalTeamMembers; }
    public void setTotalTeamMembers(long totalTeamMembers) { this.totalTeamMembers = totalTeamMembers; }

    public BigDecimal getTotalBudget() { return totalBudget; }
    public void setTotalBudget(BigDecimal totalBudget) { this.totalBudget = totalBudget; }

    public double getOverallCompletionRate() { return overallCompletionRate; }
    public void setOverallCompletionRate(double overallCompletionRate) { this.overallCompletionRate = overallCompletionRate; }
}

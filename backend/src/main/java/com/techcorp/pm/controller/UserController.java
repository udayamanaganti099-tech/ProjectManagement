package com.techcorp.pm.controller;

import com.techcorp.pm.dto.AuthDTOs.UserDTO;
import com.techcorp.pm.dto.DashboardStatsDTO;
import com.techcorp.pm.service.AuthService;
import com.techcorp.pm.service.ProjectService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@Tag(name = "User & Analytics API", description = "Team directory and executive telemetry metrics")
public class UserController {

    private final AuthService authService;
    private final ProjectService projectService;

    public UserController(AuthService authService, ProjectService projectService) {
        this.authService = authService;
        this.projectService = projectService;
    }

    @GetMapping("/users")
    @Operation(summary = "Get all team members")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(authService.getAllUsers());
    }

    @GetMapping("/dashboard/stats")
    @Operation(summary = "Get executive dashboard statistics", description = "Aggregates project counts, task states, budget, and completion metrics")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(projectService.getDashboardStats());
    }
}

package com.techcorp.pm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ProjectManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProjectManagementApplication.class, args);
        System.out.println("\n==========================================================");
        System.out.println("🚀 Project Management Java Backend Service Started Successfully!");
        System.out.println("🌐 API Context: http://localhost:8080/api/v1");
        System.out.println("📚 Swagger UI: http://localhost:8080/api/v1/swagger-ui.html");
        System.out.println("🗄️  H2 Console: http://localhost:8080/api/v1/h2-console");
        System.out.println("==========================================================\n");
    }
}

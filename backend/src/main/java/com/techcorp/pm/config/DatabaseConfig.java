package com.techcorp.pm.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

    @Value("${DATABASE_URL:}")
    private String databaseUrl;

    @Value("${spring.datasource.username:postgres}")
    private String username;

    @Value("${spring.datasource.password:postgres}")
    private String password;

    @Bean
    public DataSource dataSource() {
        HikariConfig config = new HikariConfig();
        
        if (databaseUrl != null && !databaseUrl.trim().isEmpty()) {
            // Automatically fix the Render URL format!
            if (databaseUrl.startsWith("postgres://")) {
                databaseUrl = databaseUrl.replaceFirst("postgres://", "jdbc:postgresql://");
            }
            config.setJdbcUrl(databaseUrl);
        } else {
            // Local development fallback
            config.setJdbcUrl("jdbc:postgresql://localhost:5432/project_management");
            config.setUsername(username);
            config.setPassword(password);
        }
        
        config.setDriverClassName("org.postgresql.Driver");
        return new HikariDataSource(config);
    }
}

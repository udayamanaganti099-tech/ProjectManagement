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
            if (databaseUrl.startsWith("postgres://")) {
                try {
                    java.net.URI dbUri = new java.net.URI(databaseUrl);
                    String[] userInfo = dbUri.getUserInfo().split(":");
                    String dbUsername = userInfo[0];
                    String dbPassword = userInfo[1];
                    String dbUrl = "jdbc:postgresql://" + dbUri.getHost() + ':' + dbUri.getPort() + dbUri.getPath();
                    
                    config.setJdbcUrl(dbUrl);
                    config.setUsername(dbUsername);
                    config.setPassword(dbPassword);
                } catch (Exception e) {
                    throw new RuntimeException("Failed to parse DATABASE_URL", e);
                }
            } else {
                config.setJdbcUrl(databaseUrl);
                if (username != null && !username.trim().isEmpty()) config.setUsername(username);
                if (password != null && !password.trim().isEmpty()) config.setPassword(password);
            }
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

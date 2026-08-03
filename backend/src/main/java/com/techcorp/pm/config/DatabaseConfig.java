package com.techcorp.pm.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.net.URI;

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
            String rawUrl = databaseUrl.trim();

            // Strip jdbc: prefix if user added it manually
            if (rawUrl.startsWith("jdbc:")) {
                rawUrl = rawUrl.substring(5);
            }

            // Normalize protocol for URI parser
            if (rawUrl.startsWith("postgresql://")) {
                rawUrl = "postgres://" + rawUrl.substring(13);
            }

            if (rawUrl.startsWith("postgres://")) {
                try {
                    URI dbUri = new URI(rawUrl);
                    String dbHost = dbUri.getHost();
                    int dbPort = dbUri.getPort() == -1 ? 5432 : dbUri.getPort();
                    String dbPath = dbUri.getPath();

                    if (dbUri.getUserInfo() != null) {
                        String[] userInfo = dbUri.getUserInfo().split(":");
                        config.setUsername(userInfo[0]);
                        if (userInfo.length > 1) {
                            config.setPassword(userInfo[1]);
                        }
                    } else {
                        config.setUsername(username);
                        config.setPassword(password);
                    }

                    String jdbcUrl = "jdbc:postgresql://" + dbHost + ":" + dbPort + dbPath;
                    config.setJdbcUrl(jdbcUrl);
                } catch (Exception e) {
                    throw new RuntimeException("Failed to parse DATABASE_URL: " + databaseUrl, e);
                }
            } else {
                config.setJdbcUrl(rawUrl.startsWith("jdbc:") ? rawUrl : "jdbc:postgresql://" + rawUrl);
                config.setUsername(username);
                config.setPassword(password);
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

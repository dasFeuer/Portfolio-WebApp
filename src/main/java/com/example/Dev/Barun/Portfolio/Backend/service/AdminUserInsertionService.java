package com.example.Dev.Barun.Portfolio.Backend.service;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class AdminUserInsertionService {

    private static final Logger logger = LoggerFactory.getLogger(AdminUserInsertionService.class);

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Static list of users to be inserted
    private final List<Map<String, String>> usersToInsert;

    public AdminUserInsertionService() {
        // Initialize usersToInsert with environment variables
        usersToInsert = Arrays.asList(
                Map.of("username", System.getenv("ADMIN_USERNAME"), "password", System.getenv("ADMIN_PASSWORD"), "role", "ROLE_ADMIN"),
                Map.of("username", System.getenv("USER1_USERNAME"), "password", System.getenv("USER1_PASSWORD"), "role", "ROLE_USER"),
                Map.of("username", System.getenv("USER2_USERNAME"), "password", System.getenv("USER2_PASSWORD"), "role", "ROLE_USER")
        );
    }

    @PostConstruct
    public void insertUsers() {
        usersToInsert.forEach(user -> {
            String username = user.get("username");
            String rawPassword = user.get("password");
            String role = user.get("role");

            String encodedPassword = passwordEncoder.encode(rawPassword);

            // Check if the user exists
            Integer count = jdbcTemplate.queryForObject(
                    "SELECT COUNT(*) FROM users WHERE username = ?", Integer.class, username);

            if (count != null && count > 0) {
                logger.info("User {} already exists. Skipping insertion.", username);
            } else {
                // Insert the user
                jdbcTemplate.update(
                        "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
                        username, encodedPassword, role);
                logger.info("User {} inserted successfully with role {}", username, role);
            }
        });
    }
}

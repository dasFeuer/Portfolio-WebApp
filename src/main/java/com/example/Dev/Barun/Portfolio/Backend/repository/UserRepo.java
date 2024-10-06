package com.example.Dev.Barun.Portfolio.Backend.repository;

import com.example.Dev.Barun.Portfolio.Backend.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository <Users, Integer> {
  Users findByUsername(String username);
}

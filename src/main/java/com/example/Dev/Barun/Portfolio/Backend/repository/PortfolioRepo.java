package com.example.Dev.Barun.Portfolio.Backend.repository;

import com.example.Dev.Barun.Portfolio.Backend.model.Portfolio;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepo extends JpaRepository <Portfolio, Long> {

}

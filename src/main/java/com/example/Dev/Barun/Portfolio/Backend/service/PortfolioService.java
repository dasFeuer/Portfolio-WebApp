package com.example.Dev.Barun.Portfolio.Backend.service;

import com.example.Dev.Barun.Portfolio.Backend.repository.PortfolioRepo;
import com.example.Dev.Barun.Portfolio.Backend.model.Portfolio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepo portfolioRepo;

    public List<Portfolio> getAllData() {
        return portfolioRepo.findAll();
    }

    public Portfolio saveData(Portfolio portfolio) {
        return portfolioRepo.save(portfolio);
    }

    public Portfolio getPortfolioById(Long id) {
        return portfolioRepo.findById(id).orElse(null);
    }

    public void deleteData(Long id) {
        portfolioRepo.deleteById(id);
    }
}

package com.example.Dev.Barun.Portfolio.Backend.service;

import com.example.Dev.Barun.Portfolio.Backend.model.UserPrincipal;
import com.example.Dev.Barun.Portfolio.Backend.model.Users;
import com.example.Dev.Barun.Portfolio.Backend.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("Attempting to load user: " + username);

        // Fetch user by username
        Users user = userRepo.findByUsername(username);

        // Check if user is null
        if (user == null) {
            System.out.println("User Not Found with username: " + username);
            throw new UsernameNotFoundException("User not found");
        }

        // Return UserPrincipal containing user details
        return new UserPrincipal(user);
    }
}

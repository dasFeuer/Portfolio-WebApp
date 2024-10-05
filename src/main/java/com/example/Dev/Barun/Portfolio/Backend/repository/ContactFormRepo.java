package com.example.Dev.Barun.Portfolio.Backend.repository;

import com.example.Dev.Barun.Portfolio.Backend.controller.ContactForm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactFormRepo extends JpaRepository<ContactForm, Long> {

}

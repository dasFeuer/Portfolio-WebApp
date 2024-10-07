package com.example.Dev.Barun.Portfolio.Backend.controller;

import com.example.Dev.Barun.Portfolio.Backend.model.Portfolio;
import com.example.Dev.Barun.Portfolio.Backend.repository.ContactFormRepo;
import com.example.Dev.Barun.Portfolio.Backend.service.AdminUserInsertionService;
import com.example.Dev.Barun.Portfolio.Backend.service.EmailService;
import com.example.Dev.Barun.Portfolio.Backend.service.PortfolioService;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@Validated
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @Autowired
    private ContactFormRepo contactFormRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AdminUserInsertionService adminUserInsertionService;

    private static final Logger logger = LoggerFactory.getLogger(PortfolioController.class);

    @GetMapping("/")
    public String greet(HttpServletRequest request) {
        return "Hi there! Session ID: " + request.getSession().getId();
    }

    @GetMapping("/csrf-token")
    public CsrfToken getCsrfToken(HttpServletRequest request) {
        return (CsrfToken) request.getAttribute("_csrf");
    }

    @GetMapping("/projects")
    public List<Portfolio> getAllProjects() {
        return portfolioService.getAllData();
    }

    @PostMapping("/projects")
    public Portfolio createPortfolio(@RequestBody Portfolio portfolio) {
        return portfolioService.saveData(portfolio);
    }

    @GetMapping("/projects/{id}")
    public Portfolio getProjectById(@PathVariable Long id) {
        return portfolioService.getPortfolioById(id);
    }

    @PostMapping("/contact")
    public String sendContactMessage(@RequestBody ContactForm contactForm) {
        contactFormRepo.save(contactForm);
        String subject = "New Contact Form Submission";
        String body = "Name: " + contactForm.getName() + "\n" +
                "Email: " + contactForm.getEmail() + "\n" +
                "Message: " + contactForm.getMessage();

        emailService.sendEmail("barunpanthisharma11@gmail.com", subject, body);
        return "Message received!";
    }

    @GetMapping("/contact-submissions")
    public List<ContactForm> getAllContactSubmissions() {
        return contactFormRepo.findAll();
    }

    @GetMapping("/export-submissions")
    public ResponseEntity<InputStreamResource> exportToCSV() {
        List<ContactForm> submissions = contactFormRepo.findAll();
        StringBuilder csvBuilder = new StringBuilder("Name,Email,Message\n");

        for (ContactForm submission : submissions) {
            csvBuilder.append(submission.getName()).append(",")
                    .append(submission.getEmail()).append(",")
                    .append(submission.getMessage()).append("\n");
        }

        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(csvBuilder.toString().getBytes());
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=contact_submissions.csv");

        return ResponseEntity.ok()
                .headers(headers)
                .body(new InputStreamResource(byteArrayInputStream));
    }

    @GetMapping("/export-submission/{id}")
    public ResponseEntity<InputStreamResource> exportSingleSubmissionToCSV(@PathVariable Long id) {
        ContactForm contactForm = contactFormRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact form not found with ID: " + id));

        String csvData = "Name,Email,Message\n" + contactForm.getName() + "," + contactForm.getEmail() + "," + contactForm.getMessage() + "\n";
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(csvData.getBytes()));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=submission_" + id + ".csv")
                .body(resource);
    }

    @DeleteMapping("/projects/{id}")
    public void deletePortfolio(@PathVariable Long id) {
        portfolioService.deleteData(id);
    }

    @DeleteMapping("/contact-submissions/{id}")
    public ResponseEntity<String> deleteContactSubmission(@PathVariable Long id) {
        ContactForm contactForm = contactFormRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact form not found with ID: " + id));
        contactFormRepo.delete(contactForm);
        return ResponseEntity.ok("Submission deleted successfully");
    }
}

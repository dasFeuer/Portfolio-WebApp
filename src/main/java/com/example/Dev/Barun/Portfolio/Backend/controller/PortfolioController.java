package com.example.Dev.Barun.Portfolio.Backend.controller;

import com.example.Dev.Barun.Portfolio.Backend.model.Portfolio;
import com.example.Dev.Barun.Portfolio.Backend.repository.ContactFormRepo;
import com.example.Dev.Barun.Portfolio.Backend.service.EmailService;
import com.example.Dev.Barun.Portfolio.Backend.service.PortfolioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", allowCredentials = "true")
@Validated
public class PortfolioController {

    @Autowired
    private PortfolioService portfolioService;

    @Autowired
    private ContactFormRepo contactFormRepo;

    @Autowired
    private EmailService emailService;

    private static final Logger logger = LoggerFactory.getLogger(PortfolioController.class);


    @GetMapping("/projects")
    public List<Portfolio> getAllProjects() {
        try {
            return portfolioService.getAllData();  // Assuming all data represents projects
        } catch (Exception e) {
            throw new RuntimeException("Error fetching projects", e);
        }
    }

    @PostMapping("/projects")
    public Portfolio createPortfolio(@RequestBody Portfolio portfolio) {
        try {
            return portfolioService.saveData(portfolio);
        } catch (Exception e) {
            throw new RuntimeException("Error creating project", e);
        }
    }

    @GetMapping("/projects/{id}")
    public Portfolio getProjectById(@PathVariable Long id) {
        try {
            return portfolioService.getPortfolioById(id);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching project by ID", e);
        }
    }

    @PostMapping("/contact")

    public String sendContactMessage(@RequestBody ContactForm contactForm) {
        try {
            // Save contact form data to Database
            contactFormRepo.save(contactForm);

            // Send notification to the site owner
            String subject = "New Contact Form Submission";
            String body = "Name: " + contactForm.getName() + "\n" +
                    "Email: " + contactForm.getEmail() + "\n" +
                    "Message: " + contactForm.getMessage();

            emailService.sendEmail("barunpanthisharma11@gmail.com", subject, body);

            return "Message received!";
        } catch (Exception e) {
            logger.error("Error while submitting contact form", e);
            return "Error while submitting form";
        }

    }

    @GetMapping("/contact-submissions")
    public List<ContactForm> getAllContactSubmissions() {
        return contactFormRepo.findAll(); // Directly return the list
    }




    @GetMapping("/export-submissions")
    public ResponseEntity<InputStreamResource> exportToCSV() {
        // Fetch all contact submissions from the repository
        List<ContactForm> submissions = contactFormRepo.findAll(); // Fetch all submissions

        // Build the CSV content
        StringBuilder csvBuilder = new StringBuilder();
        csvBuilder.append("Name,Email,Message\n");

        for (ContactForm submission : submissions) {
            csvBuilder.append(submission.getName()).append(",")
                    .append(submission.getEmail()).append(",")
                    .append(submission.getMessage()).append("\n");
        }

        // Convert the CSV string into a ByteArrayInputStream
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(csvBuilder.toString().getBytes());

        // Set headers for file download
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=contact_submissions.csv");

        // Return the CSV data as a downloadable file
        return ResponseEntity.ok()
                .headers(headers)
                .body(new InputStreamResource(byteArrayInputStream));
    }

    @GetMapping("/export-submission/{id}")
    public ResponseEntity<InputStreamResource> exportSingleSubmissionToCSV(@PathVariable Long id) {
        // Fetch the contact submission from the repository
        ContactForm contactForm = contactFormRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Contact form not found with ID: " + id));

        // Prepare the CSV data
        String csvData = "Name,Email,Message\n" +
                contactForm.getName() + "," +
                contactForm.getEmail() + "," +
                contactForm.getMessage() + "\n";

        // Create the InputStreamResource for the CSV
        InputStreamResource resource = new InputStreamResource(new ByteArrayInputStream(csvData.getBytes()));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=submission_" + id + ".csv")
                .body(resource);
    }


    @DeleteMapping("/projects/{id}")
    public void deletePortfolio(@PathVariable Long id) {
        try {
            portfolioService.deleteData(id);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting project", e);
        }
    }
}

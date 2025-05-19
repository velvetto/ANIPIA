package com.anipia.controller;

import com.anipia.model.ContactForm;
import com.anipia.service.ContactFormService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
public class ContactFormController {

    private final ContactFormService contactFormService;

    @Autowired
    public ContactFormController(ContactFormService contactFormService) {
        this.contactFormService = contactFormService;
    }

    // Endpoint pro prijmuti dat formulare a jejich zpracovani
    /* 
    curl -X POST http://localhost:8080/contact/submit ^ -H "Content-Type: application/json" ^
    -d "{\"name\": \"Uzivatel\", \"email\": \"uzivatel@test\", \"message\": \"Testovaci zprava z formulare.\"}"
    */
    @PostMapping("/submit")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> submitContactForm(@RequestBody ContactForm contactForm) {
        try {
            contactFormService.saveContactForm(contactForm);
            return new ResponseEntity<>("Form submitted successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error occurred while processing your request", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //Endpoint pro testovani, ze backend bezi spravne
    /*
    curl "http://localhost:8080/contact/ping"
    */
    @GetMapping("/ping")
    public ResponseEntity<String> ping() {
        return ResponseEntity.ok("Server is alive!");
    }

    //Endpoint pro vypis vsech zprav od urciteho uzivatele podle emailu
    /*
    curl "http://localhost:8080/contact/by-email?email=uzivatel@test" 
    */
    @GetMapping("/by-email")
    public ResponseEntity<List<ContactForm>> getFormsByEmail(@RequestParam String email) {
        List<ContactForm> forms = contactFormService.getFormsByEmail(email);
        if (forms.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(forms);
    }

    //Endpoint pro odstraneni vsech zprav z databaze podle emailu 
    /* 
    curl -X DELETE "http://localhost:8080/contact/deleteByEmail/uzivatel@test"
    */
    @DeleteMapping("/deleteByEmail/{email}")
    public ResponseEntity<String> deleteByEmail(@PathVariable String email) {
    boolean deleted = contactFormService.deleteByEmail(email);
    if (deleted) {
        return ResponseEntity.ok("Contact form with email " + email + " deleted successfully.");
    } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No contact form found with email " + email);
    }
}
}

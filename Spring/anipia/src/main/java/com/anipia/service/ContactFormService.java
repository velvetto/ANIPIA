package com.anipia.service;

import com.anipia.model.ContactForm;
import com.anipia.repository.ContactFormRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class ContactFormService {

    private final ContactFormRepository contactFormRepository;
    private final JavaMailSender javaMailSender;

    @Autowired
    public ContactFormService(ContactFormRepository contactFormRepository, JavaMailSender javaMailSender) {
        this.contactFormRepository = contactFormRepository;
        this.javaMailSender = javaMailSender;
    }

    public void saveContactForm(ContactForm contactForm) {
        // Ulozeni formulare do databaze
        contactFormRepository.save(contactForm);

        sendEmail(contactForm);
    }

    @Async
    public void sendEmail(ContactForm form) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(form.getEmail());
        message.setTo("hotel.anipia@gmail.com"); 
        message.setSubject("Nová zpráva z kontaktního formuláře");
        message.setText(
            "Jméno: " + form.getName() + "\n" +
            "Email: " + form.getEmail() + "\n" +
            "Zpráva:\n" + form.getMessage()
        );

        javaMailSender.send(message);
    }

    public List<ContactForm> getFormsByEmail(String email) {
    List<ContactForm> forms = contactFormRepository.findByEmail(email);
    forms.forEach(form -> System.out.println(form));
    return forms;
    }

    public boolean deleteByEmail(String email) {
    var forms = contactFormRepository.findByEmail(email);
    if (forms.isEmpty()) {
        return false;
    }

    // Smaze vsechny nalezene formulare s timto emailem
    contactFormRepository.deleteAll(forms);
        return true;
    }

    //Vypise vsechny zpravy
    public List<ContactForm> getAllForms() {
        return contactFormRepository.findAll();
    }
}

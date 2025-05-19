package com.anipia.repository;

import com.anipia.model.ContactForm;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactFormRepository extends JpaRepository<ContactForm, Long> {
    List<ContactForm> findByEmail(String email);
}

package com.anipia.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.anipia.model.Zakaznik;
import com.anipia.repository.ZakaznikRepository;

@Service
public class ZakaznikService {

    @Autowired
    private ZakaznikRepository zakaznikRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public Zakaznik register(Zakaznik zakaznik) throws Exception {
        if (zakaznikRepository.findByEmail(zakaznik.getEmail()).isPresent()) {
            throw new Exception("Email již existuje");
        }

        // Hash hesla
        zakaznik.setHeslo(passwordEncoder.encode(zakaznik.getHeslo()));

        return zakaznikRepository.save(zakaznik);
    }

    public Zakaznik login(String email, String heslo) throws Exception {
        Optional<Zakaznik> opt = zakaznikRepository.findByEmail(email);
        if (opt.isEmpty()) {
            throw new Exception("Uživatel s tímto emailem neexistuje");
        }
        Zakaznik zakaznik = opt.get();

        // Porovnani hesel
        if (!passwordEncoder.matches(heslo, zakaznik.getHeslo())) {
            throw new Exception("Nesprávné heslo");
        }

        return zakaznik;
    }
}


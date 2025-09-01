package com.anipia.controller;

import com.anipia.dto.LoginRequest;
import com.anipia.dto.LoginResponse;
import com.anipia.dto.RegisterRequest;
import com.anipia.model.Zakaznik;
import com.anipia.service.ZakaznikService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/zakaznici")
@RequiredArgsConstructor
public class ZakaznikController {

    private final ZakaznikService zakaznikService;

    @PostMapping("/signup")
    public Zakaznik signup(@RequestBody RegisterRequest req) throws Exception {
        Zakaznik zakaznik = new Zakaznik();
        zakaznik.setJmeno(req.getJmeno());
        zakaznik.setPrijmeni(req.getPrijmeni());
        zakaznik.setTelefon(req.getTelefon());
        zakaznik.setEmail(req.getEmail());
        zakaznik.setHeslo(req.getHeslo());

        return zakaznikService.register(zakaznik);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest req) throws Exception {
    Zakaznik zakaznik = zakaznikService.login(req.getEmail(), req.getHeslo());
    return new LoginResponse("Přihlášení úspěšné", zakaznik.getIdZakaznici(), zakaznik.getJmeno(), zakaznik.getPrijmeni());
}
}


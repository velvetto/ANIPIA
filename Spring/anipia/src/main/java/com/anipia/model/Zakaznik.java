package com.anipia.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Zakaznici")
public class Zakaznik {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idZakaznici;

    @Column(nullable = false)
    private String jmeno;

    @Column(nullable = false)
    private String prijmeni;

    private String telefon;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String heslo;  // uložíme hash hesla

    // Gettery a settery
    public Long getIdZakaznici() { return idZakaznici; }
    public void setIdZakaznici(Long idZakaznici) { this.idZakaznici = idZakaznici; }

    public String getJmeno() { return jmeno; }
    public void setJmeno(String jmeno) { this.jmeno = jmeno; }

    public String getPrijmeni() { return prijmeni; }
    public void setPrijmeni(String prijmeni) { this.prijmeni = prijmeni; }

    public String getTelefon() { return telefon; }
    public void setTelefon(String telefon) { this.telefon = telefon; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getHeslo() { return heslo; }
    public void setHeslo(String heslo) { this.heslo = heslo; }
}


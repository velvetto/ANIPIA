package com.anipia.model;

import jakarta.persistence.*;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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
    private String heslo;  

    @OneToMany(mappedBy = "zakaznik", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnoreProperties("zakaznik")
    private List<Zvire> zvirata;

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

    public List<Zvire> getZvirata() { return zvirata; }
    public void setZvirata(List<Zvire> zvirata) { this.zvirata = zvirata; }
}

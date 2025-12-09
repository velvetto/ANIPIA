package com.anipia.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
@Table(name = "Zvirata")
public class Zvire {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_ZVIRATA")
    private Long idZvirata;

    @Column(name = "JMENO", nullable = false)
    private String jmeno;

    @Column(name = "DRUH", nullable = false)
    private String druh;

    @Column(name = "PLEMENO")
    private String plemeno;

    @Column(name = "VEK")
    private Integer vek;

<<<<<<< HEAD
    @Column(name = "ZDRAVOTNI_STAV") 
=======
    @Column(name = "ZDRAVOTNI_STAV")   // používáme JEDINÝ správný sloupec
>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36
    private String zdravotniStav;

    @Column(name = "POZNAMKA")
    private String poznamka;

    @Column(name = "IMAGE_URL")
    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ZAKAZNIK_ID", nullable = false)
<<<<<<< HEAD
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
=======
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) // přidat
>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36
    private Zakaznik zakaznik;

    // Gettery a settery
    public Long getIdZvirata() { return idZvirata; }
    public void setIdZvirata(Long idZvirata) { this.idZvirata = idZvirata; }

    public String getJmeno() { return jmeno; }
    public void setJmeno(String jmeno) { this.jmeno = jmeno; }

    public String getDruh() { return druh; }
    public void setDruh(String druh) { this.druh = druh; }

    public String getPlemeno() { return plemeno; }
    public void setPlemeno(String plemeno) { this.plemeno = plemeno; }

    public Integer getVek() { return vek; }
    public void setVek(Integer vek) { this.vek = vek; }

    public String getZdravotniStav() { return zdravotniStav; }
    public void setZdravotniStav(String zdravotniStav) { this.zdravotniStav = zdravotniStav; }

    public String getPoznamka() { return poznamka; }
    public void setPoznamka(String poznamka) { this.poznamka = poznamka; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public Zakaznik getZakaznik() { return zakaznik; }
    public void setZakaznik(Zakaznik zakaznik) { this.zakaznik = zakaznik; }
}

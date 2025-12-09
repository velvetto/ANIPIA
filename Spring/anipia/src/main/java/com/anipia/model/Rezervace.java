package com.anipia.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
public class Rezervace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long zakaznikId;
    private Long petId;
    private Long roomId;

    private LocalDate datumOd;
    private LocalDate datumDo;

    private Double celkovaCena;

    @Column(length = 500)
    private String poznamka;
}

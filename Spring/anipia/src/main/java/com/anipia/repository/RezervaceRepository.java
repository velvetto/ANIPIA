package com.anipia.repository;

import com.anipia.model.Rezervace;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RezervaceRepository extends JpaRepository<Rezervace, Long> {
    List<Rezervace> findByZakaznikId(Long zakaznikId);
}

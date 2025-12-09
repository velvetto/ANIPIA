package com.anipia.repository;

import com.anipia.model.Zvire;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ZvireRepository extends JpaRepository<Zvire, Long> {

    @Query("SELECT z FROM Zvire z WHERE z.zakaznik.idZakaznici = :zakaznikId")
    List<Zvire> findByZakaznikId(@Param("zakaznikId") Long zakaznikId);
}

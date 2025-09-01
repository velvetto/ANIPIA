package com.anipia.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.anipia.model.Zakaznik;

public interface ZakaznikRepository extends JpaRepository<Zakaznik, Long> {
    Optional<Zakaznik> findByEmail(String email);
}

package com.anipia.service;

import com.anipia.model.Rezervace;
import com.anipia.repository.RezervaceRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class RezervaceService {
    private final RezervaceRepository repo;

    public RezervaceService(RezervaceRepository repo) {
        this.repo = repo;
    }

    public Rezervace addRezervace(Rezervace r) {
        return repo.save(r);
    }

    public List<Rezervace> getByUser(Long zakaznikId) {
        return repo.findByZakaznikId(zakaznikId);
    }

    public void deleteRezervace(Long id) {
        repo.deleteById(id);
    }
}

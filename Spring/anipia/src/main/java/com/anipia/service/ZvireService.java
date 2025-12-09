package com.anipia.service;

import com.anipia.model.Zvire;
import com.anipia.model.Zakaznik;
import com.anipia.repository.ZvireRepository;
import com.anipia.repository.ZakaznikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ZvireService {

    @Autowired
    private ZvireRepository zvireRepository;

    @Autowired
    private ZakaznikRepository zakaznikRepository;

    public List<Zvire> getZvirataByZakaznikId(Long zakaznikId) {
        return zvireRepository.findByZakaznikId(zakaznikId);
    }

    public Zvire addZvire(Long zakaznikId, Zvire zvire) throws Exception {
    Zakaznik zakaznik = zakaznikRepository.findById(zakaznikId)
            .orElseThrow(() -> new Exception("Zakaznik not found"));
    zvire.setZakaznik(zakaznik);
    return zvireRepository.save(zvire);
}
}

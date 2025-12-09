package com.anipia.controller;

import com.anipia.model.Rezervace;
import com.anipia.service.RezervaceService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/rezervace")
<<<<<<< HEAD
@CrossOrigin(origins = "http://localhost:5500") 
=======
@CrossOrigin(origins = "http://localhost:5500") // přizpůsob dle portu frontendu
>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36
public class RezervaceController {

    private final RezervaceService service;

    public RezervaceController(RezervaceService service) {
        this.service = service;
    }

    @PostMapping("/add")
    public Rezervace addRezervace(@RequestBody Rezervace rezervace) {
        return service.addRezervace(rezervace);
    }

    @GetMapping("/by-user")
    public List<Rezervace> getByUser(@RequestParam Long zakaznikId) {
        return service.getByUser(zakaznikId);
    }

    @DeleteMapping("/{id}")
    public void deleteRezervace(@PathVariable Long id) {
        service.deleteRezervace(id);
    }
}

package com.anipia.controller;

import com.anipia.model.Zvire;
import com.anipia.repository.ZvireRepository;
import com.anipia.service.ZvireService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/zvirata")
public class ZvireController {

    @Autowired
    private ZvireService zvireService;

    @GetMapping("/by-user")
    public ResponseEntity<List<Zvire>> getZvirataByUser(@RequestParam Long zakaznikId) {
        try {
            List<Zvire> zvirata = zvireService.getZvirataByZakaznikId(zakaznikId);
            return ResponseEntity.ok(zvirata);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/add")
    public ResponseEntity<Zvire> addZvire(@RequestParam Long zakaznikId, @RequestBody Zvire zvire) {
        try {
            Zvire newZvire = zvireService.addZvire(zakaznikId, zvire);
            return ResponseEntity.ok(newZvire);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private final ZvireRepository zvireRepository;

    @Autowired
    public ZvireController(ZvireRepository zvireRepository) {
        this.zvireRepository = zvireRepository;
    }

    @PostMapping("/upload-image/{id}")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            Optional<Zvire> optZvire = zvireRepository.findById(id);
            if (optZvire.isEmpty()) {
                return ResponseEntity.badRequest().body("Zvire nenalezeno");
            }

            Zvire zvire = optZvire.get();

<<<<<<< HEAD
=======
            // Uložíme obrázek do složky (např. /uploads)
>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36
            String uploadDir = "uploads/";
            Files.createDirectories(Paths.get(uploadDir));
            String fileName = id + "_" + file.getOriginalFilename();
            Path path = Paths.get(uploadDir + fileName);
            Files.write(path, file.getBytes());

<<<<<<< HEAD
=======
            // Nastavíme cestu do DB
>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36
            zvire.setImageUrl("/uploads/" + fileName);
            zvireRepository.save(zvire);

            return ResponseEntity.ok(zvire);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Chyba při nahrávání obrázku: " + e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateZvire(@PathVariable Long id, @RequestBody Zvire updatedZvire) {
    Optional<Zvire> optZvire = zvireRepository.findById(id);
    if (optZvire.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Zvire nenalezeno");
    }

    Zvire existingZvire = optZvire.get();
    existingZvire.setJmeno(updatedZvire.getJmeno());
    existingZvire.setDruh(updatedZvire.getDruh());
    existingZvire.setPlemeno(updatedZvire.getPlemeno());
    existingZvire.setVek(updatedZvire.getVek());
    existingZvire.setZdravotniStav(updatedZvire.getZdravotniStav());
    existingZvire.setPoznamka(updatedZvire.getPoznamka());
<<<<<<< HEAD
=======
    // imageUrl necháme beze změny (obrázek se nahrává zvlášť)
>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36

    zvireRepository.save(existingZvire);
    return ResponseEntity.ok(existingZvire);

    
}

// DELETE mazlíčka podle ID
@DeleteMapping("/delete/{id}")
public ResponseEntity<?> deleteZvire(@PathVariable Long id) {
    Optional<Zvire> optZvire = zvireRepository.findById(id);
    if (optZvire.isEmpty()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Zvire nenalezeno");
    }

    try {
        zvireRepository.deleteById(id);
        return ResponseEntity.ok("Zvire bylo úspěšně smazáno");
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                             .body("Chyba při mazání: " + e.getMessage());
    }
}

}
<<<<<<< HEAD
=======


>>>>>>> ad13098284dc6165a63b79bddd17c20d47609d36

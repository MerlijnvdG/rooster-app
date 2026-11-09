package com.example.rooster.controller;

import com.example.rooster.entity.Location;
import com.example.rooster.repository.LocationRepository;
import com.example.rooster.repository.ShiftRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationRepository locationRepo;
    private final ShiftRepository shiftRepo;

    public LocationController(LocationRepository locationRepo, ShiftRepository shiftRepo) {
        this.locationRepo = locationRepo;
        this.shiftRepo = shiftRepo;
    }

    @GetMapping
    public List<Location> getAll() {
        return locationRepo.findAll(Sort.by("name"));
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Map<String, String> body) {
        String name = clean(body.get("name"));
        if (name == null) return ResponseEntity.badRequest().body("Naam is verplicht");
        if (locationRepo.findByName(name).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Er is al een filiaal met deze naam");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(locationRepo.save(new Location(name)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> rename(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String name = clean(body.get("name"));
        if (name == null) return ResponseEntity.badRequest().body("Naam is verplicht");

        var location = locationRepo.findById(id).orElse(null);
        if (location == null) return ResponseEntity.notFound().build();

        var existing = locationRepo.findByName(name);
        if (existing.isPresent() && !existing.get().getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Er is al een filiaal met deze naam");
        }
        location.setName(name);
        return ResponseEntity.ok(locationRepo.save(location));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!locationRepo.existsById(id)) return ResponseEntity.notFound().build();
        if (shiftRepo.existsByLocationId(id)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Dit filiaal heeft nog diensten en kan niet verwijderd worden");
        }
        locationRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private String clean(String name) {
        if (name == null || name.isBlank()) return null;
        return name.trim();
    }
}

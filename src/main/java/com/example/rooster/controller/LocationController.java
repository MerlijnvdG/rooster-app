package com.example.rooster.controller;

import com.example.rooster.entity.Location;
import com.example.rooster.repository.LocationRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/locations")
public class LocationController {

    private final LocationRepository locationRepo;

    public LocationController(LocationRepository locationRepo) {
        this.locationRepo = locationRepo;
    }

    @GetMapping
    public ResponseEntity<List<Location>> getAll() {
        return ResponseEntity.ok(locationRepo.findAll());
    }
}

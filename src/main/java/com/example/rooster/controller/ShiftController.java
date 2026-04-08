package com.example.rooster.controller;

import com.example.rooster.dto.MonthlySummaryEntry;
import com.example.rooster.dto.ShiftRequest;
import com.example.rooster.dto.ShiftResponse;
import com.example.rooster.entity.User;
import com.example.rooster.repository.UserRepository;
import com.example.rooster.service.ShiftService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {

    private final ShiftService shiftService;
    private final UserRepository userRepo;

    public ShiftController(ShiftService shiftService, UserRepository userRepo) {
        this.shiftService = shiftService;
        this.userRepo = userRepo;
    }

    @GetMapping("/my")
    public ResponseEntity<List<ShiftResponse>> myShifts(
        @AuthenticationPrincipal UserDetails principal,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        User user = userRepo.findByUsername(principal.getUsername()).orElseThrow();
        return ResponseEntity.ok(shiftService.getShiftsForEmployee(user.getId(), from, to));
    }

    @GetMapping("/team/{locationId}")
    public ResponseEntity<List<ShiftResponse>> teamShifts(
        @PathVariable Long locationId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return ResponseEntity.ok(shiftService.getShiftsForLocation(locationId, from, to));
    }

    @GetMapping("/location/{locationId}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<ShiftResponse>> byLocation(
        @PathVariable Long locationId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return ResponseEntity.ok(shiftService.getShiftsForLocation(locationId, from, to));
    }

    @PostMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<ShiftResponse> create(@Valid @RequestBody ShiftRequest request) {
        return ResponseEntity.ok(shiftService.createShift(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<ShiftResponse> update(@PathVariable Long id, @Valid @RequestBody ShiftRequest request) {
        return ResponseEntity.ok(shiftService.updateShift(id, request));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        shiftService.deleteShift(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<ShiftResponse>> byEmployee(
        @PathVariable Long employeeId,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate from,
        @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate to
    ) {
        return ResponseEntity.ok(shiftService.getShiftsForEmployee(employeeId, from, to));
    }

    @GetMapping("/monthly-summary")
    @PreAuthorize("hasRole('EMPLOYER')")
    public ResponseEntity<List<MonthlySummaryEntry>> monthlySummary(
        @RequestParam int year,
        @RequestParam int month
    ) {
        return ResponseEntity.ok(shiftService.getMonthlySummary(year, month));
    }
}

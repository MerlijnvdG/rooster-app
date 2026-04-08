package com.example.rooster.service;

import com.example.rooster.dto.*;
import com.example.rooster.entity.Location;
import com.example.rooster.entity.Shift;
import com.example.rooster.entity.User;
import com.example.rooster.repository.LocationRepository;
import com.example.rooster.repository.ShiftRepository;
import com.example.rooster.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final LocationRepository locationRepo;
    private final ShiftRepository shiftRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepo, LocationRepository locationRepo,
                       ShiftRepository shiftRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.locationRepo = locationRepo;
        this.shiftRepo = shiftRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserResponse> getAllUsers() {
        return userRepo.findAll().stream().map(this::toResponse).toList();
    }

    public List<UserResponse> getAllEmployees() {
        return userRepo.findByRole(User.Role.EMPLOYEE)
            .stream().map(this::toResponse).toList();
    }

    public UserResponse createUser(CreateUserRequest req) {
        String fullName = req.fullName().trim();
        String username = fullName.toLowerCase().replace("\\s+", ".");

        String base = username;
        int suffix = 1;
        while (userRepo.findByUsername(username).isPresent()) {
            username = base + suffix++;
        }

        Location location = null;
        if (req.locationId() != null) {
            location = locationRepo.findById(req.locationId())
                .orElseThrow(() -> new IllegalArgumentException("Locatie niet gevonden."));
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(req.password()));
        user.setFullName(fullName);
        user.setRole(User.Role.valueOf(req.role()));
        user.setLocation(location);

        return toResponse(userRepo.save(user));
    }

    public UserResponse updateUser(Long id, UpdateUserRequest req) {
        User user = userRepo.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Gebruiker niet gevonden."));

        Location location = null;
        if (req.locationId() != null) {
            location = locationRepo.findById(req.locationId())
                .orElseThrow(() -> new IllegalArgumentException("Locatie niet gevonden."));
        }

        user.setFullName(req.fullName());
        user.setRole(User.Role.valueOf(req.role()));
        user.setLocation(location);
        if (req.password() != null && !req.password().isBlank()) {
            user.setPassword(passwordEncoder.encode(req.password()));
        }

        return toResponse(userRepo.save(user));
    }

    public void deleteUser(Long id) {
        if (!userRepo.existsById(id)) {
            throw new IllegalArgumentException("Gebruiker niet gevonden.");
        }
        userRepo.deleteById(id);
    }

    public List<StatsResponse> getStatsForLocation(Long locationId, LocalDate from, LocalDate to) {
        // medewerkers met diensten op deze locatie in deze periode
        List<Shift> locationShifts = shiftRepo.findByLocationIdAndDateBetween(locationId, from, to);

        List<User> employees = locationShifts.stream()
            .map(Shift::getEmployee)
            .filter(u -> u.getRole() == User.Role.EMPLOYEE)
            .distinct()
            .toList();

        return employees.stream().map(emp -> {
            List<Shift> shifts = locationShifts.stream()
                .filter(s -> s.getEmployee().getId().equals(emp.getId()))
                .toList();
            double hours = shifts.stream()
                .mapToDouble(s -> Duration.between(
                    LocalTime.parse(s.getStartTime().toString()),
                    LocalTime.parse(s.getEndTime().toString())
                ).toMinutes() / 60.0)
                .sum();
            List<ShiftResponse> shiftDtos = shifts.stream()
                .map(s -> new ShiftResponse(
                    s.getId(), s.getEmployee().getId(), s.getEmployee().getFullName(),
                    s.getLocation().getId(), s.getLocation().getName(),
                    s.getDate(), s.getStartTime(), s.getEndTime(), s.getNote()
                )).toList();
            return new StatsResponse(emp.getId(), emp.getFullName(),
                null, shifts.size(), hours, shiftDtos);
        }).toList();
    }

    public UserResponse toResponse(User u) {
        return new UserResponse(
            u.getId(),
            String.format("%06d", u.getId()),
            u.getFullName(),
            u.getRole().name(),
            u.getLocation() != null ? u.getLocation().getId() : null,
            u.getLocation() != null ? u.getLocation().getName() : null
        );
    }
}

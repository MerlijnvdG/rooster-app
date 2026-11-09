package com.example.rooster.config;

import com.example.rooster.entity.Location;
import com.example.rooster.entity.User;
import com.example.rooster.repository.LocationRepository;
import com.example.rooster.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Profile("prod")
@Component
public class ProdSeeder implements CommandLineRunner {

    private final UserRepository userRepo;
    private final LocationRepository locationRepo;
    private final PasswordEncoder passwordEncoder;

    public ProdSeeder(UserRepository userRepo, LocationRepository locationRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.locationRepo = locationRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepo.count() > 0) return;

        locationRepo.save(new Location("Hoofdvestiging"));

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword(passwordEncoder.encode("ChangeMe123!"));
        admin.setFullName("Admin");
        admin.setRole(User.Role.EMPLOYER);
        userRepo.save(admin);

        System.out.println("admin aangemaakt, code " + String.format("%06d", admin.getId()) + " ww ChangeMe123!, meteen veranderen");
    }
}

package com.example.rooster.config;

import com.example.rooster.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

// TIJDELIJK — verwijderen na deploy
@Profile("prod")
@Order(10)
@Component
public class TempPasswordFix implements CommandLineRunner {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public TempPasswordFix(UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        String pw1 = System.getenv("TEMP_PW_1");
        String pw3 = System.getenv("TEMP_PW_3");
        if (pw1 == null || pw3 == null) {
            System.out.println("=== TempPasswordFix: TEMP_PW_1 of TEMP_PW_3 niet ingesteld, overgeslagen ===");
            return;
        }
        userRepo.findByRole(com.example.rooster.entity.User.Role.EMPLOYER)
            .stream().findFirst().ifPresent(u -> {
                u.setPassword(passwordEncoder.encode(pw1));
                userRepo.save(u);
                System.out.println("=== TempPasswordFix: wachtwoord EMPLOYER (id=" + String.format("%06d", u.getId()) + ") bijgewerkt ===");
            });
        userRepo.findById(4L).ifPresent(u -> {
            u.setPassword(passwordEncoder.encode(pw3));
            userRepo.save(u);
            System.out.println("=== TempPasswordFix: wachtwoord 000004 bijgewerkt ===");
        });
    }
}

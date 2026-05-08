package com.example.rooster.service;

import com.example.rooster.dto.CodeLoginRequest;
import com.example.rooster.dto.LoginResponse;
import com.example.rooster.entity.User;
import com.example.rooster.repository.UserRepository;
import com.example.rooster.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;

    public AuthService(JwtUtil jwtUtil, UserRepository userRepo, PasswordEncoder passwordEncoder) {
        this.jwtUtil = jwtUtil;
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    public LoginResponse loginWithCode(CodeLoginRequest request) {
        long userId;
        try {
            userId = Long.parseLong(request.code());
        } catch (NumberFormatException e) {
            throw new IllegalArgumentException("Ongeldige inlogcode.");
        }

        User user = userRepo.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("Ongeldige inlogcode of wachtwoord."));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new IllegalArgumentException("Ongeldige inlogcode of wachtwoord.");
        }

        String token = jwtUtil.generateToken(user.getUsername());

        return new LoginResponse(
            token,
            String.format("%06d", user.getId()),
            user.getFullName(),
            user.getRole().name()
        );
    }
}

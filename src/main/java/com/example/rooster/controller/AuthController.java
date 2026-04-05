package com.example.rooster.controller;

import com.example.rooster.dto.CodeLoginRequest;
import com.example.rooster.dto.LoginResponse;
import com.example.rooster.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody CodeLoginRequest request) {
        try {
            return ResponseEntity.ok(authService.loginWithCode(request));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}

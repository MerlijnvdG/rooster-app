package com.example.rooster.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRequest(
    @NotBlank String fullName,
    @NotNull String role,
    String password
) {}

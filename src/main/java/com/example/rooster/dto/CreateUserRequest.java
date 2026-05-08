package com.example.rooster.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(
    @NotBlank String fullName,
    @NotNull String role,
    @NotBlank @Size(min = 4) String password
) {}

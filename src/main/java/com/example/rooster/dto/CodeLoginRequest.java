package com.example.rooster.dto;

import jakarta.validation.constraints.NotBlank;

public record CodeLoginRequest(
    @NotBlank String code,
    @NotBlank String password
) {}

package com.example.rooster.dto;

public record UserResponse(
    Long id,
    String loginCode,
    String fullName,
    String role
) {}

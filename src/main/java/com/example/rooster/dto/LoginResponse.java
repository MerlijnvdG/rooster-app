package com.example.rooster.dto;

public record LoginResponse(
    String token,
    String loginCode,
    String fullName,
    String role,
    Long locationId,
    String locationName
) {}

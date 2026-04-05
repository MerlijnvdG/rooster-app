package com.example.rooster.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalTime;

public record ShiftRequest(
    @NotNull Long employeeId,
    @NotNull Long locationId,
    @NotNull LocalDate date,
    @NotNull LocalTime startTime,
    @NotNull LocalTime endTime,
    String note
) {}

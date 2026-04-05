package com.example.rooster.dto;

import java.time.LocalDate;
import java.time.LocalTime;

public record ShiftResponse(
    Long id,
    Long employeeId,
    String employeeName,
    Long locationId,
    String locationName,
    LocalDate date,
    LocalTime startTime,
    LocalTime endTime,
    String note
) {}

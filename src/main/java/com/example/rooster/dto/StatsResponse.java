package com.example.rooster.dto;

import java.util.List;

public record StatsResponse(
    Long employeeId,
    String employeeName,
    String locationName,
    int totalShifts,
    double totalHours,
    List<ShiftResponse> shifts
) {}

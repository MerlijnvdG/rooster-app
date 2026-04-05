package com.example.rooster.dto;

public record MonthlySummaryEntry(
    Long   employeeId,
    String employeeName,
    String locationName,
    int    shiftCount,
    double grossHours,
    double breakHours,
    double netHours
) {}

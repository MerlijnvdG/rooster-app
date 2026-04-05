package com.example.rooster.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record LeaveRequestResponse(
        Long id,
        Long employeeId,
        String employeeName,
        String employeeCode,
        LocalDate startDate,
        LocalDate endDate,
        String reason,
        String status,
        String rejectionReason,
        LocalDateTime createdAt
) {}

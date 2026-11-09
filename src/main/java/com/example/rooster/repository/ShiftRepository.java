package com.example.rooster.repository;

import com.example.rooster.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findByEmployeeId(Long employeeId);
    List<Shift> findByLocationId(Long locationId);
    boolean existsByLocationId(Long locationId);
    List<Shift> findByLocationIdAndDateBetween(Long locationId, LocalDate from, LocalDate to);
    List<Shift> findByEmployeeIdAndDateBetween(Long employeeId, LocalDate from, LocalDate to);
    List<Shift> findByDateBetweenOrderByEmployeeIdAscDateAsc(LocalDate from, LocalDate to);
}

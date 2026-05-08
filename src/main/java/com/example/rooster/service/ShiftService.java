package com.example.rooster.service;

import com.example.rooster.dto.MonthlySummaryEntry;
import com.example.rooster.dto.ShiftRequest;
import com.example.rooster.dto.ShiftResponse;
import com.example.rooster.entity.Location;
import com.example.rooster.entity.Shift;
import com.example.rooster.entity.User;
import com.example.rooster.repository.LocationRepository;
import com.example.rooster.repository.ShiftRepository;
import com.example.rooster.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
public class ShiftService {

    private final ShiftRepository shiftRepo;
    private final UserRepository userRepo;
    private final LocationRepository locationRepo;

    public ShiftService(ShiftRepository shiftRepo, UserRepository userRepo, LocationRepository locationRepo) {
        this.shiftRepo = shiftRepo;
        this.userRepo = userRepo;
        this.locationRepo = locationRepo;
    }

    public List<ShiftResponse> getShiftsForEmployee(Long employeeId, LocalDate from, LocalDate to) {
        return shiftRepo.findByEmployeeIdAndDateBetween(employeeId, from, to)
            .stream().map(this::toResponse).toList();
    }

    public List<ShiftResponse> getShiftsForLocation(Long locationId, LocalDate from, LocalDate to) {
        return shiftRepo.findByLocationIdAndDateBetween(locationId, from, to)
            .stream().map(this::toResponse).toList();
    }

    public ShiftResponse createShift(ShiftRequest req) {
        if (req.date().getDayOfWeek() == DayOfWeek.SUNDAY)
            throw new IllegalArgumentException("Zondag is het filiaal gesloten.");

        User employee = userRepo.findById(req.employeeId())
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        Location location = locationRepo.findById(req.locationId())
            .orElseThrow(() -> new RuntimeException("Location not found"));

        Shift shift = new Shift();
        shift.setEmployee(employee);
        shift.setLocation(location);
        shift.setDate(req.date());
        shift.setStartTime(req.startTime());
        shift.setEndTime(req.endTime());
        shift.setNote(req.note());

        return toResponse(shiftRepo.save(shift));
    }

    public ShiftResponse updateShift(Long id, ShiftRequest req) {
        if (req.date().getDayOfWeek() == DayOfWeek.SUNDAY)
            throw new IllegalArgumentException("Zondag is het filiaal gesloten.");

        Shift shift = shiftRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Shift not found"));

        User employee = userRepo.findById(req.employeeId())
            .orElseThrow(() -> new RuntimeException("Employee not found"));
        Location location = locationRepo.findById(req.locationId())
            .orElseThrow(() -> new RuntimeException("Location not found"));

        shift.setEmployee(employee);
        shift.setLocation(location);
        shift.setDate(req.date());
        shift.setStartTime(req.startTime());
        shift.setEndTime(req.endTime());
        shift.setNote(req.note());

        return toResponse(shiftRepo.save(shift));
    }

    public void deleteShift(Long id) {
        shiftRepo.deleteById(id);
    }

    public List<MonthlySummaryEntry> getMonthlySummary(int year, int month) {
        LocalDate from = LocalDate.of(year, month, 1);
        LocalDate to   = from.withDayOfMonth(from.lengthOfMonth());

        List<Shift> shifts = shiftRepo.findByDateBetweenOrderByEmployeeIdAscDateAsc(from, to);

        Map<Long, double[]> acc = new LinkedHashMap<>(); // minuten, aantal diensten
        Map<Long, String[]> meta = new LinkedHashMap<>(); // naam, filiaal

        for (Shift s : shifts) {
            Long id = s.getEmployee().getId();
            long mins = Duration.between(s.getStartTime(), s.getEndTime()).toMinutes();
            acc.computeIfAbsent(id, k -> new double[2]);
            acc.get(id)[0] += mins;
            acc.get(id)[1] += 1;
            meta.putIfAbsent(id, new String[]{
                s.getEmployee().getFullName(),
                s.getLocation() != null ? s.getLocation().getName() : null
            });
        }

        List<MonthlySummaryEntry> result = new ArrayList<>();
        for (Map.Entry<Long, double[]> e : acc.entrySet()) {
            double grossMin = e.getValue()[0];
            int    count    = (int) e.getValue()[1];
            double breakMin = count * 30.0;
            double netMin   = Math.max(0, grossMin - breakMin);
            String[] m = meta.get(e.getKey());
            result.add(new MonthlySummaryEntry(
                e.getKey(), m[0], m[1], count,
                grossMin / 60.0, breakMin / 60.0, netMin / 60.0
            ));
        }

        result.sort((a, b) -> Double.compare(b.netHours(), a.netHours()));
        return result;
    }

    private ShiftResponse toResponse(Shift s) {
        return new ShiftResponse(
            s.getId(),
            s.getEmployee().getId(),
            s.getEmployee().getFullName(),
            s.getLocation().getId(),
            s.getLocation().getName(),
            s.getDate(),
            s.getStartTime(),
            s.getEndTime(),
            s.getNote()
        );
    }
}

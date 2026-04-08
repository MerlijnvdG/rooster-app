package com.example.rooster.service;

import com.example.rooster.dto.CreateLeaveRequestDto;
import com.example.rooster.dto.LeaveRequestResponse;
import com.example.rooster.entity.LeaveRequest;
import com.example.rooster.entity.User;
import com.example.rooster.repository.LeaveRequestRepository;
import com.example.rooster.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class LeaveRequestService {

    private final LeaveRequestRepository repo;
    private final UserRepository userRepo;
    private final NotificationService notificationService;

    public LeaveRequestService(LeaveRequestRepository repo, UserRepository userRepo, NotificationService notificationService) {
        this.repo = repo;
        this.userRepo = userRepo;
        this.notificationService = notificationService;
    }

    public LeaveRequestResponse create(Long employeeId, CreateLeaveRequestDto dto) {
        if (dto.endDate().isBefore(dto.startDate())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Einddatum mag niet voor startdatum liggen");
        }
        User employee = userRepo.findById(employeeId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Medewerker niet gevonden"));

        LeaveRequest lr = new LeaveRequest();
        lr.setEmployee(employee);
        lr.setStartDate(dto.startDate());
        lr.setEndDate(dto.endDate());
        lr.setReason(dto.reason());
        LeaveRequestResponse saved = toResponse(repo.save(lr));
        notificationService.createForAllEmployers(
                "Nieuwe verlofaanvraag",
                employee.getFullName() + " heeft verlof aangevraagd van " + dto.startDate() + " t/m " + dto.endDate() + ".",
                "LEAVE_REQUEST"
        );
        return saved;
    }

    public List<LeaveRequestResponse> getMyRequests(Long employeeId) {
        return repo.findByEmployeeIdOrderByCreatedAtDesc(employeeId)
                .stream().map(this::toResponse).toList();
    }

    public List<LeaveRequestResponse> getAllRequests() {
        return repo.findAllByOrderByCreatedAtDesc()
                .stream().map(this::toResponse).toList();
    }

    public LeaveRequestResponse approve(Long id) {
        LeaveRequest lr = getOrThrow(id);
        if (lr.getStatus() != LeaveRequest.Status.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aanvraag is al verwerkt");
        }
        lr.setStatus(LeaveRequest.Status.APPROVED);
        LeaveRequestResponse result = toResponse(repo.save(lr));
        notificationService.createForUser(lr.getEmployee(),
                "Verlof goedgekeurd",
                "Je verlofaanvraag van " + lr.getStartDate() + " t/m " + lr.getEndDate() + " is goedgekeurd.",
                "LEAVE_APPROVED"
        );
        return result;
    }

    public LeaveRequestResponse reject(Long id, String rejectionReason) {
        LeaveRequest lr = getOrThrow(id);
        if (lr.getStatus() != LeaveRequest.Status.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Aanvraag is al verwerkt");
        }
        lr.setStatus(LeaveRequest.Status.REJECTED);
        lr.setRejectionReason(rejectionReason);
        LeaveRequestResponse result = toResponse(repo.save(lr));
        String rejectMsg = "Je verlofaanvraag van " + lr.getStartDate() + " t/m " + lr.getEndDate() + " is afgewezen."
                + (rejectionReason != null && !rejectionReason.isBlank() ? " Reden: " + rejectionReason : "");
        notificationService.createForUser(lr.getEmployee(), "Verlof afgewezen", rejectMsg, "LEAVE_REJECTED");
        return result;
    }

    public void delete(Long id, Long employeeId) {
        LeaveRequest lr = getOrThrow(id);
        if (!lr.getEmployee().getId().equals(employeeId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Niet toegestaan");
        }
        if (lr.getStatus() != LeaveRequest.Status.PENDING) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Alleen openstaande aanvragen kunnen worden verwijderd");
        }
        repo.delete(lr);
    }

    private LeaveRequest getOrThrow(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Aanvraag niet gevonden"));
    }

    private LeaveRequestResponse toResponse(LeaveRequest lr) {
        User emp = lr.getEmployee();
        return new LeaveRequestResponse(
                lr.getId(),
                emp.getId(),
                emp.getFullName(),
                String.format("%06d", emp.getId()),
                lr.getStartDate(),
                lr.getEndDate(),
                lr.getReason(),
                lr.getStatus().name(),
                lr.getRejectionReason(),
                lr.getCreatedAt()
        );
    }
}

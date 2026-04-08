package com.example.rooster.controller;

import com.example.rooster.dto.CreateLeaveRequestDto;
import com.example.rooster.dto.LeaveRequestResponse;
import com.example.rooster.dto.RejectLeaveRequestDto;
import com.example.rooster.service.LeaveRequestService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.example.rooster.repository.UserRepository;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/leave-requests")
public class LeaveRequestController {

    private final LeaveRequestService service;
    private final UserRepository userRepo;

    public LeaveRequestController(LeaveRequestService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('EMPLOYEE')")
    public LeaveRequestResponse create(@Valid @RequestBody CreateLeaveRequestDto dto, Authentication auth) {
        Long id = resolveId(auth);
        return service.create(id, dto);
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('EMPLOYEE')")
    public List<LeaveRequestResponse> getMyRequests(Authentication auth) {
        return service.getMyRequests(resolveId(auth));
    }

    @GetMapping
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<LeaveRequestResponse> getAllRequests() {
        return service.getAllRequests();
    }

    @GetMapping("/employee/{employeeId}")
    @PreAuthorize("hasRole('EMPLOYER')")
    public List<LeaveRequestResponse> getForEmployee(@PathVariable Long employeeId) {
        return service.getMyRequests(employeeId);
    }

    @PutMapping("/{id}/approve")
    @PreAuthorize("hasRole('EMPLOYER')")
    public LeaveRequestResponse approve(@PathVariable Long id) {
        return service.approve(id);
    }

    @PutMapping("/{id}/reject")
    @PreAuthorize("hasRole('EMPLOYER')")
    public LeaveRequestResponse reject(@PathVariable Long id, @RequestBody RejectLeaveRequestDto dto) {
        return service.reject(id, dto.rejectionReason());
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PreAuthorize("hasRole('EMPLOYEE')")
    public void delete(@PathVariable Long id, Authentication auth) {
        service.delete(id, resolveId(auth));
    }

    private Long resolveId(Authentication auth) {
        String username = ((UserDetails) auth.getPrincipal()).getUsername();
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED))
                .getId();
    }
}

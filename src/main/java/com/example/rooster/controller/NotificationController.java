package com.example.rooster.controller;

import com.example.rooster.dto.NotificationResponse;
import com.example.rooster.repository.UserRepository;
import com.example.rooster.service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService service;
    private final UserRepository userRepo;

    public NotificationController(NotificationService service, UserRepository userRepo) {
        this.service = service;
        this.userRepo = userRepo;
    }

    @GetMapping
    public List<NotificationResponse> getAll(Authentication auth) {
        return service.getForUser(resolveId(auth));
    }

    @GetMapping("/unread-count")
    public Map<String, Long> unreadCount(Authentication auth) {
        return Map.of("count", service.countUnread(resolveId(auth)));
    }

    @PostMapping("/mark-read")
    public void markAllRead(Authentication auth) {
        service.markAllRead(resolveId(auth));
    }

    private Long resolveId(Authentication auth) {
        String username = ((UserDetails) auth.getPrincipal()).getUsername();
        return userRepo.findByUsername(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED))
                .getId();
    }
}

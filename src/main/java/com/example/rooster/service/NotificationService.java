package com.example.rooster.service;

import com.example.rooster.dto.NotificationResponse;
import com.example.rooster.entity.Notification;
import com.example.rooster.entity.User;
import com.example.rooster.repository.NotificationRepository;
import com.example.rooster.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository repo;
    private final UserRepository userRepo;

    public NotificationService(NotificationRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

    public void createForUser(User user, String title, String message, String type) {
        Notification n = new Notification();
        n.setUser(user);
        n.setTitle(title);
        n.setMessage(message);
        n.setType(type);
        repo.save(n);
    }

    public void createForAllEmployers(String title, String message, String type) {
        userRepo.findByRole(User.Role.EMPLOYER).forEach(u -> createForUser(u, title, message, type));
    }

    public List<NotificationResponse> getForUser(Long userId) {
        return repo.findByUserIdOrderByCreatedAtDesc(userId)
                .stream().map(this::toResponse).toList();
    }

    public long countUnread(Long userId) {
        return repo.countByUserIdAndReadFalse(userId);
    }

    public void markAllRead(Long userId) {
        repo.markAllReadForUser(userId);
    }

    private NotificationResponse toResponse(Notification n) {
        return new NotificationResponse(n.getId(), n.getTitle(), n.getMessage(), n.getType(), n.isRead(), n.getCreatedAt());
    }
}

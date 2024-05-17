package com.goncalves.API.service;

import com.goncalves.API.entities.notification.Notification;
import com.goncalves.API.entities.notification.NotificationRepository;
import com.goncalves.API.entities.user.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(String title, String message,String body ,Users users) {
        try {
            verifyFields(title, message, users);
            Notification notification = new Notification(title, message, body, users);
            return notificationRepository.save(notification);
        } catch (Exception e) {
            throw new RuntimeException("Error in create notification");
        }
    }

    private void verifyFields(String title, String message, Users users) {
        if (title == null || title.isEmpty()) {
            throw new RuntimeException("Title is required");
        }
        if (message == null || message.isEmpty()) {
            throw new RuntimeException("Message is required");
        }
        if (users == null) {
            throw new RuntimeException("User is required");
        }
    }
}

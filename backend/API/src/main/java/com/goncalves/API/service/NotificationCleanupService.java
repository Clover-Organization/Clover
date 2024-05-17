package com.goncalves.API.service;

import com.goncalves.API.entities.notification.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class NotificationCleanupService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Scheduled(fixedRate = 3600000) // Executa a cada 1 hora (3600000 milissegundos)
    public void cleanupExpiredNotifications() {
        LocalDateTime now = LocalDateTime.now();
        notificationRepository.deleteByExpirationDateBefore(now);
    }
}

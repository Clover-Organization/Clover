package com.goncalves.API.entities.notification;

import com.goncalves.API.entities.user.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    void deleteByExpirationDateBefore(LocalDateTime now);

    List<Notification> findAllByUsers(Users user);

}

package com.goncalves.API.entities.notification;

import com.goncalves.API.entities.user.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;

public interface NotificationRepository extends MongoRepository<Notification, String> {
    void deleteByExpirationDateBefore(LocalDateTime now);

    //    List<Notification> findAllByUsers(Users user);
    Page<Notification> findAllByUsers(Users user, Pageable pageable);
}

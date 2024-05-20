package com.goncalves.API.controller;

import com.goncalves.API.entities.notification.NotificationRepository;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.exception.ErrorNotFoundId;
import com.goncalves.API.infra.exception.NotFoundException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


/**
 * NotificationController is a REST controller that handles HTTP requests related to notifications.
 * It provides endpoints for getting all notifications, getting notifications by user ID,
 * getting all notifications for the current user, and deleting a notification by ID.
 */
@Slf4j
@Tag(name = "Notification")
@RestController
@RequestMapping("/notification")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired
    private UserRepository userRepository;

    /**
     * Get all notifications.
     * @return a ResponseEntity containing all notifications.
     */
    @Operation(summary = "Get all notifications", description = "Retrieve all notifications")
    @GetMapping("/all")
    public ResponseEntity getAllNotifications() {
        return ResponseEntity.ok(notificationRepository.findAll());
    }

    /**
     * Get notifications by user ID.
     * @param idNotification the ID of the notification.
     * @return a ResponseEntity containing the notification with the given ID.
     */
    @Operation(summary = "Get notifications by user ID", description = "Retrieve notifications by user ID")
    @GetMapping("/user/{idNotification}")
    public ResponseEntity getNotificationsByUser(@Parameter(description = "Notification ID")
                                                     @PathVariable String idNotification) {
        try {
            var notification = notificationRepository.findById(idNotification);
            if (notification == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No notification found for this id");
            }
            return ResponseEntity.ok(notification);
        } catch (InternalError e) {
            return ResponseEntity.internalServerError()
                    .body(new InternalError("Error while trying to get notifications by user"));
        }
    }

    /**
     * Get all notifications for the current user.
     * @return a ResponseEntity containing all notifications for the current user.
     */
    @Operation(summary = "Get all notifications for current user", description = "Retrieve all notifications for current user")
    @GetMapping("/user/all")
    public ResponseEntity getAllNotificationsByUser(@RequestParam(defaultValue = "0") int page,
                                                    @RequestParam(defaultValue = "5") int size,
                                                    @RequestParam(defaultValue = "creationDate") String sort) {
        try {
            var user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            Pageable pageable = PageRequest.of(page, size, Sort.by(sort));
            var notification = notificationRepository.findAllByUsers(user, pageable);
            if (notification == null || notification.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorNotFoundId("No notifications found for this user", "message"));
            }
            return ResponseEntity.ok(notification);
        } catch (InternalError e) {
            return ResponseEntity.internalServerError()
                    .body(new InternalError("Error while trying to get notifications by user"));
        }
    }

    /**
     * Delete a notification by ID.
     * @param idNotification the ID of the notification to delete.
     * @return a ResponseEntity indicating the result of the deletion operation.
     */
    @Operation(summary = "Delete notification by ID", description = "Delete notification by ID")
    @DeleteMapping("/delete/{idNotification}")
    public ResponseEntity deleteNotification(@Parameter(description = "Notification ID")
                                                 @PathVariable String idNotification) {
        try {
            notificationRepository.deleteById(idNotification);
            return ResponseEntity.noContent().build();
        } catch (InternalError e) {
            return ResponseEntity.internalServerError()
                    .body(new InternalError("Error while trying to delete notification"));
        }
    }
}
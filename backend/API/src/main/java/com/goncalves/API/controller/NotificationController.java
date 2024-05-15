package com.goncalves.API.controller;

import com.goncalves.API.DTO.DadosNewMessages;
import com.goncalves.API.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @GetMapping("/all")
    public ResponseEntity NotificationController(@RequestBody int idNotification) {
        try {
            System.out.println(idNotification);
            var messages = notificationService.getCache("notification:" + idNotification);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/user")
    public ResponseEntity NotificationControllerByUser() {
        try {
            var messages = notificationService.getAllCacheByUser();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}

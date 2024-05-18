package com.goncalves.API.entities.notification;

import com.goncalves.API.entities.user.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "notifications")
public class Notification {
    @Id
    private String idNotification;

    private String title;
    private String message;
    private Subject subject;
    private List<String> utils;

    @DBRef
    private Users users;
    private LocalDateTime expirationDate;

    public Notification(String title, String message, Subject subject, Users users, List<String> utils) {
        this.title = title;
        this.message = message;
        this.subject = subject;
        this.users = users;
        this.expirationDate = LocalDateTime.now();
        this.utils = utils;
    }

}

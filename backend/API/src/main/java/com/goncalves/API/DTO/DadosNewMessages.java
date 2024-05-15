package com.goncalves.API.DTO;


import com.goncalves.API.entities.notification.Notification;
import com.goncalves.API.entities.user.Users;

public record DadosNewMessages(String id, String title, String messages, boolean read, Users users) {
    public DadosNewMessages(Notification notification) {
        this(notification.getId(), notification.getTitle(), notification.getMessage(), notification.isRead(), notification.getUsers());
    }

}

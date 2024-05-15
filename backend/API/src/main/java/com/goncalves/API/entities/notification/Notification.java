package com.goncalves.API.entities.notification;

import com.goncalves.API.entities.user.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    private String id;
    private String title;
    private String message;
    private boolean read;
    private Users users;

    public Notification(String title, String message, boolean read, Users users) {
        this.title = title;
        this.message = message;
        this.read = read;
        this.users = users;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", message='" + message + '\'' +
                ", read=" + read +
                ", users=" + users +
                '}';
    }
}

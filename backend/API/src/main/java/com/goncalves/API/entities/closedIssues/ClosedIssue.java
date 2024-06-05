package com.goncalves.API.entities.closedIssues;

import com.goncalves.API.entities.user.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "closedIssue")
public class ClosedIssue {
    @Id
    private String id;

    private String title;
    private String description;
    private boolean open;
    private LocalDateTime creationDate;
    private LocalDateTime closeDate;

    @DBRef
    private Users closedBy;

    public ClosedIssue(String title, String description, boolean open, LocalDateTime creationDate, LocalDateTime closeDate, Users closedBy) {
        this.title = title;
        this.description = description;
        this.open = open;
        this.creationDate = creationDate;
        this.closeDate = closeDate;
        this.closedBy = closedBy;
    }
}

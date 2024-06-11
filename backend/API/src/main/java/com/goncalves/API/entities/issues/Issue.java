package com.goncalves.API.entities.issues;

import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.request.Project;
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
@Document(collection = "issues")
public class Issue {

    @Id
    private String id;

    private String title;
    private String description;
    private boolean open;
    private LocalDateTime creationDate;
    private LocalDateTime closeDate;

    @DBRef
    private Users users;
    @DBRef
    private List<String> files;

    public Issue(String title,
                 String description,
                 boolean open,
                 LocalDateTime creationDate,
                 LocalDateTime closeDate,
                 Users users,
                 List<String> files) {
        this.title = title;
        this.description = description;
        this.open = open;
        this.creationDate = creationDate;
        this.closeDate = closeDate;
        this.users = users;
        this.files = files;
    }

}

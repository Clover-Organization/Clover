package com.goncalves.API.entities.commits;

import com.goncalves.API.entities.filesVersions.Versions;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Document(collection = "commits")
public class Commits {

    @Id
    private String idCommit;

    private String commitMessage;

    private LocalDateTime commitDate;

    @DBRef
    private Versions version;

    public Commits(String commitMessage, LocalDateTime commitDate) {
        this.commitMessage = commitMessage;
        this.commitDate = LocalDateTime.now();
    }
}

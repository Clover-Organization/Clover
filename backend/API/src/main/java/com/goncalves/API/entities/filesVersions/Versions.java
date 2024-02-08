package com.goncalves.API.entities.filesVersions;

import com.goncalves.API.entities.commits.Commits;
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
@Document(collection = "versions")
public class Versions {

    @Id
    private String idVersion;

    private String fileName;
    private String fileType;
    private byte[] changes;
    private LocalDateTime creationFile;


    public Versions(String fileName, String fileType, byte[] changes, LocalDateTime creationFile) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.changes = changes;
        this.creationFile = LocalDateTime.now();
    }

}

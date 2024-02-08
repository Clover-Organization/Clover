package com.goncalves.API.entities.files;

import com.goncalves.API.entities.commits.Commits;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document(collection = "files")
public class Files {
    @Id
    private String idFile;

    @NotEmpty
    private String fileName;

    private String fileType;

    private byte[] fileContent;

    private LocalDateTime creationFile;

    @DBRef
    private List<Commits> commits = new ArrayList<>();


    public Files(String fileName, String fileType, byte[] fileContent, LocalDateTime creationFile) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.fileContent = fileContent;
        this.creationFile = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Files other = (Files) obj;
        return Objects.equals(idFile, other.idFile);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idFile);
    }


}
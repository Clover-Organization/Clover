package com.goncalves.API.entities.folder;

import com.goncalves.API.entities.files.Files;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "folder")
public class Folder {
    @Id
    private String idFolder;

    private String folderName;

    private LocalDateTime creationFolder;

    @DBRef
    private List<Files> files = new ArrayList<>();

    @DBRef
    private List<Folder> subFolders = new ArrayList<>();

    public Folder(String folderName, LocalDateTime creationFolder) {
        this.folderName = folderName;
        this.creationFolder = LocalDateTime.now();
    }

}
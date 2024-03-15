package com.goncalves.API.entities.request;

import com.goncalves.API.DTO.DadosAtualizarProject;
import com.goncalves.API.entities.annotations.Annotations;
import com.goncalves.API.entities.commits.Commits;
import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.user.Users;
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
@Document(collection = "project")
public class Project {
    @Id
    private String idProject;

    private String projectName;
    private LocalDateTime creationDate;
    private LocalDateTime projectProgress;
    private String projectDescription;
    private List<Users> shareUsers = new ArrayList<>();

    @DBRef
    private Users user;
    @DBRef
    private List<Files> files = new ArrayList<>();
    @DBRef
    private List<Commits> commits = new ArrayList<>();
    @DBRef
    private List<Folder> folders = new ArrayList<>();
    @DBRef
    private List<Annotations> annotations = new ArrayList<>();


    public Project(String projectName, LocalDateTime creationDate, LocalDateTime projectProgress, String projectDescription, Users user, List files, List folders) {
        this.projectName = projectName;
        this.creationDate = LocalDateTime.now();
        this.projectProgress = LocalDateTime.now();
        this.projectDescription = projectDescription;
        this.user = user;
        this.files = files;
        this.folders = folders;
    }

    public void atualizarProject(DadosAtualizarProject dados) {

        if (dados.projectName() != null) {
            this.projectName = dados.projectName();
        }

        if (dados.projectDescription() != null) {
            this.projectDescription = dados.projectDescription();
        }

        if (dados.projectProgress() != null) {
            this.projectProgress = dados.projectProgress().now();
        }
    }
}

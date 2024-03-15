package com.goncalves.API.DTO;

import com.goncalves.API.entities.annotations.Annotations;
import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.request.Project;
import com.goncalves.API.entities.user.Users;

import java.time.LocalDateTime;
import java.util.List;

public record DadosListagemProject(String idProject,
                                   String projectName,
                                   LocalDateTime creationDate,
                                   LocalDateTime projectProgress,
                                   String projectDescription,
                                   Users user,
                                   List<Users> shareUsers,
                                   List<Files> files,
                                   List<Folder> folder,
                                   List<Annotations> annotations) {
    public DadosListagemProject (Project project){
        this(
                project.getIdProject(),
                project.getProjectName(),
                project.getCreationDate(),
                project.getProjectProgress(),
                project.getProjectDescription(),
                project.getUser(),
                project.getShareUsers(),
                project.getFiles(),
                project.getFolders(),
                project.getAnnotations()
        );
    }
}

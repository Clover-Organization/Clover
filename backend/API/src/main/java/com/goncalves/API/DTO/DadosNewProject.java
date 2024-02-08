package com.goncalves.API.DTO;

import com.goncalves.API.entities.request.Project;
import com.goncalves.API.entities.user.Users;

import java.time.LocalDateTime;

public record DadosNewProject(String idProject,
                              String projectName,
                              LocalDateTime creationDate,
                              LocalDateTime projectProgress,
                              String projectDescription,
                              Users user) {

    public DadosNewProject (Project project){
        this(project.getIdProject(), project.getProjectName(), LocalDateTime.now(), LocalDateTime.now(), project.getProjectDescription(), project.getUser());
    }
}

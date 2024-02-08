package com.goncalves.API.controller;


import com.goncalves.API.entities.commits.Commits;
import com.goncalves.API.entities.commits.CommitsRepository;
import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.files.FilesRepository;
import com.goncalves.API.entities.filesVersions.Versions;
import com.goncalves.API.entities.filesVersions.VersionsRepository;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.request.Project;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.entities.user.UserRepository;
import com.goncalves.API.infra.security.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("projects/commits")
public class CommitsController {
    @Autowired
    private CommitsRepository repository;
    @Autowired
    private ProjectRepository projectsRepository;
    @Autowired
    private FilesRepository filesRepository;
    @Autowired
    private UserRepository usersRepository;
    @Autowired
    private VersionsRepository versionsRepository;


    @GetMapping("/{idProject}")
    public ResponseEntity getCommit(@PathVariable String idProject) {
        var projectOptional = projectsRepository.findById(idProject);
        var project = projectOptional.get();

        return ResponseEntity.ok(project.getCommits());
    }

    @PostMapping("/{idProject}/commitAndUpdate/{idFile}")
    @Transactional
    public ResponseEntity updateFileWithCommit(
            @PathVariable String idProject,
            @PathVariable String idFile,
            @RequestParam("file") MultipartFile file,
            @RequestParam("commitMessage") String commitMessage) {

        try {
            var optionalProject = projectsRepository.findById(idProject);

            if (optionalProject.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("ID do Projeto não encontrado", idProject));
            }

            var project = optionalProject.get();
            var existingFile = findFileInProject(project, idFile);

            if (existingFile == null) {
                // Arquivo não encontrado no projeto, procurar no folder e subfolders
                existingFile = findFileInFolders(project.getFolders(), idFile);

                if (existingFile == null) {
                    // Arquivo não encontrado em nenhum lugar
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new NotFoundException("ID do Arquivo não encontrado", idFile));
                }
            }

            var filesOptional = filesRepository.findById(idFile);

            var files = filesOptional.get();

            // Verifica se o conteúdo do arquivo mudou
            byte[] newFileContent = file.getBytes();

            Versions oldFileVersion = null;
            if (!Arrays.equals(existingFile.getFileContent(), newFileContent)) {
                // Criar uma nova versão do arquivo antigo
                oldFileVersion = new Versions(
                        existingFile.getFileName(),
                        existingFile.getFileType(),
                        existingFile.getFileContent(),
                        existingFile.getCreationFile()
                );
                versionsRepository.save(oldFileVersion);

                // Atualizar o conteúdo do arquivo com o novo conteúdo
                existingFile.setFileContent(newFileContent);
            }

            // Verifica se outras informações do arquivo mudaram
            String newFileName = file.getOriginalFilename();
            String newContentType = file.getContentType();
            if (!Objects.equals(existingFile.getFileName(), newFileName) || !Objects.equals(existingFile.getFileType(), newContentType)) {
                // Atualizar o nome e o tipo do arquivo se necessário
                existingFile.setFileName(newFileName);
                existingFile.setFileType(newContentType);
            }

            // Cria um novo commit
            Commits newCommit = new Commits(commitMessage, LocalDateTime.now());

            // Adiciona a referência da versão ao commit
            newCommit.setVersion(oldFileVersion);
            repository.save(newCommit);

            // Adiciona o commit à lista de commits do arquivo e do projeto
            existingFile.getCommits().add(newCommit);
            project.getCommits().add(newCommit);

            // Salva o novo commit no repositório
            repository.save(newCommit);

            // Atualiza o arquivo no repositório
            filesRepository.save(existingFile);
            projectsRepository.save(project);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Arquivo atualizado com sucesso e novo commit criado.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao atualizar arquivo e criar um novo commit. Detalhes: " + e.getMessage());
        }
    }


    private Files findFileInProject(Project project, String targetFileId) {
        return project.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }

    private Files findFileInFolders(List<Folder> folders, String targetFileId) {
        for (Folder folder : folders) {
            // Procura no folder atual
            Files fileInFolder = findFileInFolder(folder, targetFileId);
            if (fileInFolder != null) {
                return fileInFolder;
            }

            // Procura nas subpastas recursivamente
            Files fileInSubfolders = findFileInFolders(folder.getSubFolders(), targetFileId);
            if (fileInSubfolders != null) {
                return fileInSubfolders;
            }
        }
        return null;
    }

    private Files findFileInFolder(Folder folder, String targetFileId) {
        return folder.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }

}

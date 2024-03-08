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
import com.goncalves.API.infra.security.Successfully;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Slf4j
@Tag(name = "/project/commits")
@RestController
@RequestMapping("/projects/commits")
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


    /**
     * Endpoint para obter os commits de um projeto com base no ID do projeto.
     *
     * @param idProject O ID do projeto do qual os commits serão recuperados
     * @return ResponseEntity contendo os commits do projeto se encontrado, ou uma resposta de erro caso contrário
     */
    @GetMapping("/{idProject}")
    @Operation(summary = "Get commits from idProject", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getCommit(@PathVariable String idProject) {
        try {
            // Procura o projeto pelo ID fornecido
            var projectOptional = projectsRepository.findById(idProject);

            // Se o projeto não for encontrado, retorna uma resposta de não encontrado
            if (projectOptional.isEmpty()) return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new NotFoundException("Project not found.", "NULL"));

            // Obtém o projeto encontrado
            var project = projectOptional.get();

            // Retorna uma resposta contendo os commits do projeto
            return ResponseEntity.ok(project.getCommits());
        } catch (Exception e) {
            // Se ocorrer um erro interno do servidor, retorna uma resposta de erro interno
            return ResponseEntity
                    .internalServerError().body(new InternalError("Internal Server error", e));
        }
    }

    /**
     * Endpoint para criar um novo commit juntamente com um arquivo e atualizar o arquivo correspondente em um projeto.
     *
     * @param idProject     O ID do projeto no qual o arquivo será atualizado e o commit será feito
     * @param idFile        O ID do arquivo a ser atualizado e comitado
     * @param file          O arquivo a ser atualizado e comitado
     * @param commitMessage A mensagem do commit
     * @return ResponseEntity indicando sucesso se o arquivo for atualizado e o commit for feito com sucesso, ou uma resposta de erro caso contrário
     */
    @PostMapping(value = "/{idProject}/commitAndUpdate/{idFile}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(summary = "Post a new commit along with a file", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Commit made successfully."),
            @ApiResponse(responseCode = "404", description = "Project not found."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity updateFileWithCommit(
            @PathVariable String idProject,
            @PathVariable String idFile,
            @RequestParam("file") MultipartFile file,
            @RequestParam("commitMessage") String commitMessage) {

        try {
            var optionalProject = projectsRepository.findById(idProject);

            if (optionalProject.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Project ID not found,", idProject));
            }

            var project = optionalProject.get();
            var existingFile = findFileInProject(project, idFile);

            if (existingFile == null) {
                // Arquivo não encontrado no projeto, procurar no folder e subfolders
                existingFile = findFileInFolders(project.getFolders(), idFile);

                if (existingFile == null) {
                    // Arquivo não encontrado em nenhum lugar
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new NotFoundException("File id not found.", idFile));
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
                    .body(new Successfully("File updated successfully and new commit created.", file.getOriginalFilename()));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error updating file and creating a new commit. Details: " + e.getMessage());
        }
    }


    /**
     * Método auxiliar para encontrar um arquivo em um projeto.
     *
     * @param project      O projeto no qual o arquivo será procurado
     * @param targetFileId O ID do arquivo a ser encontrado
     * @return O arquivo encontrado, se existir, ou null caso contrário
     */
    private Files findFileInProject(Project project, String targetFileId) {
        return project.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }

    /**
     * Método auxiliar para encontrar um arquivo em uma lista de pastas e subpastas de forma recursiva.
     *
     * @param folders      Lista de pastas a serem pesquisadas
     * @param targetFileId O ID do arquivo a ser encontrado
     * @return O arquivo encontrado, se existir, ou null caso contrário
     */
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

    /**
     * Método auxiliar para encontrar um arquivo em uma pasta.
     *
     * @param folder       A pasta na qual o arquivo será procurado
     * @param targetFileId O ID do arquivo a ser encontrado
     * @return O arquivo encontrado, se existir, ou null caso contrário
     */
    private Files findFileInFolder(Folder folder, String targetFileId) {
        return folder.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }

}

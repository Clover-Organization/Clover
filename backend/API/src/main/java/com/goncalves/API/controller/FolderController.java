package com.goncalves.API.controller;

import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.files.FilesRepository;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.folder.FolderRepository;
import com.goncalves.API.entities.request.ProjectRepository;
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

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Tag(name = "/projects/folders")
@RestController
@RequestMapping("/projects/folders")
public class FolderController {

    @Autowired
    private FolderRepository repository;

    @Autowired
    private FilesRepository filesRepository;

    @Autowired
    private ProjectRepository projectsRepository;

    /**
     * Retorna os arquivos por pasta.
     *
     * @param idFolder O ID da pasta a ser recuperada
     * @return ResponseEntity contendo a pasta se encontrada, ou uma resposta de não encontrado caso contrário
     */
    @GetMapping("/{idFolder}")
    @Operation(summary = "Get all files from the idFolder", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Not found Folder ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getFilesByFolders(@PathVariable String idFolder) {
        try {
            var optionalFolder = repository.findById(idFolder);

            if (optionalFolder.isPresent()) {
                var folder = optionalFolder.get();
                return ResponseEntity.ok(folder);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Tratar exceções genéricas e logar informações relevantes
            e.printStackTrace(); // Este é apenas um exemplo, você deve usar um logger na prática

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Endpoint para criar pastas e subpastas.
     *
     * @param idProject  O ID do projeto onde a pasta será criada
     * @param idFolder   (opcional) O ID da pasta pai onde a nova pasta será criada como subpasta
     * @param files      Lista de arquivos a serem adicionados à pasta
     * @param folderName O nome da pasta a ser criada
     * @return ResponseEntity contendo a pasta criada, ou uma resposta de erro caso ocorra algum problema
     */
    @PostMapping(value = "/{idProject}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(summary = "Create folders and subFolders", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Folders created successfully."),
            @ApiResponse(responseCode = "404", description = "Not found Folder ID or Project ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity postFolder(@PathVariable String idProject,
                                     @RequestParam(name = "idFolder", required = false) String idFolder,
                                     @RequestParam("files") List<MultipartFile> files,
                                     @RequestParam("name") String folderName) {
        try {
            // Verifica se o ID do projeto é válido
            if (idProject.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Not found id.", idProject));
            }

            var projectOptional = projectsRepository.findById(idProject);

            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Project id not found.", idProject));
            }

            var project = projectOptional.get();

            Folder savedFolder;

            if (idFolder != null && !idFolder.isBlank()) {
                // Verificar se a pasta ou subpasta existe no projeto
                Optional<Folder> parentFolderOptional = findFolderRecursive(project.getFolders(), idFolder);

                if (parentFolderOptional.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new NotFoundException("Folder id not found", idProject));
                }

                var id = parentFolderOptional.get();

                Folder subFolder = new Folder(folderName, LocalDateTime.now());

                var parentFolder = repository.save(subFolder);

                for (MultipartFile file : files) {
                    byte[] fileContent = file.getBytes();

                    Files uploadedFile = new Files(
                            file.getOriginalFilename(),
                            file.getContentType(),
                            fileContent,
                            LocalDateTime.now()
                    );

                    // Salva o arquivo na coleção Files
                    filesRepository.save(uploadedFile);

                    // Adiciona uma nova instância do arquivo à lista de arquivos da pasta pai
                    parentFolder.getFiles().add(uploadedFile);

                }

                // Adiciona o subfolder à lista de subfolders do folder pai
                id.getSubFolders().add(parentFolder);

                // Atualiza o folder pai no repositório
                repository.save(id);

                savedFolder = parentFolder;
            } else {
                // Se o idFolder não for fornecido, cria um folder no projeto
                Folder folder = new Folder(folderName, LocalDateTime.now());

                savedFolder = repository.save(folder);

                List<Files> savedFiles = new ArrayList<>();

                for (MultipartFile file : files) {
                    byte[] fileContent = file.getBytes();

                    Files uploadedFile = new Files(
                            file.getOriginalFilename(),
                            file.getContentType(),
                            fileContent,
                            LocalDateTime.now()
                    );


                    // Salva o arquivo na coleção Files
                    filesRepository.save(uploadedFile);

                    // Adiciona uma nova instância do arquivo à lista de arquivos do folder
                    savedFolder.getFiles().add(uploadedFile);
                    savedFiles.add(uploadedFile);

                }

                // Adiciona a lista de arquivos à lista de arquivos do folder
                savedFolder.setFiles(savedFiles);

                // Adiciona o folder à lista de folders do projeto
                project.getFolders().add(savedFolder);

                // Atualiza o projeto no repositório
                projectsRepository.save(project);
            }

            // Agora, salva o folder no repositório após configurar todos os relacionamentos
            repository.save(savedFolder);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(savedFolder);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to read the contents of the files. " + e.getMessage());
        }
    }

    /**
     * Endpoint para criar arquivos dentro de subpastas.
     *
     * @param files          Lista de arquivos a serem criados na subpasta
     * @param idProject      O ID do projeto onde a subpasta está localizada
     * @param parentFolderId O ID da pasta pai onde os arquivos serão criados
     * @return ResponseEntity contendo uma mensagem de sucesso se os arquivos forem criados com sucesso, ou uma resposta de erro caso contrário
     */
    @PostMapping(value = "/{idProject}/{parentFolderId}/newFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(summary = "Create files within subFolders", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Files created successfully."),
            @ApiResponse(responseCode = "404", description = "Not found Folder ID or Project ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity createFilesIntoSubFolders(
            @RequestParam("files") List<MultipartFile> files,
            @PathVariable String idProject,
            @PathVariable String parentFolderId) {

        try {

            // Verifica se o ID do projeto é válido
            if (idProject.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Project ID not found.", idProject));
            }
            // Procura o projeto pelo ID fornecido
            var projectOptional = projectsRepository.findById(idProject);

            // Se o projeto não for encontrado, retorna uma resposta de não encontrado
            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Project not found.", idProject));
            }

            // Obtém o projeto encontrado
            var project = projectOptional.get();

            // Verifica se a pasta ou subpasta existe no projeto
            Optional<Folder> parentFolderOptional = findFolderRecursive(project.getFolders(), parentFolderId);

            // Se a pasta pai não for encontrada, retorna uma resposta de não encontrado
            if (parentFolderOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Folder not found.", parentFolderId));
            }

            // Obtém a pasta pai encontrada
            Folder parentFolder = parentFolderOptional.get();

            // Itera sobre os arquivos fornecidos
            for (MultipartFile file : files) {
                byte[] fileContent = file.getBytes();

                // Cria uma instância de arquivo com os dados fornecidos
                Files uploadedFile = new Files(
                        file.getOriginalFilename(),
                        file.getContentType(),
                        fileContent,
                        LocalDateTime.now()
                );

                // Salva o arquivo na coleção Files
                filesRepository.save(uploadedFile);

                // Adiciona uma nova instância do arquivo à lista de arquivos da pasta pai
                parentFolder.getFiles().add(uploadedFile);

            }

            // Atualiza a pasta pai no repositório
            repository.save(parentFolder);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new Successfully("Files saved successfully!", parentFolder.getFolderName()));

        } catch (IOException e) {
            // Se ocorrer um erro ao manipular os arquivos, retorna uma resposta de erro interno do servidor
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to read the contents of the files. " + e.getMessage());
        }
    }

    /**
     * Método para encontrar uma pasta recursivamente dentro de uma lista de pastas.
     *
     * @param folders         Lista de pastas onde a pasta será procurada
     * @param targetFolderId  O ID da pasta que está sendo procurada
     * @return Optional contendo a pasta se encontrada, ou vazio caso contrário
     */
    private Optional<Folder> findFolderRecursive(List<Folder> folders, String targetFolderId) {
        for (Folder folder : folders) {
            if (folder.getIdFolder().equals(targetFolderId)) {
                return Optional.of(folder);
            }
            Optional<Folder> subfolderOptional = findFolderRecursive(folder.getSubFolders(), targetFolderId);
            if (subfolderOptional.isPresent()) {
                return subfolderOptional;
            }
        }
        return Optional.empty();
    }
}

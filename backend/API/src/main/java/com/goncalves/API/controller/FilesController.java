package com.goncalves.API.controller;

import com.goncalves.API.DTO.UnauthorizedExceptionError;
import com.goncalves.API.entities.commits.Commits;
import com.goncalves.API.entities.commits.CommitsRepository;
import com.goncalves.API.entities.files.Files;
import com.goncalves.API.entities.files.FilesRepository;
import com.goncalves.API.entities.filesVersions.Versions;
import com.goncalves.API.entities.filesVersions.VersionsRepository;
import com.goncalves.API.entities.folder.Folder;
import com.goncalves.API.entities.folder.FolderRepository;
import com.goncalves.API.entities.request.Project;
import com.goncalves.API.entities.request.ProjectRepository;
import com.goncalves.API.entities.user.Users;
import com.goncalves.API.infra.security.ErrorNotFoundId;
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
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Tag(name = "/projects/files")
@RestController
@RequestMapping("/projects/files")
public class FilesController {
    @Autowired
    private FilesRepository repository;
    @Autowired
    private ProjectRepository projectsRepository;
    @Autowired
    private CommitsRepository commitsRepository;
    @Autowired
    private FolderRepository folderRepository;
    @Autowired
    private VersionsRepository versionsRepository;

    /**
     * Endpoint para obter o conteúdo de um arquivo com base nos IDs do projeto e do arquivo.
     *
     * @param idProjects O ID do projeto onde o arquivo está localizado
     * @param idFile     O ID do arquivo a ser recuperado
     * @return ResponseEntity contendo o conteúdo do arquivo se encontrado, ou uma resposta de erro caso contrário
     */
    @GetMapping("/{idProjects}/{idFile}/content")
    @Operation(summary = "Gets the contents of the file based on idProject and idFile", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Not found project ID or file ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getContentById(
            @PathVariable String idProjects,
            @PathVariable String idFile) {
        try {
            // Verifica se o projeto existe
            Users user = (Users) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            var projectOptional = projectsRepository.findById(idProjects);

            // Obtém o projeto encontrado
            var project = projectOptional.get();

            // Verifica se o usuário específico está na lista de usuários compartilhados
            var foundUser = project.getShareUsers().stream()
                    .anyMatch(u -> u.equals(user));

            //Verifica se esse usuario tem relação com o projeto
            if (!project.getUser().getIdUsers().equals(user.getIdUsers()) && !foundUser) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new UnauthorizedExceptionError("Error", "This user does not have access to this project."));
            }

            // Se o projeto não for encontrado, retorna uma resposta de não encontrado
            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Project not found", "NULL"));
            }

            // Procura diretamente no projeto
            Files file = findFileInProject(project, idFile);

            // Se encontrado diretamente no projeto, retorna o conteúdo do arquivo
            if (file != null) {
                return ResponseEntity.ok()
                        .header("Content-Type", file.getFileType())
                        .body(file.getFileContent());
            }

            // Procura dentro das pastas do projeto e subpastas recursivamente
            Files fileInFolders = findFileInFolders(project.getFolders(), idFile);

            if (fileInFolders != null) {
                // Se encontrado dentro de uma pasta ou subpasta, retorna o conteúdo do arquivo
                return ResponseEntity.ok()
                        .header("Content-Type", fileInFolders.getFileType())
                        .body(fileInFolders.getFileContent());
            }

            // Se não encontrado em nenhum lugar, retorna Not Found
            return ResponseEntity.notFound().build();

        } catch (Exception e) {
            // Se ocorrer um erro interno do servidor, retorna uma resposta de erro interno
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new InternalError("Internal server error.", e));
        }
    }

    /**
     * Método para encontrar um arquivo dentro do projeto.
     *
     * @param project      O projeto onde o arquivo será procurado
     * @param targetFileId O ID do arquivo a ser encontrado
     * @return O arquivo se encontrado, ou null caso contrário
     */
    private Files findFileInProject(Project project, String targetFileId) {
        return project.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }

    /**
     * Método para encontrar um arquivo dentro das pastas do projeto e subpastas recursivamente.
     *
     * @param folders      Lista de pastas onde o arquivo será procurado
     * @param targetFileId O ID do arquivo a ser encontrado
     * @return O arquivo se encontrado, ou null caso contrário
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
     * Método para encontrar um arquivo dentro de uma pasta.
     *
     * @param folder       A pasta onde o arquivo será procurado
     * @param targetFileId O ID do arquivo a ser encontrado
     * @return O arquivo se encontrado, ou null caso contrário
     */
    private Files findFileInFolder(Folder folder, String targetFileId) {
        return folder.getFiles().stream()
                .filter(f -> f.getIdFile().equals(targetFileId))
                .findFirst()
                .orElse(null);
    }

    /**
     * Endpoint para obter todos os commits por ID do arquivo.
     *
     * @param idFile O ID do arquivo para o qual os commits serão recuperados
     * @return ResponseEntity contendo uma lista de commits se o arquivo for encontrado, ou uma resposta de erro caso contrário
     */
    @GetMapping("/{idFile}/commits")
    @Operation(summary = "Get all commits by idFile", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Not found file ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity getAllCommitByFile(@PathVariable String idFile) {
        try {
            // Procura o arquivo pelo ID fornecido
            var filesOptional = repository.findById(idFile);

            // Se o arquivo não for encontrado, retorna uma resposta de não encontrado
            if (filesOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ErrorNotFoundId("File not found", idFile));
            }

            // Obtém o arquivo encontrado
            var file = filesOptional.get();

            // Retorna uma resposta de sucesso contendo a lista de commits do arquivo
            return ResponseEntity.ok(file.getCommits());
        } catch (Exception e) {
            // Se ocorrer um erro interno do servidor, retorna uma resposta de erro interno
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new InternalError("Erro ao obter commits do arquivo. Detalhes: " + e.getMessage()));
        }
    }

    /**
     * Endpoint para criar um novo arquivo com base no ID do projeto.
     *
     * @param files     Lista de arquivos a serem criados no projeto
     * @param idProject O ID do projeto onde os arquivos serão adicionados
     * @return ResponseEntity contendo uma mensagem de sucesso se os arquivos forem criados com sucesso, ou uma resposta de erro caso contrário
     */
    @PostMapping(value = "/{idProject}/uploadFile", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Transactional
    @Operation(summary = "Create a new file based on idProject", method = "POST")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "File created successfully."),
            @ApiResponse(responseCode = "404", description = "Not found project ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity newFiles(
            @RequestParam("files") List<MultipartFile> files,
            @PathVariable String idProject) {
        try {
            // Verifica se o ID do projeto é válido
            if (idProject.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Not found id.", idProject));
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

            // Lista para armazenar os arquivos salvos
            List<Files> savedFiles = new ArrayList<>();

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
                repository.save(uploadedFile);


                // Adiciona uma nova instância do arquivo à lista de arquivos do projeto
                savedFiles.add(uploadedFile);

            }

            // Adiciona a lista de arquivos à lista de arquivos do projeto
            project.getFiles().addAll(savedFiles);

            // Atualiza o projeto no repositório
            projectsRepository.save(project);

            // Retorna uma resposta de sucesso com uma mensagem indicando que os arquivos foram criados com sucesso
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new Successfully("Files saved successfully!", idProject));

        } catch (IOException e) {
            // Se ocorrer um erro ao manipular os arquivos, retorna uma resposta de erro interno do servidor
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new InternalError("Failed to read the contents of the files. " + e.getMessage()));
        }
    }

    /**
     * Endpoint para encontrar um arquivo com base no ID do arquivo.
     *
     * @param idFile O ID do arquivo a ser encontrado
     * @return ResponseEntity contendo o arquivo se encontrado, ou uma resposta de erro caso contrário
     */
    @GetMapping("/{idFile}/file")
    @Operation(summary = "Find files based on idFile", method = "GET")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Not found file ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity findFileById(@PathVariable String idFile) {
        try {
            // Procura o arquivo pelo ID fornecido
            var filesOptional = repository.findById(idFile);

            // Se o arquivo for encontrado, retorna o arquivo
            if (filesOptional.isPresent()) {
                var files = filesOptional.get();
                return ResponseEntity.ok(files);
            } else {
                // Se o arquivo não for encontrado, retorna uma resposta de não encontrado
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Not found file", "NULL"));
            }
        } catch (Exception e) {
            // Se ocorrer um erro interno do servidor, retorna uma resposta de erro interno
            // Registra a exceção para fins de depuração
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Endpoint para excluir um arquivo e remover todas as suas referências no projeto.
     *
     * @param idProject O ID do projeto do qual o arquivo será removido
     * @param idFolder  (Opcional) O ID da pasta da qual o arquivo será removido
     * @param idFile    O ID do arquivo a ser removido
     * @return ResponseEntity indicando sucesso (status 204 No Content) se o arquivo for removido com sucesso, ou uma resposta de erro caso contrário
     */
    @DeleteMapping("/{idProject}/delete/{idFile}")
    @Operation(summary = "Deletes the file and removes all its references in the project", method = "DELETE")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Search completed successfully."),
            @ApiResponse(responseCode = "404", description = "Not found file ID or project ID."),
            @ApiResponse(responseCode = "500", description = "Internal server error.")
    })
    public ResponseEntity deleteFile(@PathVariable String idProject,
                                     @RequestParam(name = "idFolder", required = false) String idFolder,
                                     @PathVariable String idFile) {
        try {
            // Verificar se o ID do arquivo é válido
            if (idFile.isBlank()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("File ID not found.", idFile));
            }

            // Verificar se o arquivo existe
            var fileOptional = repository.findById(idFile);
            if (fileOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("File not found.", idFile));
            }

            var file = fileOptional.get();

            // Verificar se o projeto existe
            var projectOptional = projectsRepository.findById(idProject);
            if (projectOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new NotFoundException("Project not found", idProject));
            }
            var project = projectOptional.get();

            if (idFolder != null) {
                // Se um ID de pasta foi fornecido, tentar remover o arquivo dessa pasta
                var optionalFolder = folderRepository.findById(idFolder);

                if (optionalFolder.isPresent()) {
                    // Se a pasta existe
                    var folder = optionalFolder.get();

                    // Tentar remover o arquivo da lista de arquivos da pasta
                    var isRemoved = folder.getFiles().remove(file);

                    if (isRemoved) {
                        // Se o arquivo foi removido com sucesso da lista da pasta, salvar a pasta
                        folderRepository.save(folder);

                        // Salvar o projeto após a remoção do arquivo da lista da pasta
                        projectsRepository.save(project);

                        var commitsList = file.getCommits();

                        // Iterar sobre a lista de commits
                        for (Commits commit : commitsList) {
                            // Obter a versão associada a cada commit
                            Versions version = commit.getVersion();

                            // Remover a versão
                            versionsRepository.deleteById(version.getIdVersion());
                        }
                        //Exclui todos os commits relacionados com o file
                        commitsRepository.deleteAll(commitsList);

                        // Excluir o arquivo
                        repository.deleteById(idFile);

                        // Resposta indicando sucesso (204 No Content)
                        return ResponseEntity.noContent().build();
                    } else {
                        // Se o arquivo não foi encontrado na lista da pasta
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .body("Failed to remove file from folder list.");
                    }
                } else {
                    // Se a pasta não foi encontrada
                    return ResponseEntity.status(HttpStatus.NOT_FOUND)
                            .body(new NotFoundException("Folder not found.", idFolder));
                }
            }

            // Remover o arquivo da lista de arquivos do projeto
            var isRemoved = project.getFiles().removeIf(f -> f.getIdFile().equals(file.getIdFile()));
            if (isRemoved) {
                // Salvar o projeto após a remoção do arquivo
                projectsRepository.save(project);

                // Excluir o arquivo
                repository.deleteById(idFile);

                return ResponseEntity.noContent().build();
            } else {
                // Se o arquivo não foi encontrado na lista do projeto
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Failed to remove file from project list.");
            }
        } catch (Exception e) {
            // Lidar com exceções inesperadas
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Internal error processing the request.");
        }
    }
}

